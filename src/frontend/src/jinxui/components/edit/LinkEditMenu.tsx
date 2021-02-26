import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LaunchIcon from "@material-ui/icons/Launch";

import {
  LinkDisplayIcon,
  PrimaryMenu,
  LinkDialog,
  usePortfolio,
  useSection,
} from "jinxui";
import { TLink } from "jinxui/types";

type TLinkEditMenu = {
  link: TLink;
  pageId?: string;
  sectionId?: string;
};
const LinkEditMenu = (props: TLinkEditMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const {
    portfolioLinkIndex,
    getFetchedPortfolioLinks,
    handlePortfolioLinkDelete,
    handlePortfolioLinkMoveUp,
    handlePortfolioLinkMoveDown,
  } = usePortfolio();

  const {
    sectionLinkIndex,
    getFetchedSectionLinks,
    handleSectionLinkDelete,
    handleSectionLinkMoveUp,
    handleSectionLinkMoveDown,
  } = useSection();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveBack = () => {
    if (props.pageId && props.sectionId) {
      handleSectionLinkMoveUp(props.pageId, props.sectionId, props.link);
    } else {
      handlePortfolioLinkMoveUp(props.link);
    }
  };

  const handleMoveForward = () => {
    if (props.pageId && props.sectionId) {
      handleSectionLinkMoveDown(props.pageId, props.sectionId, props.link);
    } else {
      handlePortfolioLinkMoveDown(props.link);
    }
  };

  const handleDelete = () => {
    if (props.pageId && props.sectionId) {
      handleSectionLinkDelete(props.pageId, props.sectionId, props.link);
    } else {
      handlePortfolioLinkDelete(props.link);
    }
  };

  const links =
    props.pageId && props.sectionId
      ? getFetchedSectionLinks(props.pageId, props.sectionId)
      : getFetchedPortfolioLinks();

  const backIsDisabled =
    props.pageId && props.sectionId
      ? sectionLinkIndex(links, props.link.id) < 1
      : portfolioLinkIndex(props.link.id) < 1;

  const forwardIsDisabled =
    props.pageId && props.sectionId
      ? sectionLinkIndex(links, props.link.id) > links.length - 2
      : portfolioLinkIndex(props.link.id) > links.length - 2;

  return (
    <div>
      <Box margin="15px">
        <Tooltip title="Edit link" arrow>
          <Button onClick={handleClick} style={{ minWidth: "auto" }}>
            <LinkDisplayIcon icon={props.link?.icon} />
            {props.link && props.link.name && props.link.name.length > 0 ? (
              <Box width="8px" />
            ) : (
              <></>
            )}
            <Typography variant="button">{props.link?.name}</Typography>
          </Button>
        </Tooltip>
      </Box>
      <PrimaryMenu
        id="link-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.sectionId && props.pageId ? (
          <LinkDialog
            link={props.link}
            setAnchoEl={setAnchorEl}
            pageId={props.pageId}
            sectionId={props.sectionId}
          />
        ) : (
          <LinkDialog link={props.link} setAnchoEl={setAnchorEl} />
        )}

        {props.link.address && props.link.address !== "" ? (
          <Link href={props.link.address} color="textPrimary" underline="none">
            <Tooltip title={props.link.address} arrow>
              <MenuItem>
                <ListItemIcon>
                  <LaunchIcon />
                </ListItemIcon>
                <ListItemText primary="Visit" />
              </MenuItem>
            </Tooltip>
          </Link>
        ) : (
          <MenuItem disabled={true}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Visit" />
          </MenuItem>
        )}

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Box justifyContent="center" display="flex">
          <ButtonGroup variant="text" size="large">
            <Button onClick={handleMoveBack} disabled={backIsDisabled}>
              <ArrowBackIcon />
            </Button>
            <Button onClick={handleMoveForward} disabled={forwardIsDisabled}>
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </PrimaryMenu>
    </div>
  );
};

export default LinkEditMenu;
