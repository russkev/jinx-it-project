
import React, { useState, useEffect, useContext } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  Button,
  CssBaseline,
  Icon,
  InputAdornment,
  TextField,
} from "@material-ui/core";


import {
  LightTheme,
  DarkTheme,
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  HeaderBar,
  PrimaryButton,
  SecondaryButton,
  TextSectionInput,
  ImageSectionInput,
  PortfolioNameSectionInput,
  Routes,
  PrimaryColumnDiv,
  ImageTextSectionInput,
  SnackbarAlert,
  defaultPortfolioContext,
  LinkDialog,
  LinkDisplayIcon,
  LinkEditMenu,
  PaperSectionStatic,
  OneColumnSectionDiv,
  DisplayLinks,
  PortfolioContext,
} from "jinxui";




const LoadingSections = (props: any) => {
  const {
    sendFullPortfolio,
    getFullPortfolio,
    getSavedPortfolioId,
    userData,
    switchLightThemeMode,
    getSavedLightThemeMode,
    makePortfolioPublic,
    setSaving,
    savingState,
  } = useUser();

  const { getLightTheme } = usePortfolio(); 

  // const appliedTheme = createMuiTheme(
  //   getSavedLightThemeMode() ? LightTheme : DarkTheme
  // );

  const LoadingText = ({ rows }: { rows: number }) => {
    return (
      <>
        {[...Array(rows)].map((item: any, index: number) => (
          <Skeleton key={index} />
        ))}
      </>
    );
  };

  const LoadingTitle = () => <Skeleton width="40%" height="4em" />;

  const LoadingMedia = () => <Skeleton variant="rect" height="20em" />;

  const LoadingTextSection = () => (
    <Grid container direction="column">
      <LoadingTitle />
      <LoadingText rows={5} />
    </Grid>
  );

  const LoadingMediaSection = () => (
    <Grid container>
      <LoadingTitle />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LoadingText rows={10} />
        </Grid>
        <Grid item xs={6}>
          <LoadingMedia />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <>
      <ThemeProvider theme={getLightTheme()}>
        <CssBaseline />
        <HeaderBar title="Edit" darkTheme={!getSavedLightThemeMode()} />
        <PrimaryColumnDiv>
          <div />
          <Container maxWidth="lg">
            <Grid
              container
              spacing={5}
              direction="column"
              justify="space-evenly"
            >
              {[...Array(4)].map((item: any, index: number) => (
                <Grid item key={index}>
                  {index % 2 === 0 ? (
                    <LoadingTextSection />
                  ) : (
                    <LoadingMediaSection />
                  )}
                </Grid>
              ))}
            </Grid>
            <div />
          </Container>
        </PrimaryColumnDiv>
      </ThemeProvider>
    </>
  );
};

export default LoadingSections