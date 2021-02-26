import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import {
  usePortfolio,
  DisplayLinks,
} from "jinxui";


/* A block that takes up at minimum the height of the screen. Takes an optional */
function HeaderBlock(props: any) {
  const theme = useTheme();
  const maxHeight =
    theme.portfolio.headerBackground.maxHeight !== undefined
      ? theme.portfolio.headerBackground.maxHeight
      : "100vh";
  return (
    <Box minHeight={`min(100vh, ${maxHeight})`} clone>
      {props.children}
    </Box>
  );
}

// Typing with children is weird, couldn't figure this out so left as any
// Give me a `url` as props to get a background image
function BackgroundImage(props: any) {
  // Background styling
  const theme = responsiveFontSizes(useTheme());
  const backgroundColor = theme.portfolio.headerBackground.overlayColor
    ? theme.portfolio.headerBackground.overlayColor
    : "0, 0, 0, 0.3";
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      background: {
        backgroundImage: `url(${props.url})`,
        backgroundColor: theme.palette.background.default,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize:
          "cover" /* Resize the background image to cover the entire container */,
      },
      foreground: {
        // If there are children, darken the image so text is not invisible
        backgroundColor: `${
          props.children ? "rgba(" + backgroundColor + ")" : "none"
        }`,
      },
    })
  );

  const classes = useStyles();

  // Background: image from style, default to regular background if no image found

  return (
    <>
      <Paper className={classes.background} elevation={0}>
        <Box className={classes.foreground}>{props.children}</Box>
      </Paper>
    </>
  );
}

function DisplayHeader() {
  const { getFetchedPortfolio } = usePortfolio();
  const title = getFetchedPortfolio().name;
  const subtitle = getFetchedPortfolio().subtitle
  const theme = responsiveFontSizes(useTheme());
  // Set default values if not defined
  const header = theme.portfolio.header;
  const headerBG = theme.portfolio.headerBackground;

  const verticalAlign =
    header?.verticalAlign !== undefined ? header.verticalAlign : "flex-end";

  const horizontalAlign =
    header?.horizontalAlign !== undefined
      ? header.horizontalAlign
      : "flex-start";

  const textAlign = header?.textAlign !== undefined ? header.textAlign : "left";

  const marginBottom =
    header?.marginBottom !== undefined ? header.marginBottom : "10%";

  const gutterBottom = header?.disableSubtitleGap ? false : true;

  return (
    <>
      <BackgroundImage url={theme.portfolio.headerBackground.src}>
        <HeaderBlock>
          <Container maxWidth="lg" style={{ display: "flex" }}>
            <Grid
              direction="row"
              container
              spacing={0}
              alignItems={verticalAlign}
              justify={horizontalAlign}
            >
              <Box
                padding={
                  theme.portfolio.section?.borderPadding?.toString() + "px"
                }
                marginBottom={marginBottom}
                style={
                  headerBG.isDark === true
                    ? { color: theme.palette.common.white }
                    : headerBG.isDark === false
                    ? { color: theme.palette.common.black }
                    : {}
                }
              >
                <Typography
                  variant="h1"
                  align={textAlign}
                  color="inherit"
                  gutterBottom={gutterBottom}
                  style={header?.allCaps ? { textTransform: "uppercase" } : {}}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h3"
                  style={
                    header?.useSecondaryForSubtitle
                      ? { color: theme.palette.secondary.main }
                      : { color: "inherit" }
                  }
                  align={textAlign}
                >
                  {subtitle}
                </Typography>
                <Box height="30px" />
                <DisplayLinks horizontalAlign={horizontalAlign}/>
              </Box>
            </Grid>
          </Container>
        </HeaderBlock>
      </BackgroundImage>
    </>
  );
}

export default DisplayHeader