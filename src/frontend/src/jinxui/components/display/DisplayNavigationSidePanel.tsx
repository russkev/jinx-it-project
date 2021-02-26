import React from "react";
import Box from "@material-ui/core/Box";
import SwipableDrawer from "@material-ui/core/SwipeableDrawer"
import Hidden from "@material-ui/core/Hidden";
import { 
  DisplayNavigationTimeline,
  StyledPaperSectionBase, 
} from "jinxui";

type TDIsplayNavigation = {
  open: boolean;
  setOpen: any;
};

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
      style={{ transform: "translate(0, -50%)" }}
    >
      <StyledPaperSectionBase variant="outlined">
        <DisplayNavigationTimeline />
      </StyledPaperSectionBase>
    </Box>
  );
};

const DisplayNavigationMobile = (props: TDIsplayNavigation) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOpen = () => {
    props.setOpen(true);
  };
  return (
    <SwipableDrawer
      anchor="left"
      open={props.open}
      onOpen={handleOpen}
      onClose={handleClose}
      variant="temporary"
    >
      <Box display="flex" height="100%">
        <DisplayNavigationTimeline handleClose={handleClose} />
      </Box>
    </SwipableDrawer>
  );
};


const DisplayNavigationSidePanel = (props: TDIsplayNavigation) => {


  return (
    <Box>
      <Hidden smUp implementation="css">
        <DisplayNavigationMobile open={props.open} setOpen={props.setOpen}/>
      </Hidden>
      <Hidden lgDown implementation="css">
        <DisplayNavigationDesktop />
      </Hidden>
    </Box>
  );
};

export default DisplayNavigationSidePanel;
