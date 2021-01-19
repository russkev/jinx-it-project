import { useContext } from "react";
import {
  PortfolioContext,
  useUser,
  useSection,
  usePage,
  LightTheme,
  DarkTheme,
  listDelete,
  listMoveUp,
  listMoveDown,
  Routes,
  PORTFOLIOS_PATH,
} from "jinxui";
import API from "../../API";
import { v4 as uuidv4, validate } from "uuid";
import {
  TPortfolio,
  TPortfolioData,
  TPage,
  TSections,
  TLink,
  Tuuid,
} from "jinxui/types";
import { createMuiTheme } from "@material-ui/core/styles";
import { defaultPortfolioContext } from "jinxui/contexts";



// Note the $s in the function name. Use this if you want to get all of a user's portfolios
// eslint-disable-next-line
async function getPortfolios(config: any) {
  const path = PORTFOLIOS_PATH;
  const result = await API.get(path, config).then(
    (response: any) => response.data
  );
  return result;
}

// Use this if you want to get a specific portfolio
async function getPortfolio(portfolioId: Tuuid, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId.toString();
  const result = API.get(path, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.log(error);
      throw error;
    });
  return result;
}

async function postPortfolio(data: TPortfolioData, config: any) {
  if (!data) {
    throw Error("Portfolio data is null");
  }
  try {
    const response = await API.post(
      PORTFOLIOS_PATH,
      {
        name: data.name,
      },
      config
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function putPortfolio(portfolio: any, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolio.id;
  try {
    const response = API.put(path, portfolio, config);
    return response;
  } catch (e) {
    throw e;
  }
}

export const usePortfolio = () => {
  // Error and success message for a single page in edit mode
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [state, updateState, resetState] = useContext(PortfolioContext);
  const {
    userData,
    getConfig,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    getAccountDetailsFromUsername,
    setSaving,
    setErrorMessage,
    setSuccessMessage,
  } = useUser();
  const {
    resetPages,
    getPagesIndexedCopy,
    setPages,
    savePage,
    commitPageDeletions,
  } = usePage();
  const {
    resetSections,
    getFetchedSectionsAll,
    getSectionsIndexedCopyAll,
    setSections,
  } = useSection();

  const PORTFOLIOS_PATH = "api/portfolios";

  async function fetchPortfolio(portfolioId: Tuuid) {
    try {
      const portfolioDetails: any = await getPortfolio(
        portfolioId,
        getConfig()
      );
      const pageDetails = portfolioDetails.pages;
      portfolioDetails.pages = [];

      await updateState(portfolioDetails);

      var pages: TPage[] = [];
      var sections: TSections = {};
      for (var page of pageDetails) {
        const pageSections = page.sections;
        page.sections = [];
        pages.push(page);

        // Section id not required in link
        for (var section of pageSections) {
          for (var link of section.links) {
            delete link.section;
          }
        }
        sections[page.id] = pageSections;
      }
      setPages(pages);
      setSections(sections);

      return portfolioDetails;
    } catch (e) {
      throw e;
    }
  }

  async function fetchFullPortfolio(username?: string) {
    try {
      const portfolioId = username
        ? (await getAccountDetailsFromUsername(username)).primary_portfolio
        : getSavedPortfolioId();
      await fetchPortfolio(portfolioId);
    } catch (e) {
      throw e;
    }
  }

  async function saveFullPortfolio(isNew: boolean) {
    setSaving(true);
    if (state) {
      try {
        await commitPageDeletions();
        await savePortfolio(isNew);
        const pages = getPagesIndexedCopy();
        const allSections = getSectionsIndexedCopyAll();

        for (var [index, page] of pages.entries()) {
          if (!page.toDelete) {
            page.sections = allSections[page.id];
            page.index = index;
            await savePage(state.id, page);
          }
        }

        await setSuccessMessage("Portfolio saved");
      } catch (e) {
        setErrorMessage(e.message);
        throw e;
      } finally {
        setSaving(false);
      }
    }
  }

  /* Save the currently edited page to backend and redirect to display page. */
  const handlePublishAndRedirect = (history: any) => {
    saveFullPortfolio(false).then(() => {
      makePortfolioPublic(getFetchedPortfolio().id)
        .then(() => {
          history.push(
            Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username
          );
        })
        .catch(() => {
          setErrorMessage("Something went wrong");
        });
    });
  };

  
  const handleSave = () => {
    saveFullPortfolio(false).catch((error: any) => {
      console.log(error);
      throw error;
    });
  };

  function portfolioIsFetched() {
    return state.id != defaultPortfolioContext.id;
  }

  function getFetchedPortfolio() {
    return state;
  }

  function getLightTheme() {
    return createMuiTheme(getSavedLightThemeMode() ? LightTheme : DarkTheme);
  }

  function setPortfolioName(name: string) {
    updateState({ name: name });
  }

  function isPrivate() {
    return state.private;
  }

  async function setPortfolioTheme(portfolioId: Tuuid, theme_name: string) {
    async function savePortfolioTheme(theme: string) {
      try {
        await updateState({
          ...state,
          theme: theme,
        });
      } catch (e) {
        throw e;
      }
    }

    const path = PORTFOLIOS_PATH + "/" + portfolioId;
    API.get(path, getConfig())
      .then((response: any) => {
        const result = API.put(
          path,
          {
            name: response.data.name,
            theme: theme_name,
          },
          getConfig()
        )
          .then((response: any) => {
            savePortfolioTheme(response.data.theme);
          })
          .catch((error: any) => {
            console.log(error);
            throw error;
          });
        return result;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
  }

  async function setPortfolio(portfolio: TPortfolio) {
    try {
      await updateState(portfolio);
    } catch (e) {
      throw e;
    }
  }

  async function savePortfolio(isNew: boolean) {
    try {
      return isNew
        ? await postPortfolio(state, getConfig())
        : await putPortfolio(state, getConfig());
    } catch (e) {
      throw e;
    }
  }

  async function changePortfolioPrivacy(
    portfolioId: Tuuid,
    privacySetting: boolean
  ) {
    try {
      const path = PORTFOLIOS_PATH + "/" + portfolioId;
      const response = await API.patch(
        path,
        { private: privacySetting },
        getConfig()
      );
      updateState({ private: response.data.private });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async function makePortfolioPublic(portfolioId: Tuuid) {
    return await changePortfolioPrivacy(
      portfolioId,
      false
      // getConfig(),
      // updateState
    );
  }

  async function makePortfolioPrivate(portfolioId: Tuuid) {
    return await changePortfolioPrivacy(
      portfolioId,
      true
      // getConfig(),
      // updateState
    );
  }

  function getFetchedPortfolioLinks() {
    return state.links;
  }

  function updatePortfolioLinks(links: TLink[]) {
    updateState({ links: links });
  }

  function portfolioLinkIndex(linkId: Tuuid) {
    return state.links.findIndex(
      (existingLink: TLink) => existingLink.id === linkId
    );
  }

  function portfolioLinkUpdate(link: TLink) {
    if (!validate(link.id)) {
      link.id = uuidv4();
      updatePortfolioLinks([...state.links, link]);
    } else {
      const linkIndex = portfolioLinkIndex(link.id);
      updatePortfolioLinks([
        ...state.links.slice(0, linkIndex),
        link,
        ...state.links.slice(linkIndex + 1),
      ]);
    }
  }

  function handlePortfolioLinkDelete(link: TLink) {
    try {
      const linkIndex = portfolioLinkIndex(link.id);
      updatePortfolioLinks(listDelete(state.links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function handlePortfolioLinkMoveUp(link: TLink) {
    try {
      const linkIndex = portfolioLinkIndex(link.id);
      updatePortfolioLinks(listMoveUp(state.links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function handlePortfolioLinkMoveDown(link: TLink) {
    try {
      const linkIndex = portfolioLinkIndex(link.id);
      updatePortfolioLinks(listMoveDown(state.links, linkIndex));
    } catch (e) {
      throw e;
    }
  }

  function resetFullPortfolio() {
    resetState();
    resetPages();
    resetSections();
    // resetPortfolioLinks();
  }

  function logPortfolioState() {
    console.log(state);
  }

  return {
    portfolioData: state,
    fetchFullPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    isPrivate,
    setPortfolioName,
    setPortfolioTheme,
    setPortfolio,
    saveFullPortfolio,
    handlePublishAndRedirect,
    handleSave,
    makePortfolioPublic,
    makePortfolioPrivate,
    portfolioIsFetched,
    getFetchedPortfolioLinks,
    portfolioLinkIndex,
    portfolioLinkUpdate,
    handlePortfolioLinkDelete,
    handlePortfolioLinkMoveUp,
    handlePortfolioLinkMoveDown,
    resetFullPortfolio,
    logPortfolioState,
  };
};
