import React from "react";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import {
  useUser,
  usePortfolio,
  PrimaryMenu,
  PrimaryButton,
  Routes,
  SnackbarAlert,
  MenuGap,
} from "jinxui";

const DivWrapper = styled.div`
  height: 100%;
`;

const StyledHeaderOptionsButton = styled(Button)`
  height: 100%;
  text-transform: none;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "0.95rem",
  },
}));


const EditMenuItem = React.forwardRef((ref: any) => {
  const classes = useStyles();

  return (
    <>
      <Link href={Routes.PORTFOLIO_EDIT} color="inherit" underline="none">
        <MenuItem ref={ref}>
          <ListItemText
            classes={{ primary: classes.root }}
            primary="Edit Your Portfolio"
          />
        </MenuItem>
      </Link>
    </>
  );
});


const ViewMenuItem = React.forwardRef((ref: any) => {
  const { userData } = useUser();
  const menuText = "Your Portfolio";

  return (
    <Box margin="0px 30px">
      <Link
        href={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
        underline="none"
      >
        <PrimaryButton ref={ref}>{menuText}</PrimaryButton>
      </Link>
    </Box>
  );
});

type TPrivateMenuItem = {
  setOpen: any;
  rest_disabled: boolean;
};
const PrivacyMenuItem = React.forwardRef(
  (props: TPrivateMenuItem, ref: any) => {
    const { userData, setSuccessMessage, setErrorMessage } = useUser();
    const classes = useStyles();

    const {
      makePortfolioPrivate,
      makePortfolioPublic,
      isPrivate,
    } = usePortfolio();

    const handleMakePublic = () => {
      props.setOpen(false);
      makePortfolioPublic(userData.portfolioId)
        .then((response: any) => {
          setSuccessMessage("Portfolio is now public");
        })
        .catch((error: any) => {
          console.log(error);
          setErrorMessage(
            "Unable to set portfolio to private, something went wrong"
          );
        });
    };

    const handleMakePrivate = () => {
      props.setOpen(false);
      makePortfolioPrivate(userData.portfolioId)
        .then((response: any) => {
          setSuccessMessage("Portfolio is now private");
        })
        .catch((error: any) => {
          setErrorMessage(
            "Unable to set portfolio to private, something went wrong"
          );
          console.log(error);
        });
    };

    return (
      <MenuItem
        ref={ref}
        onClick={isPrivate() ? handleMakePublic : handleMakePrivate}
        disabled={props.rest_disabled}
      >
        <ListItemText
          primary={
            isPrivate()
              ? "Make Your Portfolio Public"
              : "Make Your Portfolio Private"
          }
          classes={{ primary: classes.root }}
        />
      </MenuItem>
    );
  }
);

type TLogoutMenuItem = {
  setOpen: any;
};
const LogoutMenuItem = React.forwardRef((props: TLogoutMenuItem, ref: any) => {
  const { logout } = useUser();
  const { resetFullPortfolio } = usePortfolio();
  const classes = useStyles();

  const handleLogout = () => {
    props.setOpen(false);
    logout()
      .then(() => {
        resetFullPortfolio();
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  return (
    <MenuItem ref={ref} onClick={handleLogout}>
      <ListItemText primary="Logout" classes={{ primary: classes.root }} />
    </MenuItem>
  );
});

type TDialogButton = {
  setDialogOpen: any;
  setOpen: any;
};
const ShareMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const classes = useStyles();
  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      <ListItemText classes={{ primary: classes.root }}>
        Share Your Portfolio
      </ListItemText>
    </MenuItem>
  );
});

const ThemeMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const classes = useStyles();

  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      <ListItemText classes={{ primary: classes.root }}>
        Choose Your Theme
      </ListItemText>
    </MenuItem>
  );
});

const AccountMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const classes = useStyles();

  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      <ListItemText classes={{ primary: classes.root }}>
        Account Settings
      </ListItemText>
    </MenuItem>
  );
});

type TDropdownPortfolio = {
  isUserView?: boolean;
  isUserEdit?: boolean;
  setAccountDialogOpen: any;
  setShareDialogOpen: any;
  setThemeDialogOpen: any;
};
const DropdownPortfolio = React.forwardRef(
  (props: TDropdownPortfolio, ref: any) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    // const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
    const { userData } = useUser();

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        setOpen(false);
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      try {
        if (prevOpen.current === true && open === false) {
          anchorRef.current!.focus();
        }
        prevOpen.current = open;
      } catch {}
    }, [open]);

    const restDisabled = props.isUserView !== true && props.isUserEdit !== true;

    return (
      <>
        <SnackbarAlert />
        <DivWrapper>
          {userData.username ? (
            <Tooltip title="Options">
              <StyledHeaderOptionsButton
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <AccountCircleIcon style={{ fontSize: 40 }} />
                <ExpandMoreIcon fontSize="small" />
              </StyledHeaderOptionsButton>
            </Tooltip>
          ) : null}
          <ClickAwayListener onClickAway={handleClose}>
            <PrimaryMenu
              id="menu-list-grow"
              anchorEl={anchorRef.current}
              role={undefined}
              disablePortal
              open={open}
              onClose={handleClose}
              onKeyDown={handleListKeyDown}
            >
              <ViewMenuItem />

              <ShareMenuItem
                setOpen={setOpen}
                setDialogOpen={props.setShareDialogOpen}
              />

              <MenuGap />

              <EditMenuItem />

              <ThemeMenuItem
                setOpen={setOpen}
                setDialogOpen={props.setThemeDialogOpen}
              />

              <PrivacyMenuItem setOpen={setOpen} rest_disabled={restDisabled} />

              <MenuGap />

              <AccountMenuItem
                setOpen={setOpen}
                setDialogOpen={props.setAccountDialogOpen}
              />

              <LogoutMenuItem setOpen={setOpen} />
            </PrimaryMenu>
          </ClickAwayListener>
        </DivWrapper>
      </>
    );
  }
);

export default DropdownPortfolio;
