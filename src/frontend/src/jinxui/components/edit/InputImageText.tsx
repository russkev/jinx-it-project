import React from "react";

import {
  PaperSection,
  InputComponentUploadImage,
  StyledTwoColumnSectionDiv,
  InputComponentTextField,
  NewSectionButton,
  useSection,
} from "jinxui";

import { TSectionInfo } from "jinxui/types";

const InputImageText = (props: TSectionInfo) => {
  const {
    sectionIndex,   
  } = useSection();

  const index = sectionIndex(props.pageId, props.section.id)

  return (
    <>
      {index === 0 && (
        <NewSectionButton
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection
        pageId={props.pageId}
        section={props.section}
      >
        <StyledTwoColumnSectionDiv>
          <InputComponentTextField
            pageId={props.pageId}
            section={props.section}
            rows={15}
          />
          <InputComponentUploadImage
            pageId={props.pageId}
            section={props.section}
          />
        </StyledTwoColumnSectionDiv>
      </PaperSection>
      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputImageText;
