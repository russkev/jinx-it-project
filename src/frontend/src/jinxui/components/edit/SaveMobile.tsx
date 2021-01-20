import React, { useState } from "react";
import styled from "styled-components";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import PublishIcon from "@material-ui/icons/Publish";

import {
  usePortfolio,
  SAVE_DESKTOP_WIDTH,
} from "jinxui";

import {
  LightPrimaryButtonGrad,
  LightPrimaryButtonGradHover,
} from "jinxui/themes";


const StyledSpeedDialDiv = styled.div`
  @media (min-width: ${() => SAVE_DESKTOP_WIDTH}) {
    display: none;
  }
`;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    speedDialIcon: {
      color: "black",
      background: LightPrimaryButtonGrad,
      "&:hover": {
        background: LightPrimaryButtonGradHover,
      },
    },
    speedDialActionTooltip: {
      border: "1px solid",
      borderRadius: "5px",
      width: "max-content",
    },
    speedDialActionFab: {
      border: "1px solid",
    },
  });
});

type TSaveMobile = {
  history: any;
};
const SaveMobile = (props: TSaveMobile) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { handleSave, handlePublishAndRedirect } = usePortfolio();

  const localHandleSave = () => {
    handleSave();
    setOpen(false)
  }

  const localHandlePublish = () => {
    handlePublishAndRedirect(props.history)
    setOpen(false)
  }

  const actions = [
    {
      icon: <PublishIcon />,
      name: "PUBLISH",
      action: localHandlePublish,
    },
    { icon: <SaveIcon />, 
      name: "Save Progress", 
      action: localHandleSave },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledSpeedDialDiv>
      <SpeedDial
        ariaLabel="SpeedDial save menu"
        classes={{
          root: classes.speedDial,
          fab: classes.speedDialIcon,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
            classes={{
              fab: classes.speedDialActionFab,
              staticTooltipLabel: classes.speedDialActionTooltip,
            }}
          />
        ))}
      </SpeedDial>
    </StyledSpeedDialDiv>
  );
};

export default SaveMobile;
