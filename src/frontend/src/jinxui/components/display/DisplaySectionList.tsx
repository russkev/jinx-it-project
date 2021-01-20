import React, { useEffect, useState } from "react";
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
  useSection,
  usePage,
  usePortfolio,
  DisplayLinks,
  ThemeSectionColors,
  DisplaySection,
} from "jinxui";
import { TSection } from "jinxui/types";

// Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Given a list of components as props, render them in a centred grid.
 */
function CentredGrid({ components }: { components: JSX.Element[] }) {
  return (
    <Grid container spacing={0}>
      {components.map((component, index) => (
        <Grid item xs={12} key={index}>
          {component}
        </Grid>
      ))}
    </Grid>
  );
}

type TSectionGrid = {
  sections: TSection[];
};
const DisplaySectionList = (props: TSectionGrid) => {
  const theme = useTheme();
  const { getFetchedPages } = usePage();
  const { getFetchedSections } = useSection()
  // var sections: TSection[] = []

  const [sections, setSections] = useState<TSection[]>([])

  useEffect(() => {
    if (getFetchedPages().length > 0) {
      setSections(getFetchedSections(getFetchedPages()[0].id))
    }
  }, [getFetchedPages()])

  // Add logic for mapping data to different section components (i.e. timeline) in here
  const layoutData = (data: TSection, index?: number) => {
    return <DisplaySection {...data} />;
  };

  const applyColors = (component: JSX.Element, index: number) => {
    const [backgroundColor, textColor, isFullHeight] = ThemeSectionColors(
      theme,
      index
    );
    const customCss = theme.portfolio?.section?.css || {};

    return (
      <>
        <Box style={isFullHeight ? {} : { background: backgroundColor }}>
          <Container maxWidth="md">
            <Box
              style={{
                ...customCss,
                color: textColor,
              }}
            >
              <Container disableGutters>{component}</Container>
            </Box>
          </Container>
        </Box>
      </>
    );
  };

  // eslint-disable-next-line
  const [backgroundColor, _textColor, isFullHeight] = ThemeSectionColors(
    theme,
    0
  );

  if (sections) {
    return (
      <Box style={isFullHeight ? { background: backgroundColor } : {}}>
        <CentredGrid
          components={sections.map((section, index) =>
            applyColors(layoutData(section), index)
          )}
        />
      </Box>
    );
  } else {
    return <> </>;
  }
};

export default DisplaySectionList;
