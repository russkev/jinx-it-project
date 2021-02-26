import React, { useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";

import {
  useUser,
  usePortfolio,
  usePage,
  BOX_HEIGHT,
  MAX_EDIT_HEADING_WIDTH,
} from "jinxui";
import { TPage } from "jinxui/types";

import {
  defaultPageContext
} from "jinxui/contexts"

// Required for disabled buttons
const TooltipDiv = styled.div`
  display: flex;
`;

type TPageEdit = {
  pageIndex?: number;
  page?: TPage;
};
const PageEdit = (props: TPageEdit) => {
  const { setErrorMessage } = useUser();
  const { getFetchedPortfolio } = usePortfolio();
  const {
    handlePageDelete,
    handlePageAdd,
    handlePageMoveUp,
    handlePageMoveDown,
    getFetchedPages,
    onPageChange,
  } = usePage();
  const [localTitle, setLocalTitle] = useState<string>(
    props.page ? props.page.name : ""
  );

  const onTitleChange = (event: any) => {
    let newTitle = event.target.value;
    setLocalTitle(() => {
      if (props.page !== undefined) {
        onPageChange(props.page.id, { name: newTitle });
      }
      return newTitle;
    });
  };

  function handleDelete() {
    if (props.pageIndex !== undefined) {
      handlePageDelete(getFetchedPortfolio().id, props.pageIndex).catch(
        (error: any) => {
          setErrorMessage(error.message);
        }
      );
    }
  }

  function handleAdd() {
    try {
      if (props.pageIndex !== undefined) {
        handlePageAdd(props.pageIndex);
      } else {
        handlePageAdd(getFetchedPages().length);
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  function handleMoveUp() {
    if (props.pageIndex !== undefined) {
      handlePageMoveUp(props.pageIndex);
    }
  }

  function handleMoveDown() {
    if (props.pageIndex !== undefined) {
      handlePageMoveDown(props.pageIndex);
    }
  }

  return (
    <>
      <Box
        width="100vw"
        height={BOX_HEIGHT}
        bgcolor="background.paper"
        position="absolute"
        left="0px"
        borderTop="3px solid"
        marginTop={props.pageIndex !== undefined ? "0px" : "30px"}
      />
      <Box
        height={BOX_HEIGHT}
        marginBottom="30px"
        marginTop="30px"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        position="relative"
        id={props.page ? props.page.id : defaultPageContext.id}
      >
        <Box>
          <Tooltip title="Add new collection" arrow>
            <Button
              size="medium"
              style={{
                minWidth: 40,
              }}
              onClick={handleAdd}
            >
              <PostAddIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="auto min-content"
          alignContent="center"
        >
          {props.pageIndex !== undefined ? (
            <>
              <TextField
                name={props.page ? props.page.id : "end"}
                onChange={onTitleChange}
                value={localTitle}
                placeholder="Title"
                color="secondary"
                fullWidth
                style={{ maxWidth: MAX_EDIT_HEADING_WIDTH }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateIcon />
                    </InputAdornment>
                  ),
                  style: {
                    fontSize: 20,
                    fontWeight: 600,
                  },
                }}
              />
              <Box display="flex" justifyContent="end">
                <Tooltip title="Move collection up" arrow>
                  <TooltipDiv>
                    <Button
                      size="medium"
                      style={{ minWidth: 40 }}
                      onClick={handleMoveUp}
                      disabled={props.pageIndex < 1}
                    >
                      <ArrowUpwardIcon />
                    </Button>
                  </TooltipDiv>
                </Tooltip>
                <Tooltip title="Move collection down" arrow>
                  <TooltipDiv>
                    <Button
                      size="medium"
                      style={{ minWidth: 40 }}
                      onClick={handleMoveDown}
                      disabled={props.pageIndex > getFetchedPages().length - 1}
                    >
                      <ArrowDownwardIcon />
                    </Button>
                  </TooltipDiv>
                </Tooltip>
                <Tooltip title="Delete collection" arrow>
                  <TooltipDiv>
                    <Button
                      size="medium"
                      style={{ minWidth: 40 }}
                      onClick={handleDelete}
                      disabled={getFetchedPages().length < 2}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  </TooltipDiv>
                </Tooltip>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PageEdit;
