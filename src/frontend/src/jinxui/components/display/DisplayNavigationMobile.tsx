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

import { DisplayNavigation, StyledPaperSectionBase } from "jinxui";

const DisplayNavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      {/* <Box
        position="fixed"
        display="flex"
        right="30px"
        top="90px"
        zIndex={500}
        
      >
        <Button>
          <MenuRoundedIcon
            style={{
              fontSize: 40,
            }}
          />
        </Button>
      </Box> */}
      {/* <Box
        position="fixed"
        display="flex"
        right="0px"
        top="70px"
        zIndex={500}
        style={{
          background: theme.palette.background.default,
        }}
        borderRadius="10px 0px 0px 10px"
      > */}
        <Button onClick={handleOpen} style={{padding: "6px"}}>
          <MenuRoundedIcon
            // color="primary"
            fontSize="large"
            style={{
              // color: theme.palette.grey[500],
              mixBlendMode: "difference",
              // fontSize: 40,
            }}
          />
        </Button>
      {/* </Box> */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        variant="temporary"
        // BackdropProps={{ invisible: true }}
      >
        <Box display="flex" height="100%">
          <DisplayNavigation handleClose={handleClose}/>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DisplayNavigationMobile;
