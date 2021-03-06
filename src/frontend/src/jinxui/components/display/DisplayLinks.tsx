import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { useTheme } from "@material-ui/core/styles";
import {
  usePortfolio,
  useSection,
  LinkDisplayIcon,
  LinkIconEnum,
} from "jinxui";
import { Tuuid } from "jinxui/types";

import { TLink } from "jinxui/types";

/**
 * Run through all the saved links
 * If the link has an address, make it into a clickable link,
 *  otherwise make it a graphic
 * If link has an icon, display it
 */
type TDisplayLinks = {
  horizontalAlign: string;
  textColor?: string;
  pageId?: Tuuid;
  sectionId?: Tuuid;
};
const DisplayLinks = (props: TDisplayLinks) => {
  const { getFetchedPortfolioLinks } = usePortfolio();
  const { getFetchedSectionLinks } = useSection();
  const theme = useTheme();
  const links =
    props.pageId && props.sectionId
      ? getFetchedSectionLinks(props.pageId, props.sectionId)
      : getFetchedPortfolioLinks();

  type TGetLinkDisplayIcon = {
    link: TLink;
    size: any;
  };
  const GetLinkDisplayIcon = (props: TGetLinkDisplayIcon) => {
    if (props.link.icon && props.link.icon !== LinkIconEnum.Disabled) {
      return <LinkDisplayIcon icon={props.link.icon} size={props.size} />;
    } else {
      return <></>;
    }
  };

  const linksHaveText = () => {
    for (var link of links) {
      if (link.name && link.name !== "") {
        return true;
      }
    }
  };

  type TLinkContent = {
    link: TLink;
    textColor?: string;
  };
  const LinkContent = (props: TLinkContent) => {
    const size = linksHaveText()
      ? theme.typography.h3.fontSize
      : theme.typography.h1.fontSize;

    const tooltipMessage = props.link.address ? props.link.address : "";
    const title = props.link.name ? props.link.name : "";

    return (
      <Box
        display="flex"
        alignItems="center"
        color={props.textColor ? props.textColor : theme.palette.text.primary}
      >
        <Tooltip title={tooltipMessage}>
          <Box display="flex" alignItems="center">
            <GetLinkDisplayIcon link={props.link} size={size} />
            <Box width={title.length > 0 ? "15px" : "0px"} />
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Tooltip>
      </Box>
    );
  };

  function onClick(link: TLink) {
    if (link.address) {
      window.open(link.address, "_blank");
    }
  }

  const direction = linksHaveText() ? "column" : "row";
  if (links.length > 0) {
    return (
      <>
        <Box display="flex" justifyContent={props.horizontalAlign}>
          <Box
            display="flex"
            width="max-content"
            flexDirection={direction}
            alignItems="baseline"
            marginBottom="5px"
            marginTop="0px"
          >
            {links.map((link: TLink, index: number) => {
              return (
                <Box key={link.id} margin="15px">
                {/* <Box key={link.id} marginLeft={index > 0 ? "30px" : "0px"}> */}
                  {link.address && link.address !== "" ? (
                    <Box>
                      <Button
                        onClick={() => {
                          onClick(link);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          padding: "0px",
                          textTransform: "none",
                          minWidth: "auto",
                        }}
                      >
                        <LinkContent link={link} textColor={props.textColor} />
                      </Button>
                    </Box>
                  ) : (
                    /* Address does not exist */
                    <>
                      <LinkContent link={link} textColor={props.textColor} />
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </>
    );
  } else {
    return <> </>;
  }
};

export default DisplayLinks;
