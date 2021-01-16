import React from "react";
import Switch from "@material-ui/core/Switch";

import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import Tooltip from "@material-ui/core/Tooltip";

import { useUser, HeaderBar } from "jinxui";

const EditHeader = () => {
  const { switchLightThemeMode, getSavedLightThemeMode } = useUser();

  return (
    <>
      <HeaderBar
        title="Edit"
        darkTheme={!getSavedLightThemeMode()}
        isUserEdit={true}
      >
        <WbSunnyIcon />
        <Tooltip
          title={
            getSavedLightThemeMode()
              ? "Switch this page to dark theme"
              : "Switch this page to light theme"
          }
          arrow
        >
          <Switch
            checked={!getSavedLightThemeMode()}
            onChange={switchLightThemeMode}
            color="default"
          />
        </Tooltip>
        <NightsStayIcon />
      </HeaderBar>
    </>
  );
};

export default EditHeader;
