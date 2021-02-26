import React, { useState } from "react";
import styled from "styled-components";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import {
  LinkIconMenu,
  PrimaryButton,
  usePortfolio,
  useSection,
  LinkIconEnum,
  SecondaryButton,
} from "jinxui";
import { TLink } from "jinxui/types";

const LinkInputDiv = styled.div`
  display: grid;
  row-gap: 30px;
`;

const LinkInputInnerDiv = styled.div`
  display: flex;
  align-items: baseline;
`;

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
  width: 100%;
`;

/**
 *  Dialog for choosing or modifying a link / icon combination
 */
type TLinkDialog = {
  link?: TLink;
  // section: TEditSection
  pageId?: string;
  sectionId?: string;
  setAnchoEl?: any;
};
const LinkDialog = React.forwardRef((props: TLinkDialog, ref: any) => {
  const [open, setOpen] = useState(false);
  const [linkIcon, setLinkIcon] = useState(
    props.link ? props.link.icon : LinkIconEnum.Disabled
  );
  const { portfolioLinkUpdate } = usePortfolio();
  const { sectionLinkUpdate } = useSection();

  const handleClickOpen = () => {
    setOpen(true);
  };

  // The link to use if not editing an existing one
  const newLink: TLink = {
    name: "",
    address: "",
    icon: LinkIconEnum.Disabled,
    id: "",
    index: 0,
  };

  // Set up the link to be worked on
  const activeLink = props.link ? props.link : newLink;

  // Set up the button text
  const okayText = props.link ? "OK" : "ADD";

  // Add new link to list / update existing
  const handleUpdate = () => {
    if (props.sectionId && props.pageId) {
      sectionLinkUpdate(props.pageId, props.sectionId, activeLink);
    } else {
      portfolioLinkUpdate(activeLink);
    }
    setLinkIcon(0);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // The 'OK' button
  const ActivationButton = () => {
    if (props.link) {
      return (
        <MenuItem
          onClick={() => {
            handleClickOpen();
            if (props.link) {
              setLinkIcon(props.link.icon);
            }
            if (props.setAnchoEl) {
              props.setAnchoEl(null);
            }
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      );
    } else {
      return (
        <SecondaryButton onClick={handleClickOpen} style={{ width: "auto" }}>
          Add Link
        </SecondaryButton>
      );
    }
  };

  return (
    <>
      <ActivationButton />
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <Formik
          initialValues={{
            linkName: activeLink.name,
            linkAddress: activeLink.address,
          }}
          onSubmit={(values) => {
            activeLink.name = values.linkName;
            activeLink.address = values.linkAddress;
            activeLink.icon = linkIcon;
            handleUpdate();
          }}
        >
          <Form>
            <DialogTitle id="link-dialog-title">Link</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Note: Leave title blank to display just the icon.
              </DialogContentText>
              <LinkInputDiv>
                <LinkInputInnerDiv>
                  <LinkIconMenu linkIcon={linkIcon} setLinkIcon={setLinkIcon} />
                  <Field
                    component={TextField}
                    id="linkName"
                    name="linkName"
                    label="Link Title"
                    fullWidth
                    color="secondary"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CreateIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </LinkInputInnerDiv>
                <Field
                  component={TextField}
                  id="linkAddress"
                  name="linkAddress"
                  label="Link Address"
                  fullWidth
                  color="secondary"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CreateIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </LinkInputDiv>
            </DialogContent>
            <DialogActions>
              <PublishCancelDiv>
                <div>
                  <PrimaryButton type="submit">{okayText}</PrimaryButton>
                </div>
                <div>
                  <SecondaryButton type="button" onClick={handleClose}>
                    Cancel
                  </SecondaryButton>
                </div>
              </PublishCancelDiv>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
});

export default LinkDialog;
