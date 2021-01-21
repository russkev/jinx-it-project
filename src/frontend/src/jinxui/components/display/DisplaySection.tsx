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
  // const type = props.section.type;
  // const isTextSection =
  //   type === ESectionType.text || type === ESectionType.imageText;
  // if (isTextSection && props.section.text) {
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
  // } else {
  //   return <></>;
  // }
};

const ImageComponent = (props: TDisplaySection) => {
  const classes = useStyles();
  const type = props.section.type;
  // const isImageSection =
  //   type === ESectionType.image || type;
  // if (isImageSection && props.section.image !== null) {
  return (
    <>
      <Grid item xs={12} sm={12}>
        {props.section.image !== null ? (
          <img
            src={props.section.image.path}
            alt={props.section.image.name}
            className={classes.img}
            style={{ marginTop: "25px" }} // compensate for markdown
          />
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
  // } else {
  //   return <> </>;
  // }
};

const VideoComponent = (props: TDisplaySection) => {
  const type = props.section.type;
  const isVideoSection = type === ESectionType.video;
  // if (isVideoSection) {
  return (
    <Grid item xs={12} sm={12}>
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
    </Grid>
  );
  // } else {
  //   return <> </>;
  // }
};

const ImageTextComponent = (props: TDisplaySection) => {
  const isImageTextSection = props.section.type === ESectionType.imageText;
  // if (isImageTextSection) {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr">
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
    </Box>
  );
  // } else {
  //   return <> </>;
  // }
};

type THeadingComponent = {
  heading: string;
  gap: number
};
const HeadingComponent = (props: THeadingComponent) => {
  if (props.heading.length > 0) {
    return (
      <Box marginBottom={props.gap + "px"}>
        <Typography variant="h4" gutterBottom>
          {props.heading}
        </Typography>
      </Box>
      // <Box width="100%" height={gap + "px"} />
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

  const headingGap =
    sectionTheme?.titleGap !== undefined && props.section.name.length > 0
      ? sectionTheme.titleGap
      : 0;

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

  const sectionMap = new Map<
    ESectionType,
    (props: TDisplaySection) => JSX.Element
  >();
  sectionMap.set(ESectionType.image, ImageComponent);
  sectionMap.set(ESectionType.text, TextComponent);
  sectionMap.set(ESectionType.video, VideoComponent);
  sectionMap.set(ESectionType.imageText, ImageTextComponent);

  // const sectionMap: Map<ESectionType, () => string> = {
  //   [ESectionType.image] : ImageComponent,
  //   [ESectionType.text]  : TextComponent,
  //   [ESectionType.video] : VideoComponent,
  //   [ESectionType.imageText] : ImageTextComponent,
  // }

  let SectionComponent = sectionMap.get(props.section.type);
  if (SectionComponent === undefined) {
    SectionComponent = TextComponent;
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
          {/* <Typography variant="h4" gutterBottom>
            {props.section.name}
          </Typography> */}
          <HeadingComponent heading={props.section.name} gap={headingGap} />
          <Grid
            container
            direction="row-reverse"
            // style={{ marginTop: headingGap }}
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
            {SectionComponent(props)}
            {/* <SectionComponent 
              pageId={props.pageId}
              section={props.sectionId}
              textColor={props.textColor}
            /> */}
            {/* <TextComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            />
            <ImageComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            />
            <VideoComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            /> */}
            {/* <ImageTextComponent
              pageId={props.pageId}
              section={props.section}
              textColor={props.textColor}
            /> */}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default DisplaySection;
