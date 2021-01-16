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

export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  // const { linkIndex } = useLink();
  const [updatedSections, setUpdatedSections] = useState<any>([]);
  const [toSend, setToSend] = useState<any[]>([]);

  function sectionIndex(pageId: Tuuid, sectionId: Tuuid) {
    if (sectionId === defaultSectionContext.id) {
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
    return newSection;
  }

  function setSections(sections: TSections) {
    try {
      setState(sections);
    } catch (e) {
      throw e;
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

  const handleContentChange = (text: string, pageId: Tuuid, index: number) => {
    updateState(pageId, index, { text: text });
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

  function getFetchedSectionLinks(pageId: Tuuid, sectionId: Tuuid) {
    const fetchedSection = getFetchedSection(pageId, sectionId);
    return fetchedSection.links;
  }

  function updateSectionLinks(pageId: Tuuid, index: number, links: TLink[]) {
    updateState(pageId, index, { links: links });
  }

  function getFetchedSectionLinksFromId(pageId: Tuuid, sectionId: Tuuid) {
    try {
      const index = sectionIndex(pageId, sectionId);
      return state[pageId][index].links;
    } catch (e) {
      throw e;
    }
  }

  function sectionLinkIndex(sectionLinks: TLink[], linkId: Tuuid) {
    return sectionLinks.findIndex(
      (existingLink: TLink) => existingLink.id === linkId
    );
  }

  function sectionLinkUpdate(pageId: Tuuid, sectionId: Tuuid, link: TLink) {
    const sectionLinks: TLink[] = getFetchedSectionLinks(pageId, sectionId);
    const index = sectionIndex(pageId, sectionId);
    if (!validate(link.id)) {
      // Link is new
      link.id = uuidv4();
      updateSectionLinks(pageId, index, [...sectionLinks, link]);
    } else {
      // Link is existing
      const linkIndex = sectionLinkIndex(sectionLinks, link.id);
      updateSectionLinks(pageId, index, [
        ...sectionLinks.slice(0, linkIndex),
        link,
        ...sectionLinks.slice(linkIndex + 1),
      ]);
    }
  }

  function handleSectionLinkDelete(
    pageId: Tuuid,
    sectionid: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageId, sectionid);
    const index = sectionIndex(pageId, sectionid)
    const linkIndex = sectionLinkIndex(links, link.id);
    try {
      updateSectionLinks(pageId, index, listDelete(links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveUp(
    pageId: Tuuid,
    sectionId: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageId, sectionId);
    const index = sectionIndex(pageId, sectionId);
    const linkIndex = sectionLinkIndex(links, link.id);
    try {
      updateSectionLinks(pageId, index, listMoveUp(links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveDown(
    pageId: Tuuid,
    sectionId: string,
    link: TLink
  ) {
    console.log(link)
    const links = getFetchedSectionLinks(pageId, sectionId);
    const index = sectionIndex(pageId, sectionId);
    const linkIndex = sectionLinkIndex(links, link.id);
    try {
      updateSectionLinks(pageId, index, listMoveDown(links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function resetSections() {
    resetState();
  }

  function logState() {
    console.log(state);
  }

  return {
    sectionIndex,
    getFetchedSection,
    getFetchedSections,
    getFetchedSectionsAll,
    getSectionsIndexedCopyAll,
    makeNewSection,
    setSections,
    onSectionChange,
    handleContentChange,
    handleSectionChange,
    handleSectionAddPage,
    handleSectionDelete,
    handleSectionDeletePage,
    handleSectionMoveUp,
    handleSectionMoveDown,
    updateSectionLinks,
    getFetchedSectionLinks,
    getFetchedSectionLinksFromId,
    sectionLinkUpdate,
    handleSectionLinkDelete,
    handleSectionLinkMoveUp,
    handleSectionLinkMoveDown,
    resetSections,
    logState,
  };
};
