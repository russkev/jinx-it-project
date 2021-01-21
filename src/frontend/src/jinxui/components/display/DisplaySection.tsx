import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactPlayer from "react-player";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { DisplayLinks } from "jinxui";
import { TSectionInfo, ESectionType } from "jinxui/types";

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
      // padding: theme.portfolio.section?.borderPadding,
      padding: "-30px",
      border: "1px solid " + theme.palette.secondary.main,
    },
  })
);

interface TDisplaySection extends TSectionInfo {
  textColor: string;
}
interface TComponent extends TDisplaySection {
  sectionTheme: any;
}
const TextComponent = (props: TComponent) => {
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

  return (
    <Box 
      marginTop={"-25px"} // Compensate for markdown offset
    >
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
    </Box>
  );
};

const ImageComponent = (props: TComponent) => {
  const classes = useStyles();
  return (
    <>
      {props.section.image !== null ? (
        <img
          src={props.section.image.path}
          alt={props.section.image.name}
          className={classes.img}
          // style={{ marginTop: "25px" }} // compensate for markdown
        />
      ) : (
        <></>
      )}
    </>
  );
};

const VideoComponent = (props: TComponent) => {
  return (
    <Box
      position="relative"
      paddingBottom="56.25%" // 16:9
      paddingTop="30px"
      height={0}
      overflow="hidden"
      marginBottom="15px"
      style={{ background: "black" }}
    >
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <ReactPlayer url={props.section.video} width="100%" height="100%" />
      </Box>
    </Box>
  );
};

const ImageTextComponent = (props: TComponent) => {
  const spacing =
    props.sectionTheme.spacing !== undefined ? props.sectionTheme.spacing : 4;

  return (
    <Grid container direction="row-reverse" spacing={spacing}>
      <Grid item xs={12} sm={6}>
        {ImageComponent(props)}
      </Grid>
      <Grid item xs={12} sm={6}>
        {TextComponent(props)}
      </Grid>
    </Grid>
  );
};

type THeadingComponent = {
  sectionTheme: any;
  heading: string;
};
const HeadingComponent = (props: THeadingComponent) => {
  const headingGap =
    props.sectionTheme?.headingGap !== undefined
      ? props.sectionTheme.headingGap
      : "30px";

  if (props.heading.length > 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {props.heading}
        </Typography>
        <Box
          width="100%"
          height={headingGap}
          style={{ border: "1px solid yellow" }}
        />
      </Box>
    );
  } else {
    return <> </>;
  }
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
  const theme = useTheme();

  // Set defaults for various variables
  const sectionTheme = theme.portfolio.section;

  const sectionGap =
    sectionTheme?.sectionGap !== undefined ? sectionTheme.sectionGap : "2.5em";

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

  const sectionMap = new Map<
    ESectionType,
    (props: TComponent) => JSX.Element
  >();
  sectionMap.set(ESectionType.image, ImageComponent);
  sectionMap.set(ESectionType.text, TextComponent);
  sectionMap.set(ESectionType.video, VideoComponent);
  sectionMap.set(ESectionType.imageText, ImageTextComponent);

  let SectionComponent = sectionMap.get(props.section.type);
  if (SectionComponent === undefined) {
    SectionComponent = TextComponent;
  }
  const componentProps: TComponent = { ...props, sectionTheme: sectionTheme };

  return (
    <>
      <Box
        width="100%"
        height={sectionGap}
        style={{ border: "1px solid purple" }}
      />
      <Box textAlign="left">
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
          <HeadingComponent
            heading={props.section.name}
            sectionTheme={sectionTheme}
          />
          {SectionComponent(componentProps)}
        </Paper>
      </Box>
      <Box
        width="100%"
        height={sectionGap}
        style={{ border: "1px solid green" }}
      />
    </>
  );
};

export default DisplaySection;
