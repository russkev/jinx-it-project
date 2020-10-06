import React from "react"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import MenuItem from "@material-ui/core/MenuItem"
import AddIcon from "@material-ui/icons/Add"
import SubjectSharp from "@material-ui/icons/SubjectSharp"
import InsertPhotoSharp from "@material-ui/icons/InsertPhotoSharp"
import VerticalSplitSharp from "@material-ui/icons/VerticalSplitSharp"

import { 
  PrimaryMenu,
} from "jinxui"

const NewSectionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <PrimaryMenu
        id="new-section-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </MenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default NewSectionMenu