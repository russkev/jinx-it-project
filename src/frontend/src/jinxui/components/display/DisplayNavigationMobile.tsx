import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { useTheme } from "@material-ui/core/styles";

import Timeline from "@material-ui/lab/Timeline";
import { TimelineItem as MuiTimelineItem } from "@material-ui/lab";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { DisplayNavigation, StyledPaperSectionBase } from "jinxui";
import { AnyARecord } from "dns";

const drawerWidth = 300;

type TDIsplayNavigationMobile = {
  open: boolean
  setOpen: any
}
const DisplayNavigationMobile = (props: TDIsplayNavigationMobile) => {
  // const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Box>
      <Hidden lgUp implementation="css">
        <Drawer
          anchor="left"
          open={props.open}
          onClose={handleClose}
          variant="temporary"
        >
          <Box display="flex" height="100%">
            <DisplayNavigation handleClose={handleClose} />
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          anchor="left"
          open={props.open}
          onClose={handleClose}
          variant="permanent"
        >
          <Box display="flex" height="100%">
            <DisplayNavigation handleClose={handleClose} />
          </Box>
        </Drawer>
      </Hidden>
    </Box>
  );
};

export default DisplayNavigationMobile;
