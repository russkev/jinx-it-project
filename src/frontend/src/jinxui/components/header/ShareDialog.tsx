import React, { forwardRef, useState } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog"
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ShareIcon from "@material-ui/icons/Share";
import LinkIcon from "@material-ui/icons/Link";

import { useUser } from "jinxui"

type TShareDialog = {
  setMenuOpen: any;
};
const ShareDialog = forwardRef((props: TShareDialog, ref: any) => {
  const { userData, setSuccessMessage } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    props.setMenuOpen(false)
  };

  const path = process.env.REACT_APP_FRONT_URL + "u/" + userData.username;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(path)
    setSuccessMessage("Portfolio link copied to clipboard")
    handleClose();
  }


  return (
    <>
      <MenuItem ref={ref} onClick={handleClickOpen}>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText>
          Share
        </ListItemText>
      </MenuItem>
      <Dialog ref={ref} open={dialogOpen} onClose={handleClose} aria-labelledby="Share dialog">
        <DialogTitle id="share-dialog-title">Share</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {path}
          </DialogContentText>
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText>
              Copy to Clipboard
            </ListItemText>
          </MenuItem>
        </DialogContent>

      </Dialog>
    </>
  );
});

export default ShareDialog;