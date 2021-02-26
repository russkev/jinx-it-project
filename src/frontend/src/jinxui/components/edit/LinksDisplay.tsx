import React from "react";

import { usePortfolio, useSection, LinkEditMenu } from "jinxui";

import { TLink } from "jinxui/types";

type TLinksDisplay = {
  pageId?: string;
  sectionId?: string;
};
const LinksDisplay = (props: TLinksDisplay) => {
  const { getFetchedPortfolioLinks } = usePortfolio();
  const { getFetchedSectionLinks } = useSection();

  return (
    <>
      {props.pageId && props.sectionId
        // Display section links
        ? getFetchedSectionLinks(props.pageId, props.sectionId).map(
            (link: TLink) => {
              return (
                <LinkEditMenu
                  key={link.id}
                  link={link}
                  pageId={props.pageId}
                  sectionId={props.sectionId}
                />
              );
            }
          )
        : getFetchedPortfolioLinks().map((link: TLink) => {
          // Display page links
            return <LinkEditMenu key={link.id} link={link} />;
          })}
    </>
  );
};

export default LinksDisplay;
