import React from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import Timeline from "@material-ui/lab/Timeline";
import { TimelineItem as MuiTimelineItem } from "@material-ui/lab";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import {
  usePage,
  StyledPaperSectionBase,
  PrimaryButton,
  SecondaryButton,
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
  menuText: {
    textAlign: "right",
  },
  verticallyCenterContent: {
    margin: "auto 0"
  },
  oppositeContent: {
    // width: "0px"
    // translate: "170px"
  }
}));

const DisplayNavigation = () => {
  const { getFetchedPages } = usePage();
  const classes = useStyles();

  return (
    // <StyledSaveMenuDiv>
    <Box
      // padding="30px"
      position="fixed"
      display="flex"
      flexDirection="column"
      width="max-content"
      right="30px"
      bottom="50%"
      zIndex={500}
    >
      <StyledPaperSectionBase variant="outlined">
        <Box display="flex" flexDirection="column" maxWidth="380px">
          <Timeline align="right">
            {/* <TimelineItem>

            <TimelineSeparator>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
            </TimelineItem> */}
            {getFetchedPages().map((page: TPage) => {
              const onClick = () => {
                const yOffset = -70;
                const element = document.getElementById(page.id);
                let y = 0;
                if (element) {
                  y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                }
                if (element) {
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              };
              return (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                  // style={{translate: "0px -19px"}}
                  // className={classes.verticallyCenterContent}
                  >
                    {/* {page.name} */}
                    <MenuItem onClick={onClick} key={page.id}>
                      <ListItemText
                        primary={page.name}
                        classes={{ primary: classes.menuText }}
                      />
                    </MenuItem>
                    {/* {page.name} */}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      </StyledPaperSectionBase>
    </Box>
    // </StyledSaveMenuDiv>
  );
};

export default DisplayNavigation;
