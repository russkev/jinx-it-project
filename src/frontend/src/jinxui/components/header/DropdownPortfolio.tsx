import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
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

    // // return focus to the button when we transitioned from !open -> open
    // const themePrevOpen = React.useRef(themeOpen);
    // React.useEffect(() => {
    //   try {
    //     if (themePrevOpen.current === true && themeOpen === false) {
    //       themeAnchorRef.current!.focus();
    //     }

    //     themePrevOpen.current = themeOpen;
    //   } catch {}
    // }, [themeOpen]);

    const viewDisabled = props.isUserView === true;
    const editDisabled = props.isUserEdit === true;
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
