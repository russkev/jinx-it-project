import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { TimelineItem as MuiTimelineItem } from "@material-ui/lab";

import {
  StyledPaperSectionBase,
  DisplayNavigation,
} from "jinxui";


const DisplayNavigationDesktop = () => {
  return (
    <Box
      position="fixed"
      display="flex"
      flexDirection="column"
      width="max-content"
      left="30px"
      top="50%"
      zIndex={500}
      style={{transform: "translate(0, -50%)"}}
    >
      <StyledPaperSectionBase variant="outlined">
        <DisplayNavigation />
      </StyledPaperSectionBase>
    </Box>
  );
};

export default DisplayNavigationDesktop;
