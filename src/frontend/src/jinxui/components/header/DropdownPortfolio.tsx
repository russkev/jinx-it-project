import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShareIcon from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  useUser,
  usePortfolio,
  PrimaryMenu,
  SecondaryButton,
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

type TEditMenuItem = {
  edit_disabled: boolean;
};

const EditMenuItem = React.forwardRef((props: TEditMenuItem, ref: any) => {
  const [editRedirect, setEditRedirect] = useState(false);

  const onEdit = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return (
      <>
        <Redirect to={Routes.PORTFOLIO_EDIT} />
      </>
    );
  };

  if (editRedirect) {
    return onEdit();
  } else {
    return (
      <>
        <MenuItem
          ref={ref}
          onClick={() => {
            setEditRedirect(true);
          }}
          disabled={props.edit_disabled}
        >
          {/* <ListItemIcon>
            <EditIcon />
          </ListItemIcon> */}
          <ListItemText primary="Edit Your Portfolio" />
        </MenuItem>
      </>
    );
  }
});

type TViewMenuItem = {
  viewDisabled: boolean;
  editDisabled: boolean;
};

const ViewMenuItem = React.forwardRef((props: TViewMenuItem, ref: any) => {
  const { userData } = useUser();
  const [viewRedirect, setViewRedirect] = useState(false);
  const menuText = "Your Portfolio";

  const ViewMenuInner = () => {
    if (!props.viewDisabled) {
      return (
        <Box margin="0px 30px">
          <PrimaryButton
            ref={ref}
            onClick={() => {
              setViewRedirect(true);
            }}
            // disabled={props.viewDisabled}
          >
            {menuText}
          </PrimaryButton>
        </Box>
      );
    } else {
      return <SecondaryButton disabled={true}>{menuText}</SecondaryButton>;
    }
  };

  const onView = () => {
    return (
      <>
        <Redirect
          to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
        />
      </>
    );
  };

  if (props.viewDisabled || props.editDisabled) {
    if (viewRedirect) {
      return onView();
    } else {
      return (
        <>
          <ViewMenuInner />
        </>
      );
    }
  } else {
    return (
      <Link
        color="inherit"
        underline="none"
        href={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
      >
        <ViewMenuInner />
      </Link>
    );
  }
});

type TPrivateMenuItem = {
  setOpen: any;
  rest_disabled: boolean;
};
const PrivacyMenuItem = React.forwardRef(
  (props: TPrivateMenuItem, ref: any) => {
    const { userData, setSuccessMessage, setErrorMessage } = useUser();

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
        {/* <ListItemIcon>
          {isPrivate() ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon> */}
        <ListItemText primary={isPrivate() 
          ? "Make Your Portfolio Public" 
          : "Make Your Portfolio Private"} 
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
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    props.setOpen(false);
    setRedirect(true);
    logout()
      .then(() => {
        resetFullPortfolio();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect) {
    return <Redirect to={Routes.LOGIN} />;
  } else {
    return (
      <MenuItem ref={ref} onClick={handleLogout}>
        {/* <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon> */}
        <ListItemText primary="Logout" />
      </MenuItem>
    );
  }
});

type TDialogButton = {
  setDialogOpen: any;
  setOpen: any;
};
const ShareMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      {/* <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon> */}
      <ListItemText>Share Your Portfolio</ListItemText>
    </MenuItem>
  );
});

const ThemeMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      {/* <ListItemIcon>
                  <InvertColorsIcon />
                </ListItemIcon> */}
      <ListItemText>Choose Your Theme</ListItemText>
    </MenuItem>
  );
});

const AccountMenuItem = React.forwardRef((props: TDialogButton, ref: any) => {
  const onClick = () => {
    props.setDialogOpen(true);
    props.setOpen(false);
  };

  return (
    <MenuItem ref={ref} onClick={onClick}>
      {/* <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon> */}
      <ListItemText>Account Settings</ListItemText>
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
    const [themeOpen, themeSetOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
    const { userData, setSuccessMessage } = useUser();

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

    // return focus to the button when we transitioned from !open -> open
    const themePrevOpen = React.useRef(themeOpen);
    React.useEffect(() => {
      try {
        if (themePrevOpen.current === true && themeOpen === false) {
          themeAnchorRef.current!.focus();
        }

        themePrevOpen.current = themeOpen;
      } catch {}
    }, [themeOpen]);

    const handleShareLink = () => {
      setOpen(false);
      const path = process.env.REACT_APP_FRONT_URL + "u/" + userData.username;
      navigator.clipboard.writeText(path);
      setSuccessMessage("Portfolio link copied to clipboard");
    };

    const viewDisabled = props.isUserView === true;
    const editDisabled = props.isUserEdit === true;
    const restDisabled = props.isUserView !== true && props.isUserEdit !== true;

    const onAccountClick = () => {
      props.setAccountDialogOpen(true);
      setOpen(false);
    };

    const onThemeClick = () => {
      props.setThemeDialogOpen(true);
      setOpen(false);
    };

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
                <AccountCircleIcon />
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
              <ViewMenuItem
                viewDisabled={viewDisabled}
                editDisabled={editDisabled}
              />

              <ShareMenuItem
                setOpen={setOpen}
                setDialogOpen={props.setShareDialogOpen}
              />

              <MenuGap />

              <EditMenuItem edit_disabled={editDisabled} />

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
