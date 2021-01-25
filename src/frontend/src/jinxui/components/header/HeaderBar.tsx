import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import {
  useTheme,
  Theme,
  Hidden,
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
  DisplayNavigationSidePanel,
  DisplayNavigationHeader,
} from "jinxui";

import { LightHeaderGrad, DarkHeaderGrad } from "jinxui/themes";

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
  grid-template-columns: 0.2fr auto 0.2fr;
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
  overflow: auto;
  overflow-y: hidden;
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



function headerBackground(theme: Theme) {
  let background = theme.palette.background.paper;

  if (theme.portfolio.theme && theme.portfolio.theme.name) {
    if (theme.portfolio.theme.name === "GlobalLight") {
      background = LightHeaderGrad;
    } else if (theme.portfolio.theme.name === "GlobalDark") {
      background = DarkHeaderGrad;
    }
  }
  return background;
}

type TNavigationButton = {
  setOpen: any;
  isPortfolioView?: boolean;
};
const NavigationButton = (props: TNavigationButton) => {
  if (props.isPortfolioView) {
    return (
      <Hidden smUp implementation="css">
        <Button
          onClick={() => {
            props.setOpen(true);
          }}
          style={{ padding: "6px" }}
        >
          <MenuRoundedIcon fontSize="large" />
        </Button>
      </Hidden>
    );
  } else {
    return <> </>;
  }
};

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
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

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
                <NavigationButton
                  setOpen={setNavDrawerOpen}
                  isPortfolioView={props.isPortfolioView}
                />
              </StyledDivLeft>

              <StyledDivCenter id="headerCenterDiv">
                {props.isPortfolioView ? (
                  <DisplayNavigationHeader />
                ) : (
                  <StyledDivTitle>
                    <Typography variant="h5">
                      {props.title ? props.title : ""}
                    </Typography>
                  </StyledDivTitle>
                )}
              </StyledDivCenter>
              <StyledDivRight>
                {props.children}
                {userData.authenticated || props.hideLogin ? null : (
                  <>
                  <Link
                    href={
                      userData.authenticated
                        ? Routes.PORTFOLIO_DISPLAY_BASE +
                          "/" +
                          userData.username
                        : Routes.LOGIN
                    }
                    color="inherit"
                    underline="none"
                  >
                    <StyledLogin 
                      style={{borderRadius: "5px"}}
                    >
                      Login
                    </StyledLogin>
                  </Link>
                  </>
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
        {props.isPortfolioView ? (
          <DisplayNavigationSidePanel
            open={navDrawerOpen}
            setOpen={setNavDrawerOpen}
          />
        ) : (
          <> </>
        )}
      </StylesProvider>
    </>
  );
};

export { HeaderBar, HeaderMediaWidth };
