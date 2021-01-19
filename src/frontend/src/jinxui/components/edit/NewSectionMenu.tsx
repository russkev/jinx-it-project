import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import { useSection } from "jinxui";

import { TSection, Tuuid, ESectionType } from "jinxui/types";

type TNewSectionMenu = {
  pageId: Tuuid;
  section: any;
  placeAbove?: boolean;
};

const NewSectionMenu = (props: TNewSectionMenu) => {
  const { handleSectionChange, sectionIndex, makeNewSection } = useSection();

  const handleAddTextSection = () => {
    addSection(ESectionType.text);
  };

  const addSection = (sectionType: ESectionType) => {
    const index = sectionIndex(props.pageId, props.section.id)
    const target_index = props.placeAbove ? index : index + 1;
    const newSection:TSection = makeNewSection(props.pageId, sectionType)
    handleSectionChange(props.pageId, target_index, newSection);
  };

  return (
    <div>
      <Tooltip title="Add new section" arrow>
      <IconButton onClick={handleAddTextSection}>
        <AddIcon />
      </IconButton>
      </Tooltip>
    </div>
  );
};

export default NewSectionMenu;
