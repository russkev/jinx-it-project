import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {
  useUser,
  usePortfolio,
  HeaderBar,
  DisplayCopyright,
  DisplayHeader,
  DisplayPageList,
  DisplayLoading,
} from "jinxui";

import { PortfolioThemes } from "jinxui/themes";

import NotFound from "./NotFound";


const getTheme = (portfolio: any, userData: any, thisPageUser: string) => {
  const theme_name =
    userData.authenticated &&
    userData.theme &&
    thisPageUser === userData.username
      ? userData.theme
      : portfolio
      ? portfolio.theme
      : "";

  const themes_list = Object.values(PortfolioThemes);
  const current_theme = themes_list.filter(
    (value) => value.portfolio.theme.name === theme_name
  );
  if (current_theme.length === 1) {
    return current_theme[0];
  } else {
    return themes_list[0];
  }
};

interface PortfolioProps {
  username: string;
}

const Portfolio = ({ username }: PortfolioProps) => {
  const {
    userData,
    getAccountDetailsFromUsername,
    isLoading,
    setLoading,
    setSaving,
  } = useUser();

  const { fetchFullPortfolio, getFetchedPortfolio } = usePortfolio();
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setSaving(false);
      setLoading(true);
      setError(false);
      try {
        const { first_name, last_name } = await getAccountDetailsFromUsername(
          username
        );
        await fetchFullPortfolio(username);
        setAuthor(`${first_name} ${last_name}`);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
    // rendering a portfolio depends on the username
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <NotFound
        title="This portfolio could not be found"
        message="It either does not exist or the owner has not made it public."
      />
    );
  }

  const thisTheme = getTheme(getFetchedPortfolio(), userData, username);

  if (!isLoading()) {
    // Main Page
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={thisTheme}>
          <HeaderBar
            hideBGLoggedOut={true}
            hideLogo={true}
            isUserView={userData.username === username}
            isPortfolioView={true}
          />
            <CssBaseline />
            <DisplayHeader />
            <DisplayPageList />
          <DisplayCopyright text={author} />
        </ThemeProvider>
      </>
    );
  } else {
  return (
    <DisplayLoading />
  );
  }
};

export default Portfolio;
