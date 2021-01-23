import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SwipableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import { DisplayNavigationDesktop, DisplayNavigation } from "jinxui";

import { usePage, HandleNavigationClick } from "jinxui";

import { TPage, Tuuid } from "jinxui/types";

import { defaultPageContext } from "jinxui/contexts";

type THeaderNavigationItem = {
  pageId: Tuuid;
  name: string;
  index: number;
};
const HeaderNavigationItem = (props: THeaderNavigationItem) => {
  const onClick = () => {
    HandleNavigationClick(null, props.pageId, props.index);
  };

  return (
    <Button
      onClick={onClick}
      key={props.pageId}
      style={{ textTransform: "none" }}
    >
      <Box display="flex">{props.name}</Box>
    </Button>
  );
};

const DisplayNavigationHeader = () => {
  const { getFetchedPages } = usePage();

  return (
    <Hidden xlUp xsDown implementation="css">
      <Box display="flex">
        <HeaderNavigationItem
          pageId={defaultPageContext.id}
          name={"Home"}
          index={-1}
        />
        {getFetchedPages().map((page: TPage, index: number) => {
          return (

            <HeaderNavigationItem
            key={page.id}
            pageId={page.id}
            name={page.name}
            index={index}
            />
          )
        })}
      </Box>
    </Hidden>
  );
};

export default DisplayNavigationHeader;
