import { useContext } from "react";
import {
  PageContext,
  useUser,
  useSection,
  PORTFOLIOS_PATH,
  listDelete,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "jinxui";
import {
  Tuuid
} from "jinxui/types"
import API from "../../API";
import { TPage, } from "../types/PortfolioTypes";
import { defaultPageContext } from "jinxui/contexts";
import { v4 as uuidv4 } from "uuid";

async function putPage(portfolioId: Tuuid, page: TPage, config: any) {
  const path =
    PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
  try {
    const response = await API.put(path, page, config);
    return response;
  } catch (e) {
    throw e;
  }
}

async function postPage(portfolioId: Tuuid, data: TPage, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";
  try {
    const response = await API.post(
      path,
      {
        name: data.name,
        index: data.index,
        sections: data.sections,
      },
      config
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function deletePage(portfolioId: Tuuid, pageId: Tuuid, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" 
    + pageId.toString();
  try {
    const response = await API.delete(path, config)
    return response.data;
  } catch(e) {
    throw e;
  }
}

async function putPages(
  portfolioId: Tuuid,
  pages: TPage[],
  saveSections: any,
  config: any
) {
  const basePath = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";
  try {
    // const pagesResult = await Promise.all(
      // pages.map((page: TPage, index: number) => {
      const pagesResult = pages.map((page: TPage, index: number) => {
        page.index = index;
        console.assert(page.id != defaultPageContext.id);
        const pagePath = basePath + "/" + page.id;
        return API.put(pagePath, page, config).then((response: any) => {
          saveSections(portfolioId, response.data.id, page.id);
        });
      });
    // );
    return pagesResult;
  } catch (e) {
    throw e;
  }
}

async function deleteOldPages(
  portfolioId: Tuuid,
  pages: TPage[],
  config: any
) {
  try {
    const basePath = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";

    getPages(portfolioId, config).then((response: any) => {
      const pagesToDelete = response.filter((responsePage: TPage) => {
        return !pages.some((page) => page.id === responsePage.id);
      });
      const promiseResult = Promise.all(
        pagesToDelete.map((pageToDelete: TPage) => {
          const deletePath = basePath + "/" + pageToDelete.id;
          const deleteResult = API.delete(deletePath, config);
          return deleteResult;
        })
      );
      return promiseResult;
    });
  } catch (e) {
    throw e;
  }
}

async function getPages(portfolioId: Tuuid, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId + "/pages";
  const result = API.get(path, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
  return result;
}

export const usePage = () => {
  // Update state will be useful when using multiple pages
  // eslint-disable-next-line
  const [state, setState, updateState, resetState] = useContext(PageContext);
  const { getConfig } = useUser();
  const {
    handleSectionDeletePage,
    handleSectionAddPage,
    makeNewSection,
    saveSections,
  } = useSection();

  function pageIndex(pageId: Tuuid) {
    const index = state.findIndex((page: TPage) => page.id === pageId);
    if (index > -1) {
      return index;
    } else {
      throw Error("Page with id: " + pageId + " could not be found.");
    }
  }

  async function fetchPages(portfolioId: Tuuid) {
    try {
      const pages = await getPages(portfolioId, getConfig());
      for (var page of pages) {
        page.uid = uuidv4();
        page.isNew = false;
      }
      pages.sort((a: TPage, b: TPage) => (a.index > b.index ? 1 : -1));
      await setPages(pages);
      return pages;
    } catch (e) {
      throw e;
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

  async function setPages(pages: TPage[]) {
    try {
      await setState(pages);
    } catch (e) {
      throw e;
    }
  }

  async function savePage(isNew: boolean, portfolioId: Tuuid, index: number) {
    try {
      return isNew
        ? await postPage(portfolioId, state[index], getConfig())
        : await putPage(portfolioId, state[index], getConfig());
    } catch (e) {
      throw e;
    }
  }

  async function handlePageDelete(portfolioId: Tuuid, index: number) {
    try {
      await deletePage(portfolioId, state[index].id, getConfig())
    } catch (e) {
      throw e;
    }
    try {
      setState(listDelete(state, index));
      handleSectionDeletePage(state[index].id);
    } catch (e) {
      throw e;
    }
  }

  async function handlePageAdd(index: number) {
    const newPage:TPage = JSON.parse(JSON.stringify(defaultPageContext));
    newPage.id=uuidv4();

    // const postedPage = await postPage(portfolioId, newPage, getConfig());
    // postedPage.uid = uuidv4();
    
    // setState(listAdd(state, index, newPage));
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
    fetchPages,
    setPages,
    getFetchedPages,
    getPagesIndexedCopy,
    getFetchedPageId,
    savePage,
    // savePages,
    handlePageDelete,
    handlePageAdd,
    handlePageMoveUp,
    handlePageMoveDown,
    resetPages,
  };
};
