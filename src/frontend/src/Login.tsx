import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import {
  PrimaryButton,
  SecondaryButton,
  AccountPageDiv,
  Routes,
  useUser,
  HeaderBar,
  StyledFormDiv,
  StyledFormAlert,
  StyledFormOuterDiv,
  StyledFormSectionsDiv,
  StyledFormBottomButtonsDiv,
} from "jinxui";

import { LightTheme, LightTitleBGGrad } from "jinxui/themes";

// Ensure enough white space on top of form
const FormTitleDiv = styled.div`
  margin-top: 30px;
`;

// Ensure link isn't underlined
const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

// Custom validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .matches(
      /^[a-zA-Z0-9_@+.-]+$/,
      "Can only contain letters, numbers, and some special characters"
    )
    .required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [submittionError, setSubmittionError] = useState("");

  const { userData, login } = useUser();
  /** Due to how the router protection works, this is a bit hackey.
   * The Routes.LOGIN route is not protected, because doing so causes
   * the redirect from LOGIN to PORTFOLIO_EDIT (a protected route) to
   * be overridden by the route protection's redirect (i.e. to home).
   */
  const [redirect, setRedirect] = useState(
    userData.authenticated ? true : false
  );

  const onLogin = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
  };

  if (redirect) {
    return onLogin();
  } else {
    return (
      <>
        <ThemeProvider theme={LightTheme}>
          <CssBaseline />
          <AccountPageDiv>
            <HeaderBar title="Login" hideLogin={true} />
            <StyledFormOuterDiv>
              <div />
              <StyledFormDiv
                variant="elevation"
                elevation={8}
                style={{ background: LightTitleBGGrad }}
              >
                <FormTitleDiv>
                  <Typography variant="h5">Enter Details</Typography>
                </FormTitleDiv>
                {submittionError ? (
                  <StyledFormAlert severity="error">
                    Error logging in: {submittionError}.
                  </StyledFormAlert>
                ) : null}
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    login(values.username, values.password)
                      .then((config: any) => {
                        setRedirect(true);
                      })
                      .catch((error: any) => {
                        setSubmittionError(error);
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <StyledFormSectionsDiv>
                        {/* Note: Validation handled automatically 
                            by Formik-Material-UI */}
                        <Field
                          component={TextField}
                          name="username"
                          id="username"
                          label="Username"
                          variant="outlined"
                          color="primary"
                          fullWidth
                        />
                        <Field
                          component={TextField}
                          name="password"
                          id="password"
                          type="password"
                          label="Password"
                          variant="outlined"
                          color="primary"
                          fullWidth
                        />
                        <StyledFormBottomButtonsDiv>
                          <PrimaryButton type="submit" disabled={isSubmitting}>
                            LOGIN
                          </PrimaryButton>
                          <SecondaryButton>Reset Password</SecondaryButton>
                        </StyledFormBottomButtonsDiv>
                        <StyledLink href={Routes.SIGNUP}>
                          <Typography variant="button">
                            Sign up for an account
                          </Typography>
                        </StyledLink>
                      </StyledFormSectionsDiv>
                    </Form>
                  )}
                </Formik>
              </StyledFormDiv>
              <div />
            </StyledFormOuterDiv>
          </AccountPageDiv>
        </ThemeProvider>
      </>
    );
  }
};

export default Login;
