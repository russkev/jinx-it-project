import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import {
  useUser,
  MenuGap,
  PrimaryButton,
  SecondaryButton,
  StyledFormBottomButtonsDiv,
} from "jinxui";

import { TDialog } from "jinxui/types";

// Main container for fields.
const FormSectionsDiv = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows:
    93px
    93px
    88px
    45px
    93px
    93px
    54px;
`;

const AccountSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  oldPassword: Yup.string(),
  newPassword: Yup.string()
    .min(8, "Too Short!")
    .matches(/(?!^\d+$)^.+$/, "Password cannot consist of only numbers"),
  newPasswordConfirm: Yup.string().oneOf(
    [Yup.ref("newPassword"), undefined],
    "Passwords don't match"
  ),
});

const DialogAccount = forwardRef((props: TDialog, ref: any) => {
  const {
    userData,
    setSuccessMessage,
    setErrorMessage,
    updateAccount,
  } = useUser();

  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <>
      <Dialog
        ref={ref}
        open={props.open}
        aria-labelledby="Account Settings"
        onClose={handleClose}
        maxWidth="xl"
        // fullWidth
      >
        <DialogTitle id="account-settings-dialog">Account Settings</DialogTitle>
        <Formik
          initialValues={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          validationSchema={AccountSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            updateAccount(values)
              .then(() => {
                setSubmitting(false);
                props.setOpen(false);
                setSuccessMessage("Updated account details");
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  setErrorMessage("Invalid password");
                } else {
                  setErrorMessage(error.message);
                }
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormSectionsDiv>
                <Field
                  component={TextField}
                  name="firstName"
                  id="firstName"
                  variant="outlined"
                  color="secondary"
                  label="First Name"
                  fullWidth
                />

                <Field
                  component={TextField}
                  name="lastName"
                  id="lastName"
                  variant="outlined"
                  color="secondary"
                  label="Last Name"
                  fullWidth
                />

                <Field
                  component={TextField}
                  name="email"
                  id="email"
                  variant="outlined"
                  color="secondary"
                  label="Email"
                  fullWidth
                />

                <MenuGap />

                <Field
                  component={TextField}
                  name="oldPassword"
                  id="oldPassword"
                  variant="outlined"
                  color="secondary"
                  type="password"
                  label="Old Password"
                  fullWidth
                />

                <Field
                  component={TextField}
                  name="newPassword"
                  id="newPassword"
                  variant="outlined"
                  color="secondary"
                  type="password"
                  label="New Password"
                  fullWidth
                />

                <Field
                  component={TextField}
                  name="newPasswordConfirm"
                  id="newPasswordConfirm"
                  variant="outlined"
                  color="secondary"
                  type="password"
                  label="New Password Confirm"
                  fullWidth
                />
              </FormSectionsDiv>
              <StyledFormBottomButtonsDiv>
                <Box padding="0px 15px">
                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    OK
                  </PrimaryButton>
                </Box>
                <Box padding="0px 15px">
                  <SecondaryButton
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleClose}
                  >
                    Cancel
                  </SecondaryButton>
                </Box>
              </StyledFormBottomButtonsDiv>
            </Form>
          )}
        </Formik>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
});
export default DialogAccount;
