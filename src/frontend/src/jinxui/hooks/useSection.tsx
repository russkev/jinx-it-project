import { useContext, useState } from "react";
import {
  SectionContext,
  useUser,
  useLink,
  PORTFOLIOS_PATH,
  listDelete,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "jinxui";
import API from "../../API";
import { v4 as uuidv4, validate } from "uuid";
import {
  TPage,
  TEditPage,
  TSection,
  TSections,
  TLink,
  Tuuid,
} from "../types/PortfolioTypes";
import { defaultSectionContext, defaultPageContext } from "jinxui/contexts";

const sectionIsNotBlank = (section: TSection) => {
  if (section.type === "text") {
    return section.name !== "" || section.text !== "";
    // } else if (section.type === "image") {
    //   return section.name !== "" || section.path !== "";
    // } else if (section.type === "image_text") {
    //   return section.name !== "" || section.path !== "" || section.content !== "";
  } else {
    return true;
  }
};

async function getSectionsAll(
  portfolioId: number,
  pages: TEditPage[],
  config: any
) {
  try {
    const sectionsResult = await Promise.all(
      pages.map((page: TPage) => {
        const sectionPath =
          PORTFOLIOS_PATH +
          "/" +
          portfolioId +
          "/pages/" +
          page.id +
          "/sections";
        return API.get(sectionPath, config);
      })
    );

    // Extract appropriate information
    var cleanResult: TSections = {};
    for (var i = 0; i < pages.length; i++) {
      const pageId = pages[i].uid;
      const sectionsData = sectionsResult[i].data;
      // Give the section a uid
      for (var sectionData of sectionsData) {
        sectionData.uid = uuidv4();

        // Extract link from sectionLink object
        var cleanLinks = [];
        for (var sectionLink of sectionData.links) {
          cleanLinks.push(sectionLink.link);
        }
        sectionData.links = cleanLinks;
      }
      cleanResult[pageId] = sectionsResult[i].data;
    }
    return cleanResult;
  } catch (e) {
    throw e;
  }
}

// Call from UsePage to prevent circular dependency issues
export async function putSections(
  portfolioId: Tuuid,
  pageId: Tuuid,
  sections: TSection[],
  config: any
) {
  const basePath =
    PORTFOLIOS_PATH + "/" + portfolioId + "/pages/" + pageId + "/sections";

  return API.put(basePath, sections, config).then((response: any) => {
    Promise.all(
      response.data.map((responseSection: any, index: number) => {
        const linksPath = basePath + "/" + responseSection.id + "/links";
        const linksResponse = API.put(linksPath, sections[index].links, config);
        return linksResponse;
      })
    );
  });
}

export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  const { linkIndex } = useLink();
  const [updatedSections, setUpdatedSections] = useState<any>([]);
  const [toSend, setToSend] = useState<any[]>([]);

  async function fetchSectionsAll(portfolioId: number, pages: TEditPage[]) {
    const result = await getSectionsAll(portfolioId, pages, getConfig());
    setState(result);
  }

  function sectionIndex(pageId: Tuuid, sectionId: Tuuid) {
    if ((sectionId === defaultSectionContext.id)) {
      return 0;
    }
    const index = state[pageId].findIndex(
      (section: TSection) => section.id === sectionId
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + sectionId + " could not be found.");
    }
  }

  const getFetchedSection = (pageId: Tuuid, sectionId: Tuuid) => {
    try {
      return state[pageId][sectionIndex(pageId, sectionId)];
    } catch (e) {
      throw Error("Section with id: " + sectionId + " could not be found.");
    }
  };

  function getFetchedSections(pageId: Tuuid) {
    return isLoading() ? [defaultSectionContext] : state[pageId];
  }

  function getFetchedSectionsAll() {
    return isLoading()
      ? { [defaultPageContext.id]: [defaultSectionContext] }
      : state;
  }

  function getSectionsIndexedCopyAll() {
    const allSections: TSections = JSON.parse(JSON.stringify(state));
    for (const [, sections] of Object.entries(allSections)) {
      for (var i = 0; i < sections.length; i++) {
        sections[i].index = i;
      }
    }
    return allSections;
  }

  function makeNewSection(pageId: Tuuid, sectionType: string): TSection {
    const newSection: TSection = JSON.parse(
      JSON.stringify(defaultSectionContext)
    );
    newSection.type = sectionType;
    newSection.id = uuidv4();
    newSection.page = pageId;
    return newSection
  }

  function setSections(sections: TSections) {
    try {
      setState(sections);
    } catch (e) {
      throw e;
    }
  }

  function setPageSections(pageId: Tuuid, sections: TSection[]) {
    try {
      console.log(pageId)
      setState({ ...state, [pageId]: sections });
    } catch (error) {
      console.log(error);
    }
  }

  const onSectionChange = (
    pageId: Tuuid,
    sectionId: Tuuid,
    fieldsToUpdate: Partial<TSection>
  ) => {
    const index = sectionIndex(pageId, sectionId);
    const section: TSection = { ...state[pageId][index], ...fieldsToUpdate };
    state[pageId][index] = section;
  };
  // /**
  //  * Prepare section data for sending to backend.
  //  * 1. Remove unique identifiers
  //  * 2. Override section numbers
  //  * 3. Remove empty sections entirely
  //  */
  // const getCleanedSections = (pageId: Tuuid) => {
  //   const cleanSections = JSON.parse(JSON.stringify(state[pageId]));
  //   for (var i = 0; i < cleanSections.length; i++) {
  //     if (sectionIsNotBlank(cleanSections[i])) {
  //       delete cleanSections[i].uid;
  //       cleanSections[i].number = i;
  //     }
  //   }
  //   return cleanSections;
  // };

  const handleContentChange = (
    // event: React.ChangeEvent<HTMLInputElement>,
    text: string,
    pageId: Tuuid,
    index: number
  ) => {
    // updateState(pageId, index, { content: event.target.value });
    updateState(pageId, index, { text: text });
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pageId: Tuuid,
    index: number
  ) => {
    updateState(pageId, index, { name: e.target.value });
  };

  function handleSectionChange(
    pageId: Tuuid,
    targetIndex: number,
    newSection: TSection
  ) {
    try {
      setState({
        ...state,
        [pageId]: listAdd(state[pageId], targetIndex, newSection),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionAddPage(pageId: Tuuid) {
    if (pageId in state) {
      throw Error("Tried to add new page with an existing page ID");
    } else {
      const newSection = makeNewSection(pageId, "text");
      setState({ ...state, [pageId]: [newSection] });
    }
  }

  function handleSectionDelete(pageId: Tuuid, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageId]: listDelete(state[pageId], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionDeletePage(pageId: Tuuid) {
    delete state[pageId];
  }

  function handleSectionMoveUp(pageId: Tuuid, targetIndex: number) {
    try {
      // const newState = listMoveUp(state[pageId], targetIndex);
      // setState(newState);
      setState({
        ...state,
        [pageId]: listMoveUp(state[pageId], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionMoveDown(pageId: Tuuid, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageId]: listMoveDown(state[pageId], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  async function saveSections(portfolioId: Tuuid, pageId: Tuuid) {
    // try {
    //   const sections = state;
    //   return await putSections(portfolioId, pageId, sections, getConfig());
    // } catch (e) {
    //   throw e;
    // }
  }

  function updateSectionLinks(pageId: Tuuid, index: number, links: TLink[]) {
    updateState(pageId, index, { links: links });
  }

  function getFetchedSectionLinks(pageId: Tuuid, uuid_index: Tuuid) {
    // const fetchedSection = getFetchedSection(pageId, uuid_index);
    // return fetchedSection.links;
    return [];
  }

  function getFetchedSectionLinksFromId(pageId: Tuuid, id: Tuuid) {
    // try {
    //   const index = sectionIndexFromId(pageId, id);
    //   return state[index].links;
    // } catch (e) {
    //   throw e;
    // }
    return state;
  }

  function sectionLinkAdd(pageId: Tuuid, uuid_index: string, link: TLink) {
    // const sectionLinks: TLink[] = getFetchedSectionLinks(pageId, uuid_index);
    // if (!validate(link.id)) {
    //   link.id = uuidv4();
    // }
    // const index = sectionLinks.findIndex(
    //   (existingLink: TLink) => existingLink.id === link.id
    // );
    // if (index > -1) {
    //   updateSectionLinks(pageId, index, [
    //     ...sectionLinks.slice(0, index),
    //     link,
    //     ...sectionLinks.slice(index + 1),
    //   ]);
    // } else {
    //   updateSectionLinks(pageId, index, [...sectionLinks, link]);
    // }
  }

  function handleSectionLinkDelete(
    pageId: Tuuid,
    uuid_index: string,
    link: TLink
  ) {
    // const links = getFetchedSectionLinks(pageId, uuid_index);
    // const index = linkIndex(link.id, links);
    // try {
    //   updateSectionLinks(pageId, index, listDelete(links, index));
    // } catch (e) {
    //   throw e;
    // }
  }

  function handleSectionLinkMoveUp(
    pageId: Tuuid,
    uuid_index: string,
    link: TLink
  ) {
    // const links = getFetchedSectionLinks(pageId, uuid_index);
    // const index = linkIndex(link.id, links);
    // try {
    //   updateSectionLinks(pageId, index, listMoveUp(links, index));
    // } catch (e) {
    //   throw e;
    // }
  }

  function handleSectionLinkMoveDown(
    pageId: Tuuid,
    uuid_index: string,
    link: TLink
  ) {
    // const links = getFetchedSectionLinks(pageId, uuid_index);
    // const index = linkIndex(link.id, links);
    // try {
    //   updateSectionLinks(pageId, index, listMoveDown(links, index));
    // } catch (e) {
    //   throw e;
    // }
  }

  function resetSections() {
    resetState();
  }

  function logState() {
    console.log(state)
  }

  return {
    sectionIndex,
    fetchSectionsAll,
    getFetchedSection,
    getFetchedSections,
    getFetchedSectionsAll,
    getSectionsIndexedCopyAll,
    makeNewSection,
    setSections,
    onSectionChange,
    setPageSections,
    handleContentChange,
    handleTitleChange,
    handleSectionChange,
    handleSectionAddPage,
    handleSectionDelete,
    handleSectionDeletePage,
    handleSectionMoveUp,
    handleSectionMoveDown,
    saveSections,
    updateSectionLinks,
    getFetchedSectionLinks,
    getFetchedSectionLinksFromId,
    sectionLinkAdd,
    handleSectionLinkDelete,
    handleSectionLinkMoveUp,
    handleSectionLinkMoveDown,
    resetSections,
    logState,
  };
};
