import React, { useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";

import { useUser, usePortfolio, usePage } from "jinxui";
import { TPage } from "jinxui/types";

const StyledButton = styled(Button)`
  width: 10px;
`;

type TPageEdit = {
  pageIndex?: number;
  page?: TPage;
};
const PageEdit = (props: TPageEdit) => {
  const { setSuccessMessage, setErrorMessage } = useUser();
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
      handlePageDelete(getFetchedPortfolio().id, props.pageIndex)
        .then(() => {
          setSuccessMessage("Page deleted");
        })
        .catch((error: any) => {
          setErrorMessage(error.message);
        });
    }
  }

  function handleAdd() {
    if (props.pageIndex !== undefined) {
      try {
        handlePageAdd(props.pageIndex);
        setSuccessMessage("New page added");
      } catch (e) {
        setErrorMessage(e.message);
      }
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
        height="100px"
        bgcolor="background.paper"
        position="absolute"
        left="0px"
        borderTop="3px solid"
      />
      <Box height="100px" marginY="15px" display="flex" position="relative">
        <Box></Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr max-content 1fr"
          alignContent="center"
        >
          <TextField
            name={props.page ? props.page.id : "end"}
            onChange={onTitleChange}
            value={localTitle}
            placeholder="Title"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
              style: {
                fontSize: 20,
                fontWeight: 600,
                marginRight: "15%",
              },
            }}
          />
          <Box>
            <StyledButton
              size="medium"
              style={{ minWidth: 40 }}
              onClick={handleAdd}
            >
              <PostAddIcon />
            </StyledButton>
          </Box>
          <Box display="flex" justifyContent="end">
            {props.pageIndex !== undefined ? (
              <>
                <StyledButton
                  size="medium"
                  style={{ minWidth: 40 }}
                  onClick={handleMoveUp}
                  disabled={props.pageIndex < 1}
                >
                  <ArrowUpwardIcon />
                </StyledButton>
                <StyledButton
                  size="medium"
                  style={{ minWidth: 40 }}
                  onClick={handleMoveDown}
                  disabled={props.pageIndex > getFetchedPages().length - 1}
                >
                  <ArrowDownwardIcon />
                </StyledButton>
                <StyledButton
                  size="medium"
                  style={{ minWidth: 40 }}
                  onClick={handleDelete}
                  disabled={getFetchedPages().length < 2}
                >
                  <DeleteOutlinedIcon />
                </StyledButton>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PageEdit;
