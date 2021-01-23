import React from "react";
import Box from "@material-ui/core/Box";
import SwipableDrawer from "@material-ui/core/SwipeableDrawer"
import Hidden from "@material-ui/core/Hidden";
import { 
  DisplayNavigationDesktop, 
  DisplayNavigation, 
} from "jinxui";


type TDIsplayNavigationMobile = {
  open: boolean
  setOpen: any
}
const DisplayNavigationMobile = (props: TDIsplayNavigationMobile) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOpen = () => {
    props.setOpen(true)
  }

  return (
    <Box>
      <Hidden smUp implementation="css">
        <SwipableDrawer
          anchor="left"
          open={props.open}
          onOpen={handleOpen}
          onClose={handleClose}
          variant="temporary"
        >
          <Box display="flex" height="100%">
            <DisplayNavigation handleClose={handleClose} />
          </Box>
        </SwipableDrawer>
      </Hidden>
      <Hidden lgDown implementation="css">
        <DisplayNavigationDesktop />
      </Hidden>
    </Box>
  );
};

export default DisplayNavigationMobile;
