import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useUser, usePortfolio, usePage } from "jinxui";

type TPageEdit = {
  pageIndex?: number;
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
  } = usePage();

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
        height="40px"
        bgcolor="background.paper"
        position="absolute"
        left="0px"
      />
      <Box height="40px" marginY="15px" display="flex" position="relative">
        <Box></Box>
        <Box>
          <Button onClick={handleAdd}>
            <PostAddIcon />
          </Button>
        </Box>
        <Box>
          {props.pageIndex !== undefined ? (
            <>
              <Button
                onClick={handleMoveDown}
                disabled={props.pageIndex > getFetchedPages().length - 1}
              >
                <ArrowDownwardIcon />
              </Button>
              <Button onClick={handleMoveUp} disabled={props.pageIndex < 1}>
                <ArrowUpwardIcon />
              </Button>
              <Button
                onClick={handleDelete}
                disabled={getFetchedPages().length < 2}
              >
                <DeleteOutlinedIcon />
              </Button>
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
