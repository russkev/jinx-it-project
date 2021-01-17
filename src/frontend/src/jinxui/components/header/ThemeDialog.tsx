import React, { forwardRef, useState } from "react";
import styled from "styled-components";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import {
  makeStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import InvertColorsIcon from "@material-ui/icons/InvertColors";

import {
  useUser,
  PortfolioThemes,
  PrimaryButton,
  SecondaryButton,
  themeColors,
} from "jinxui";
import { setSyntheticLeadingComments } from "typescript";
// import { createStyles } from "@material-ui/core";

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
  width: 100%;
`;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    dialog: {
      background: theme.palette.background.default,
    },
  });
});

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

type TThemeDialog = {
  setMenuOpen: any;
};
const ShareDialog = forwardRef((props: TThemeDialog, ref: any) => {
  const {
    userData,
    setSuccessMessage,
    setTheme,
    themePreview,
    themePreviewCancel,
  } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();
  const themeClasses = useStylesThemes();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    props.setMenuOpen(false);
  };

  function handleThemeClick(themeName: string) {
    themePreview(themeName);
  }

  // const handleThemeClick = (themeName: string) => {
  //   console.log("Theme clicked");
  // };

  const handleOkClick = () => {
    setDialogOpen(false);
    setTheme(userData.portfolioId);
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
    themePreviewCancel(userData.portfolioId);
  };

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
    const [backgroundColor, textColor, isFullHeight ] = themeColors(props.theme, 0);
    console.log(backgroundColor)
    const BGOverlay = headerBG.overlayColor
      ? "rgb(" + headerBG.overlayColor + ")"
      : "";

    const verticalAlign =
      header?.verticalAlign !== undefined ? header.verticalAlign : "flex-end";

    const horizontalAlign =
      header?.horizontalAlign !== undefined
        ? header.horizontalAlign
        : "flex-start";
    const customCss = props.theme.portfolio?.section?.css || {};

    return (
      <Grid item>
        <ThemeProvider theme={props.theme}>
          {/* <Button onClick={handleThemeClick}> */}
          <Button
            onClick={() => {
              handleThemeClick(props.themeName);
            }}
          >
            <Paper className={themeClasses.root} variant="outlined">
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
                // bgcolor={backgroundColor}
                // style={isFullHeight 
                //   ? {...customCss}
                //   : {background: backgroundColor, ...customCss}
                // }
                style={{background: backgroundColor}}
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
          </Button>
        </ThemeProvider>
      </Grid>
    );
  };

  return (
    <>
      <MenuItem ref={ref} onClick={handleClickOpen}>
        <ListItemIcon>
          <InvertColorsIcon />
        </ListItemIcon>
        <ListItemText>Choose Theme</ListItemText>
      </MenuItem>
      <Dialog
        ref={ref}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="Share dialog"
        maxWidth="lg"
        // className={classes.dialog}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="theme-dialog-title">Choose Theme</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={4}>
                {Object.values(PortfolioThemes).map((theme: Theme) => {
                  const themeName = theme.portfolio.theme.name;
                  return (
                    <Box key={themeName}>
                      <ThemeCard
                        theme={theme}
                        themeName={themeName}
                        
                      />
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <PublishCancelDiv>
            <div>
              <PrimaryButton onClick={handleOkClick}>OK</PrimaryButton>
            </div>
            <div>
              <SecondaryButton onClick={handleCancelClick}>
                Cancel
              </SecondaryButton>
            </div>
          </PublishCancelDiv>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ShareDialog;
