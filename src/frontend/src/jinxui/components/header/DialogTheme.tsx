import React, { forwardRef } from "react";

import styled from "styled-components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Drawer from "@material-ui/core/Drawer";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";


import {
  useUser,
  PrimaryButton,
  SecondaryButton,
  ThemeSectionColors,
} from "jinxui";

import {
  PortfolioThemes,
} from "jinxui/themes"

import {
  TDialog
} from "jinxui/types"

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
  width: 100%;
  max-width: 600px;
`;

const ThemeIconLayout = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  &::before,
  &::after {
    content: "";
    flex: 1;
  }
`;

const useStylesThemes = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: 300,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
  });
});


const DialogTheme = forwardRef((props: TDialog, ref: any) => {
  const {
    userData,
    setTheme,
    themePreview,
    themePreviewCancel,
  } = useUser();
  const theme = useTheme();
  const themeClasses = useStylesThemes();

  const handleClose = () => {
    props.setOpen(false);
    setTheme(userData.portfolioId);
  };

  function handleThemeClick(themeName: string) {
    themePreview(themeName);
  }

  const handleOkClick = () => {
    props.setOpen(false);
    setTheme(userData.portfolioId);
  };

  const handleCancelClick = () => {
    props.setOpen(false);
    themePreviewCancel(userData.portfolioId);
  };

  // Individual theme card. 
  // Automatically customised according to theme settings
  type TThemeCard = {
    theme: Theme;
    themeName: string;
  };
  const ThemeCard = (props: TThemeCard) => {
    const headerBG = props.theme.portfolio.headerBackground;
    const header = props.theme.portfolio.header;

    const titleColor =
      headerBG.isDark === true
        ? props.theme.palette.common.white
        : headerBG.isDark === false
        ? props.theme.palette.common.black
        : props.theme.palette.text.primary;
    const subtitleColor = header?.useSecondaryForSubtitle
      ? props.theme.palette.secondary.main
      : titleColor;
    const [backgroundColor, textColor] = ThemeSectionColors(
      props.theme,
      0
    );
    const BGOverlay = headerBG.overlayColor
      ? "rgb(" + headerBG.overlayColor + ")"
      : "";

    const verticalAlign =
      header?.verticalAlign !== undefined ? header.verticalAlign : "flex-end";

    const horizontalAlign =
      header?.horizontalAlign !== undefined
        ? header.horizontalAlign
        : "flex-start";
    const editThemeSecondaryColor = theme.palette.secondary.main;
    const cardBorderRadius = "10px";

    return (
      <>
        <Button
          onClick={() => {
            handleThemeClick(props.themeName);
          }}
          style={{
            padding: "16px",
            borderRadius: cardBorderRadius,
          }}
        >
          <ThemeProvider theme={props.theme}>
            <Paper
              className={themeClasses.root}
              elevation={0}
              style={
                props.themeName === userData.theme
                  ? {
                      border: "2px solid " + editThemeSecondaryColor,
                      borderRadius: cardBorderRadius,
                    }
                  : { borderRadius: cardBorderRadius }
              }
            >
              <CardHeader
                title={props.themeName}
                style={{ textTransform: "none" }}
              />

              <Box
                display="grid"
                gridTemplateRows="1fr"
                gridTemplateColumns="1fr"
              >
                <Box gridRow="1 / span 1" gridColumn="1 / span 1">
                  <CardMedia
                    image={props.theme.portfolio.headerBackground.src300}
                    className={themeClasses.media}
                  />
                </Box>
                <Box
                  gridRow="1 / span 1"
                  gridColumn="1 / span 1"
                  bgcolor={BGOverlay}
                />
                <Box
                  gridRow="1 / span 1"
                  gridColumn="1 / span 1"
                  display="flex"
                  margin="10%"
                >
                  <Grid
                    direction="row"
                    container
                    spacing={0}
                    alignItems={verticalAlign}
                    alignContent={
                      verticalAlign === "baseline" ? "flex-end" : verticalAlign
                    }
                    justify={horizontalAlign}
                  >
                    <Box
                      width="70%"
                      height="15%"
                      bgcolor={titleColor}
                      borderRadius={5}
                    />
                    <Box height="10%" width="100%" />
                    <Box
                      width="50%"
                      height="12%"
                      bgcolor={subtitleColor}
                      borderRadius={5}
                    />
                  </Grid>
                </Box>
              </Box>
              <Box
                display="grid"
                gridTemplateRows="1fr"
                gridTemplateColumns="1fr"
                style={{ background: backgroundColor }}
                borderRadius={
                  "0px 0px " + cardBorderRadius + " " + cardBorderRadius
                }
              >
                <Box
                  gridRow="1 / span 1"
                  gridColumn="1 / span 1"
                  height="120px"
                  margin="10%"
                >
                  <Box display="flex" flexDirection="column" height="100%">
                    <Box
                      width="70%"
                      height="15%"
                      bgcolor={textColor}
                      borderRadius={5}
                    />
                    <Box height="10%" width="100%" />
                    <Box
                      width="100%"
                      height="100%"
                      bgcolor={textColor}
                      borderRadius={5}
                      style={{ opacity: "50%" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </ThemeProvider>
        </Button>
      </>
    );
  };

  return (
    <>
      <Drawer anchor="bottom" open={props.open} onClose={handleClose}>
        <DialogTitle id="theme-dialog-title" style={{ textAlign: "center" }}>
          Choose Theme
        </DialogTitle>
        <DialogContent style={{ padding: "0px" }}>
          <Box width="100%" height="10px" />
          <ThemeIconLayout>
            {Object.values(PortfolioThemes).map((theme: Theme) => {
              const themeName = theme.portfolio.theme.name;
              return (
                <Box key={themeName}>
                  <ThemeCard theme={theme} themeName={themeName} />
                </Box>
              );
            })}
          </ThemeIconLayout>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <PublishCancelDiv>
            <div>
              <PrimaryButton onClick={handleOkClick}>APPLY</PrimaryButton>
            </div>
            <div>
              <SecondaryButton onClick={handleCancelClick}>
                Cancel
              </SecondaryButton>
            </div>
          </PublishCancelDiv>
        </DialogActions>
      </Drawer>
    </>
  );
});

export default DialogTheme;
