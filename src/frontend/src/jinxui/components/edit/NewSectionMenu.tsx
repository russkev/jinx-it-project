import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import SubjectSharp from "@material-ui/icons/SubjectSharp";
import InsertPhotoSharp from "@material-ui/icons/InsertPhotoSharp";
import VerticalSplitSharp from "@material-ui/icons/VerticalSplitSharp";

import { v4 as uuidv4 } from "uuid"

import { PrimaryMenu, useSection, defaultSectionContext } from "jinxui";

import { TSection, Tuuid } from "jinxui/types";

type TNewSectionMenu = {
  pageId: Tuuid;
  section: any;
  placeAbove?: boolean;
};



const NewSectionMenu = (props: TNewSectionMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleSectionChange, sectionIndex } = useSection();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddImageTextSection = () => {
    addSection("image_text");
  };

  const handleAddTextSection = () => {
    addSection("text");
  };

  const handleAddImageSection = () => {
    addSection("image");
  };

  const addSection = (section_type: string) => {
    setAnchorEl(null);

    const index = sectionIndex(props.pageId, props.section.id)

    const target_index = props.placeAbove ? index : index + 1;
    // const newSection = DefaultSectionData();
    const newSection:TSection = JSON.parse(JSON.stringify(defaultSectionContext))
    newSection.type = section_type;
    newSection.id = uuidv4();
    newSection.page = props.pageId;

    handleSectionChange(props.pageId, target_index, newSection);
  };

  return (
    <div>
      <Tooltip title="Add new section" arrow>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
      </Tooltip>
      <PrimaryMenu
        id="new-section-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddTextSection}>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem onClick={handleAddImageSection}>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem onClick={handleAddImageTextSection}>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </MenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default NewSectionMenu;
