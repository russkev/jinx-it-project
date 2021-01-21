import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import {
  usePage,
  useSection,
  ThemeSectionColors,
  DisplaySection,
  DisplayBackground,
} from "jinxui";
import { TPage } from "jinxui/types";

type TSectionGrid = {
  page: TPage;
};
const DisplaySectionList = (props: TSectionGrid) => {
  const theme = useTheme();
  const { getGlobalSectionIndex } = usePage();
  const { getFetchedSections } = useSection();
  const sections = getFetchedSections(props.page.id);


  // Title, only renders if section index is 0
  type TTitle = {
    sectionIndex: number;
    sectionTheme: any;
    color: string;
    title: string;
  }
  const Title = (props: TTitle) => {

    const titleGap = props.sectionTheme && props.sectionTheme.titleGap
      ? props.sectionTheme.titleGap
      : "2rem"

    if (props.sectionIndex === 0 && props.title.length > 0) {
      return (
        <Box color={props.color}>
          <Typography variant="h2" gutterBottom>
            {props.title}
          </Typography>
          <Box width="100%" height={titleGap} style={{border: "1px solid blue"}} />
        </Box>
      );
    } else {
      return (
        <>
        </>
      )
    }
  }

  const bgColorIndexing = theme.portfolio.section
    ? theme.portfolio.section.bgColorIndexing
    : "page";
  
  const pageGap = theme.portfolio.section?.pageGap 
    ? theme.portfolio.section?.pageGap
    : "10rem"

  // Outer box for if gradient for full page required
  // Inner box is for applying to individual sections
  if (sections) {
    return (
      <DisplayBackground
        allowedIndexingTypes={["page"]}
        index={props.page.index}
      >
        <Box
          width="100%"
          height={pageGap}
          style={{ border: "1px solid red" }}
        />
        {sections.map((section) => {
          const index =
            bgColorIndexing === "sectionGlobal"
              ? getGlobalSectionIndex(props.page.id, section)
              : section.index;

          const sectionTextColor =
            bgColorIndexing === "page"
              ? ThemeSectionColors(theme, props.page.index)[1]
              : ThemeSectionColors(theme, index)[1];

          return (
            <Box key={section.id}>
              <DisplayBackground
                key={section.id}
                allowedIndexingTypes={["sectionLocal", "sectionGlobal"]}
                index={index}
              >
                <Title
                  sectionIndex={section.index}
                  sectionTheme={theme.portfolio.section}
                  color={sectionTextColor}
                  title={props.page.name}
                />
                <Container maxWidth="md">
                  <Container disableGutters>
                    <DisplaySection
                      pageId={props.page.id}
                      section={section}
                      textColor={sectionTextColor}
                    />
                  </Container>
                </Container>
              </DisplayBackground>
            </Box>
          );
        })}
        <Box
          width="100%"
          height={pageGap}
          style={{ border: "1px solid magenta" }}
        />
      </DisplayBackground>
    );
  } else {
    return <> </>;
  }
};

export default DisplaySectionList;
