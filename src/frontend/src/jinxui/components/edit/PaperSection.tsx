import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import {
  useSection,
  ContentChoiceMenu,
  StyledPaperSectionBase,
  StyledPaperSectionDiv,
  MAX_EDIT_HEADING_WIDTH,
} from "jinxui";
import { TSection, Tuuid } from "jinxui/types";
import { InputAdornment } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: 46px;
`;

const StyledDivLeft = styled.div`
  padding-left: 0px;
  display: flex;
  align-items: center;
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


type TPaperSection = {
  pageId: Tuuid;
  section: TSection;
  children: any;
  hideEditButtons?: boolean;
};
const PaperSection = (props: TPaperSection) => {
  const {
    getFetchedSections,
    handleSectionDelete,
    handleSectionMoveUp,
    handleSectionMoveDown,
    onSectionChange,
    sectionIndex,
  } = useSection();
  const [localTitle, setLocalTitle] = useState<string>(props.section.name);

  const onTitleChange = (event: any) => {
    let newTitle = event.target.value;
    setLocalTitle(() => {
      onSectionChange(props.pageId, props.section.id, { name: newTitle });
      return newTitle;
    });
  };

  const index = sectionIndex(props.pageId, props.section.id);

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
  };

  return (
    <StyledPaperSectionDiv id={props.section.id}>
      <StyledDivOuter>
        <StyledDivLeft>
          {/* Title */}

          <TextField
            name={props.section.id}
            onChange={onTitleChange}
            value={localTitle}
            placeholder="Section Heading"
            color="secondary"
            fullWidth
            style={{maxWidth: MAX_EDIT_HEADING_WIDTH}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
            }}
          />
        </StyledDivLeft>

        {/* Modify section list buttons */}

        <StyledDivRight>
          <Tooltip title="Move section up" arrow>
            <TooltipDiv>
              <Button
                size="medium"
                style={{ minWidth: 40 }}
                disabled={upArrowDisabled}
                onClick={handleMoveUp}
              >
                <ArrowUpwardIcon />
              </Button>
            </TooltipDiv>
          </Tooltip>
          <Tooltip title="Move section down" arrow>
            <TooltipDiv>
              <Button
                size="medium"
                style={{ minWidth: 40 }}
                disabled={downArrowDisabled}
                onClick={handleMoveDown}
              >
                <ArrowDownwardIcon />
              </Button>
            </TooltipDiv>
          </Tooltip>

          <Tooltip title="Delete this section" arrow>
            <TooltipDiv>
              <Button
                size="medium"
                style={{ minWidth: 40 }}
                onClick={handleDelete}
                disabled={deleteDisabled}
              >
                <DeleteOutlinedIcon />
              </Button>
            </TooltipDiv>
          </Tooltip>
          <ContentChoiceMenu pageId={props.pageId} section={props.section} />
        </StyledDivRight>
      </StyledDivOuter>
      <StyledPaperSectionBase elevation={3} variant="outlined" square>
        {props.children}
      </StyledPaperSectionBase>
    </StyledPaperSectionDiv>
  );
};

export default PaperSection;
