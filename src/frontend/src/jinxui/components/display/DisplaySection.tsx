import React, { useState } from "react";
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
  useUser,
  DisplayLinks,
  ThemeSectionColors,
} from "jinxui";
import { TSection, TSectionInfo, TImage } from "jinxui/types";

// Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

interface TDisplaySection extends TSectionInfo {
  textColor: string;
}
const TextComponent = (props: TDisplaySection) => {
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
  const isTextSection = props.section.type === "text";
  if (isTextSection && props.section.text) {
    return (
      <Grid item xs={12} sm={12}>
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
    );
  } else {
    return <></>;
  }
};

const ImageComponent = (props: TDisplaySection) => {
  // const { fetchImage } = useUser();
  // const classes = useStyles();
  // const isImageSection = props.section.type === "image";
  // const [localImage, setLocalImage] = useState<TImage>({
  //   id: "",
  //   name: "",
  //   path: "",
  // });

  // if (props.section.image) {
  //   fetchImage(props.section.image)
  //     .then((response: any) => {
  //       setLocalImage(response.data);
  //     })
  //     .catch((error: any) => {
  //       throw error;
  //     });
  // }

  // if (props.section.image) {
  //   return (
  //     <>
  //       <Grid item xs={12} sm={12}>
  //         <img
  //           src={localImage.path}
  //           alt={localImage.name}
  //           className={classes.img}
  //           style={{ marginTop: "25px" }} // compensate for markdown
  //         />
  //       </Grid>
  //     </>
  //   );
  // } else {
    return <> </>;
  // }
};

/**
 * Generic section component that accepts any of the section fields and places their data (no background).
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */

const DisplaySection = (props: TDisplaySection) => {
  const classes = useStyles();

  // Cols per item when we want the text/media to fit on one row
  // const colsPerItem = data.content && data.path ? 6 : 12;
  const colsPerItem = 12;

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
            <TextComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            />
            <ImageComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            />
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default DisplaySection;
