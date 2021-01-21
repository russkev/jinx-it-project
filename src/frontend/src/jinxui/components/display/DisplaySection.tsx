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
import { usePortfolio, DisplayLinks, ThemeSectionColors } from "jinxui";
import { TSection, TSectionInfo } from "jinxui/types";

// Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Generic section component that accepts any of the section fields and places their data (no background).
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */

interface TDisplaySection extends TSectionInfo {
  textColor: string;
}
const DisplaySection = (props: TDisplaySection) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      img: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
      },
      item: {
        paddingTop: "1em",
      },
      paper: {
        background: "rgba(255, 255, 255, 0.0)",
        padding: theme.portfolio.section?.borderPadding,
        border: "1px solid " + theme.palette.secondary.main,
      },
    })
  );

  const classes = useStyles();

  // Cols per item when we want the text/media to fit on one row
  // const colsPerItem = data.content && data.path ? 6 : 12;
  const colsPerItem = 12;

  // Markdown syntax highlighting
  const renderers = {
    code: ({ language, value }: { language: string; value: string }) => {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          children={value}
        />
      );
    },
  };

  const theme = useTheme();

  // Set defaults for various variables
  const sectionTheme = theme.portfolio.section;

  const titleGap =
    sectionTheme?.titleGap !== undefined ? sectionTheme.titleGap : 0;

  const sectionGap =
    sectionTheme?.sectionGap !== undefined ? sectionTheme.sectionGap : "10em";

  const spacing =
    sectionTheme?.spacing !== undefined ? sectionTheme.spacing : 4;

  var border = false;
  switch (sectionTheme?.border) {
    case "first":
      border = props.section.index === 0;
      break;
    case "odds":
      border = props.section.index % 2 === 1;
      break;
    case "evens":
      border = props.section.index % 2 === 0;
      break;
    case "all":
      border = true;
      break;
    default:
      border = false;
  }

  // const textColor = ThemeSectionColors(theme, props.section.index)[1];
  return (
    <>
      <Box textAlign="left" paddingTop={sectionGap} paddingBottom={sectionGap}>
        <Paper
          elevation={0}
          square
          variant="outlined"
          className={classes.paper}
          style={
            border
              ? { color: props.textColor }
              : { color: props.textColor, border: "none" }
          }
        >
          <Typography variant="h4" gutterBottom>
            {props.section.name}
          </Typography>
          <Grid
            container
            direction="row-reverse"
            style={{ marginTop: titleGap }}
            spacing={spacing}
          >
            {/* {data.path ? (
              <Grid item xs={12} sm={colsPerItem}>
                <img
                  src={data.path == null ? "" : data.path}
                  alt={data.alt}
                  className={classes.img}
                  style={{ marginTop: "25px" }} // compensate for markdown
                />
              </Grid>
            ) : null} */}
            {props.section.text ? (
              <Grid item xs={12} sm={colsPerItem}>
                <DisplayLinks
                  horizontalAlign="flex-start"
                  pageId={props.pageId}
                  sectionId={props.section.id}
                  textColor={props.textColor}
                />
                <Typography variant="body1" component="span">
                  <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                    {props.section.text}
                  </ReactMarkdown>
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default DisplaySection;
