import React from "react";
import { PaperSection, InputComponentTextField, OneColumnSectionDiv } from "jinxui";
import { TSection, Tuuid } from "jinxui/types";
import { NewSectionMenu, useSection } from "jinxui";

type TInputText = {
  key: string;
  pageId: Tuuid,
  section: TSection;
};

const InputText = (props: TInputText) => {
  const { sectionIndex } = useSection();

  const index = sectionIndex(props.pageId, props.section.id)

  return (
    <>
      {/* Add another section menu above the section if at the top */}

      {index === 0 && (
        <NewSectionMenu
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}

      {/* Main content */}

      <PaperSection pageId={props.pageId} section={props.section}>
        <OneColumnSectionDiv>
          <InputComponentTextField
            pageId={props.pageId}
            section={props.section}
            rows={15}
          />
        </OneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionMenu pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputText;
