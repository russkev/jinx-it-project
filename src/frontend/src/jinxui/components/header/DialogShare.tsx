import React, { forwardRef } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import LinkIcon from "@material-ui/icons/Link";

import { useUser } from "jinxui";
import { TDialog } from "jinxui/types";


const DialogShare = forwardRef((props: TDialog, ref: any) => {
  const { userData, setSuccessMessage } = useUser();


  const handleClose = () => {
    props.setOpen(false)
  };

  const path = process.env.REACT_APP_FRONT_URL + "u/" + userData.username;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(path);
    setSuccessMessage("Portfolio link copied to clipboard");
    handleClose();
  };

  return (
    <>
      <Dialog
        ref={ref}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="Share dialog"
      >
        <DialogTitle id="share-dialog-title">Share</DialogTitle>
        <DialogContent>
          <DialogContentText>{path}</DialogContentText>
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText>Copy to Clipboard</ListItemText>
          </MenuItem>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default DialogShare;
