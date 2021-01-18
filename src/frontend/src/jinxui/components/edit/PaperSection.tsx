import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import {
  StyledPaperSectionBase,
  StyledPaperSectionDiv,
  useUser,
  usePortfolio,
  useSection,
} from "jinxui";
import { TSection, Tuuid } from "jinxui/types";
import { InputAdornment } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 46px;
`;

const StyledDivLeft = styled.div`
  padding-left: 0px;
  display: flex;
  align-items: center;
`;

const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const StyledDivRight = styled.div`
  padding-right: 0px;
  display: flex;
  justify-content: right;
  justify-self: end;
  align-items: center;
`;

// Required for disabled buttons
const TooltipDiv = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 10px;
`;

type TPaperSection = {
  pageId: Tuuid;
  section: TSection;
  children: any;
  hideEditButtons?: boolean;
};
const PaperSection = (props: TPaperSection) => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const {
    getFetchedSections,
    handleSectionDelete,
    handleSectionMoveUp,
    handleSectionMoveDown,
    onSectionChange,
    sectionIndex,
  } = useSection();
  const [localTitle, setLocalTitle] = useState<string>(props.section.name)

  const onTitleChange = (event: any) => {
    let newTitle = event.target.value;
    setLocalTitle(() => {
      onSectionChange(props.pageId, props.section.id, {name: newTitle})
      return newTitle
    })
  }

  const index = sectionIndex(props.pageId, props.section.id)

  let deleteDisabled = false;
  let upArrowDisabled = false;
  let downArrowDisabled = false;
  if (getFetchedSections(props.pageId).length === 1) {
    deleteDisabled = true;
  }
  if (index === 0) {
    upArrowDisabled = true;
  }
  if (index === getFetchedSections(props.pageId).length - 1) {
    downArrowDisabled = true;
  }

  const handleDelete = () => {
    handleSectionDelete(props.pageId, index);
  };

  const handleMoveUp = () => {
    handleSectionMoveUp(props.pageId, index);
  };

  const handleMoveDown = () => {
    handleSectionMoveDown(props.pageId, index);
  }

  const handleSave = () => {
    saveFullPortfolio(false).catch((error: any) => {
      console.log(error);
      throw(error);
    })
  }

  return (
    <StyledPaperSectionDiv id={props.section.id}>
      <StyledDivOuter>
        <StyledDivLeft>
          {/* Title */}

          <TextField
            name={props.section.id}
            onChange={onTitleChange}
            value={localTitle}
            placeholder="Section Title"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
              style: {fontSize: 18, fontWeight: 400},
            }}
          />
        </StyledDivLeft>
        <StyledDivCenter></StyledDivCenter>

        {/* Modify section list buttons */}

        <StyledDivRight>
          <Tooltip title="Save portfolio" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                onClick={ handleSave }
                disabled={ isSaving() }
              >
                <SaveSharpIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
          <Tooltip title="Move section up" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                disabled={upArrowDisabled}
                onClick={handleMoveUp}
              >
                <ArrowUpwardIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
          <Tooltip title="Move section down" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                disabled={downArrowDisabled}
                onClick={handleMoveDown}
              >
                <ArrowDownwardIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>

          <Tooltip title="Delete this section" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                onClick={handleDelete}
                disabled={deleteDisabled}
              >
                <DeleteOutlinedIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
        </StyledDivRight>
      </StyledDivOuter>
      <StyledPaperSectionBase elevation={3} variant="outlined" square>
        {props.children}
      </StyledPaperSectionBase>
    </StyledPaperSectionDiv>
  );
};

export default PaperSection;
