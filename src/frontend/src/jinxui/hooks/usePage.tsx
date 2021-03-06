import { useContext } from "react";
import API from "../../API";
import { TPage } from "../types/PortfolioTypes";
import { defaultPageContext } from "jinxui/contexts";
import { v4 as uuidv4 } from "uuid";
import {
  useUser,
  useSection,
  PORTFOLIOS_PATH,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "jinxui";
import {
  TSection,
  Tuuid,
} from "jinxui/types"
import {
  PageContext
} from "jinxui/contexts"


export const usePage = () => {
  // Update state will be useful when using multiple pages
  // eslint-disable-next-line
  const [state, setState, updateState, resetState] = useContext(PageContext);
  const { getConfig } = useUser();
  const {
    handleSectionDeletePage,
    handleSectionAddPage,
    getFetchedSectionsAll,
  } = useSection();

  function pageIndex(pageId: Tuuid) {
    const index = state.findIndex((page: TPage) => page.id === pageId);
    if (index > -1) {
      return index;
    } else {
      throw Error("Page with id: " + pageId + " could not be found.");
    }
  }

  function getFetchedPages() {
    return state;
  }

  function getPagesIndexedCopy() {
    const pages = JSON.parse(JSON.stringify(state));
    for (var i = 0; i < pages.length; i++) {
      pages[i].number = i
    }
    return pages
  }

  function getFetchedPageId(pageId: Tuuid) {
    for (var page of state) {
      if (page.id === pageId) {
        return page.id;
      }
    }
    return "";
  }

  function getGlobalSectionIndex(pageId: Tuuid, section: TSection) {
    const currentPageIndex = pageIndex(pageId);
    const allSections = getFetchedSectionsAll();
    
    if (currentPageIndex > state.length) {
      throw Error("Page index value is invalid")
    }

    let globalIndex = 0;
    
    for (let i = 0; i < currentPageIndex; i++) {
      globalIndex += allSections[state[i].id].length
    }
    return globalIndex + section.index;
  }

  const onPageChange = (
    pageId: Tuuid,
    fieldsToUpdate: Partial<TPage>
  ) => {
    const index = pageIndex(pageId);
    state[index] = {...state[index], ...fieldsToUpdate}
  }

  async function setPages(pages: TPage[]) {
    try {
      await setState(pages);
    } catch (e) {
      throw e;
    }
  }

  async function savePage(portfolioId: Tuuid, page: TPage) {
    try {
      if (page.isNew) {
        const path = PORTFOLIOS_PATH + "/" + portfolioId + "/pages";
        await API.post(path, page, getConfig());
        const index = pageIndex(page.id)
        updateState(index, {isNew: false})
      } else {
        const path = PORTFOLIOS_PATH + "/pages/" + page.id;
        await API.put(path, page, getConfig())
      }
    } catch (e) {
      throw e
    }
  }

  // Delete pages marked for deletion from server
  async function commitPageDeletions() {
    for (var page of state) {
      if (page.toDelete && !page.isNew) {
        const path = PORTFOLIOS_PATH + "/pages/" + page.id
        try {
          await API.delete(path, getConfig())
        } catch (e) {
          throw e
        }
      }
    }
  }

  // Mark pages for deletion from server
  async function handlePageDelete(portfolioId: Tuuid, index: number) {
    try {
      updateState(index, {toDelete: true})
      // state[index].toDelete = true;
      handleSectionDeletePage(state[index].id);
    } catch (e) {
      throw e;
    }
  }

  async function handlePageAdd(index: number) {
    const newPage:TPage = JSON.parse(JSON.stringify(defaultPageContext));
    newPage.id=uuidv4();
    newPage.isNew=true

    setState(listAdd(state, index, newPage))
    handleSectionAddPage(newPage.id);
  }

  function handlePageMoveUp(index: number) {
    try {
      setState(listMoveUp(state, index));
    } catch (e) {
      throw e;
    }
  }

  function handlePageMoveDown(index: number) {
    try {
      setState(listMoveDown(state, index));
    } catch (e) {
      throw e;
    }
  }

  function resetPages() {
    resetState();
  }

  return {
    pageIndex,
    setPages,
    getFetchedPages,
    getPagesIndexedCopy,
    getFetchedPageId,
    getGlobalSectionIndex,
    onPageChange,
    savePage,
    commitPageDeletions,
    handlePageDelete,
    handlePageAdd,
    handlePageMoveUp,
    handlePageMoveDown,
    resetPages,
  };
};
