import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Subject from "@material-ui/icons/Subject";
import InsertPhoto from "@material-ui/icons/InsertPhoto";
import VerticalSplit from "@material-ui/icons/VerticalSplit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { useSection, PrimaryMenu } from "jinxui";

import { ESectionType, TSectionInfo } from "jinxui/types";

const ContentChoiceMenu = (props: TSectionInfo) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleSectionStateUpdate } = useSection();

  const handleSectionTypeUpdate = (type: ESectionType) => {
    handleSectionStateUpdate(props.pageId, props.section.id, { type: type });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Choose content type" arrow>
        <Button
          size="medium"
          style={{
            minWidth: 40,
          }}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
      </Tooltip>
      <PrimaryMenu
        id="input-choice-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Typography align="center" variant="h6">
          Content Type
        </Typography>
        <MenuItem onClick={() => handleSectionTypeUpdate(ESectionType.text)}>
          <ListItemIcon>
            <Subject fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem onClick={() => handleSectionTypeUpdate(ESectionType.image)}>
          <ListItemIcon>
            <InsertPhoto fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem
          onClick={() => handleSectionTypeUpdate(ESectionType.imageText)}
        >
          <ListItemIcon>
            <VerticalSplit fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image Text" />
        </MenuItem>
        <MenuItem onClick={() => handleSectionTypeUpdate(ESectionType.video)}>
          <ListItemIcon>
            <OndemandVideoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Embedded Video" />
        </MenuItem>
      </PrimaryMenu>
    </>
  );
};

export default ContentChoiceMenu;
