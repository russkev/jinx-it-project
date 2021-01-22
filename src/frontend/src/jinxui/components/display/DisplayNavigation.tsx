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

import { usePage, StyledPaperSectionBase, SAVE_DESKTOP_WIDTH } from "jinxui";

import { TPage } from "jinxui/types";

const useStyles = makeStyles((theme) => ({
  verticallyCenterContent: {
    margin: "auto 0",
  },
  menuText: {
    textAlign: "right",
  },
}));

const TimelineItem = withStyles({
  missingOppositeContent: {
    "&:before": {
      display: "none",
    },
  },
})(MuiTimelineItem);

type TDisplayNavigation = {
  handleClose?: any
}
const DisplayNavigation = (props: TDisplayNavigation) => {
  const { getFetchedPages } = usePage();
  const classes = useStyles();
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      maxWidth="300px" 
      alignSelf="center">
      <Timeline align="right">
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
            if (props.handleClose) {
              props.handleClose()
            }
          };
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <MenuItem onClick={onClick} key={page.id}>
                  <ListItemText
                    primary={page.name}
                    classes={{ primary: classes.menuText }}
                  />
                </MenuItem>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
};

export default DisplayNavigation;
