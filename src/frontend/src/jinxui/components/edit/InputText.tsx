import React from "react";
import {
  PaperSection,
  InputComponentTextField,
  StyledOneColumnSectionDiv,
} from "jinxui";
import { TSectionInfo } from "jinxui/types";
import { NewSectionButton, useSection } from "jinxui";

const InputText = (props: TSectionInfo) => {
  const { sectionIndex } = useSection();

  const index = sectionIndex(props.pageId, props.section.id);

  return (
    <>
      {/* Add another section menu above the section if at the top */}

      {index === 0 && (
        <NewSectionButton
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}

      {/* Main content */}

      <PaperSection pageId={props.pageId} section={props.section}>
        <StyledOneColumnSectionDiv>
          <InputComponentTextField
            pageId={props.pageId}
            section={props.section}
            rows={15}
          />
        </StyledOneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputText;
