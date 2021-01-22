import React, { useState } from "react";
import styled from "styled-components";

import {
  useTheme,
  Theme,
  Box,
  AppBar,
  Typography,
  Slide,
  useScrollTrigger,
  StylesProvider,
} from "@material-ui/core";

import {
  useUser,
  LogoLink,
  DropdownPortfolio,
  DialogAccount,
  DialogShare,
  DialogTheme,
  SecondaryButton,
  Routes,
  SnackbarAlert,
  DisplayNavigationMobile,
  MAX_EDIT_SECTION_WIDTH,
} from "jinxui";

import {
  LightTheme,
  DarkTheme,
  LightHeaderGrad,
  DarkHeaderGrad,
} from "jinxui/themes";
import { LiveTvSharp } from "@material-ui/icons";

const HeaderMediaWidth = () => {
  return "650px";
};

// Ensure that app bar sticks to top and sides
const StyledAppBar = styled(AppBar)`
  margin: 0px;
`;

// Three columns, left middle and right
const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: minMax(56px, max-content);
  align-self: center;
  width: inherit;
`;

//Left items
const StyledDivLeft = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

// Center items
const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

// Right items
const StyledDivRight = styled.div`
  padding-right: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledDivTitle = styled.div`
  @media (max-width: ${() => HeaderMediaWidth()}) {
    display: none;
  }
`;

const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px;
  height: 30px;
  width: 120px;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

function headerBackground(theme: Theme) {
  let background = theme.palette.background.paper;

  if (theme.portfolio.theme && theme.portfolio.theme.name) {
    if (theme.portfolio.theme.name === "GlobalLight") {
      background = LightHeaderGrad;
    } else if (theme.portfolio.theme.name === "GlobalDark") {
      background = DarkHeaderGrad;
    }
  }
  return background
}

type HeaderBarProps = {
  title?: string;
  darkTheme?: boolean;
  children?: React.ReactNode;
  hideLogo?: boolean;
  hideLogin?: boolean;
  hideBGLoggedOut?: boolean;
  isUserEdit?: boolean;
  isUserView?: boolean;
  isPortfolioView?: boolean;
};

const HeaderBar = (props: HeaderBarProps) => {
  const { userData } = useUser();
  const theme = useTheme();
  const trigger = useScrollTrigger();
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  

  // const headerGrad =
  //   props.darkTheme === true ? DarkHeaderGrad : LightHeaderGrad;

  {
    /* <StyledAppBar
            color={
              userData.authenticated || props.hideBGLoggedOut !== true
                ? "inherit"
                : "transparent"
            }
            elevation={
              userData.authenticated || props.hideBGLoggedOut !== true ? 4 : 0
            }
            style={
              userData.authenticated || props.hideBGLoggedOut !== true
                ? { background: headerGrad }
                : {}
            }
          > */
  }
  return (
    <>
      <SnackbarAlert />
      <StylesProvider injectFirst>
        <Slide appear={false} direction="down" in={!trigger}>
          <StyledAppBar
            elevation={4}
            color="default"
            style={{ background: headerBackground(theme) }}
          >
            <StyledDivOuter>
              <StyledDivLeft>
                {!props.hideLogo ? (
                  <LogoLink lightTheme={!props.darkTheme} />
                ) : null}
                {props.isPortfolioView ? <DisplayNavigationMobile /> : null}
              </StyledDivLeft>
              <StyledDivCenter>
                <StyledDivTitle>
                  <Typography variant="h5">
                    {props.title ? props.title : ""}
                  </Typography>
                </StyledDivTitle>
              </StyledDivCenter>
              <StyledDivRight>
                {props.children}
                {userData.authenticated || props.hideLogin ? null : (
                  <StyledLink
                    href={
                      userData.authenticated
                        ? Routes.PORTFOLIO_DISPLAY_BASE +
                          "/" +
                          userData.username
                        : Routes.LOGIN
                    }
                  >
                    <StyledLogin>Login</StyledLogin>
                  </StyledLink>
                )}
                <DropdownPortfolio
                  isUserView={props.isUserView}
                  isUserEdit={props.isUserEdit}
                  setAccountDialogOpen={setAccountDialogOpen}
                  setThemeDialogOpen={setThemeDialogOpen}
                  setShareDialogOpen={setShareDialogOpen}
                />
                <DialogAccount
                  open={accountDialogOpen}
                  setOpen={setAccountDialogOpen}
                />
                <DialogTheme
                  open={themeDialogOpen}
                  setOpen={setThemeDialogOpen}
                />
                <DialogShare
                  open={shareDialogOpen}
                  setOpen={setShareDialogOpen}
                />
                <Box width="15px" height="100%" />
              </StyledDivRight>
            </StyledDivOuter>
          </StyledAppBar>
        </Slide>
      </StylesProvider>
    </>
  );
};

export { HeaderBar, HeaderMediaWidth };
