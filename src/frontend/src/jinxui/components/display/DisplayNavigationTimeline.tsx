import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Timeline from "@material-ui/lab/Timeline";
import { TimelineItem as MuiTimelineItem } from "@material-ui/lab";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import { usePage } from "jinxui";
import { defaultPageContext } from "jinxui/contexts";
import { TPage, Tuuid } from "jinxui/types";

type TDisplayNavigation = {
  handleClose?: any;
};

const useStyles = makeStyles((theme) => ({
  verticallyCenterContent: {
    margin: "auto 0",
    textAlign: "right",
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

export function HandleNavigationClick(
  handleClose: any,
  id: Tuuid,
  index: number
) {
  let y = 0;
  if (index > -1) {
    const yOffset = -70;
    const element = document.getElementById(id);
    if (!element) {
      throw Error("Tried to create navigation link to unknown location");
    }
    y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  }

  window.scrollTo({ top: y, behavior: "smooth" });
  if (handleClose) {
    handleClose();
  }
}

type TNavigationItem = {
  pageId: Tuuid;
  name: string;
  index: number;
  handleClose: any;
};
const NavigationItem = (props: TNavigationItem) => {
  const classes = useStyles();

  const onClick = () => {
    HandleNavigationClick(props.handleClose, props.pageId, props.index);
  };
  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <MenuItem
            onClick={onClick}
            key={props.pageId}
            component="div"
            style={{ whiteSpace: "normal", justifyContent: "right" }}
          >
            <Typography align="right" variant="button" style={{textTransform: "none"}}>
              {props.name}
            </Typography>
          </MenuItem>
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

const DisplayNavigationTimeline = (props: TDisplayNavigation) => {
  const { getFetchedPages } = usePage();
  const pages = getFetchedPages();

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="230px"
      alignSelf="center"
    >
      <Timeline align="right">
        <NavigationItem
          pageId={defaultPageContext.id}
          name={"Home"}
          index={-1}
          handleClose={props.handleClose}
        />
        {pages.map((page: TPage, index: number) => {
          return (
            <NavigationItem
              key={page.id}
              pageId={page.id}
              name={page.name}
              index={index}
              handleClose={props.handleClose}
            />
          );
        })}
      </Timeline>
    </Box>
  );
};

export default DisplayNavigationTimeline;
