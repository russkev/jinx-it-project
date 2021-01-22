import React from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import Timeline from "@material-ui/lab/Timeline";
import { TimelineItem as MuiTimelineItem } from "@material-ui/lab";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import {
  usePage,
  StyledPaperSectionBase,
  DisplayNavigation,
  SAVE_DESKTOP_WIDTH,
} from "jinxui";

import { TPage } from "jinxui/types";

const StyledSaveMenuDiv = styled.div`
  @media (max-width: ${() => SAVE_DESKTOP_WIDTH}) {
    display: none;
  }
`;

const TimelineItem = withStyles({
  missingOppositeContent: {
    "&:before": {
      display: "none"
    }
  }
})(MuiTimelineItem)

const useStyles = makeStyles((theme) => ({
  verticallyCenterContent: {
    margin: "auto 0"
  },
  menuText: {
    textAlign: "right"
  },
}));

const DisplayNavigationDesktop = () => {
  const { getFetchedPages } = usePage();
  const classes = useStyles();

  return (
    <Box
      position="fixed"
      display="flex"
      flexDirection="column"
      width="max-content"
      right="30px"
      bottom="50%"
      zIndex={500}
    >
      <StyledPaperSectionBase variant="outlined">
        <DisplayNavigation />
      </StyledPaperSectionBase>
    </Box>
  );
};

export default DisplayNavigationDesktop;
