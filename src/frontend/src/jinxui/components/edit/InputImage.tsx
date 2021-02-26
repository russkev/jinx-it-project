import React from "react";
import {
  useSection,
  PaperSection,
  InputComponentUploadImage,
  NewSectionButton,
  StyledOneColumnSectionDiv,
} from "jinxui";
import { TSectionInfo } from "jinxui/types";


const InputImage = (props: TSectionInfo) => {
  const { sectionIndex } = useSection();
  const index = props.section.id
    ? sectionIndex(props.pageId, props.section.id)
    : 0;

  return (
    <>
      {index === 0 && (
        <NewSectionButton
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection pageId={props.pageId} section={props.section}>
        <StyledOneColumnSectionDiv>
          <InputComponentUploadImage
            pageId={props.pageId}
            section={props.section}
          />
        </StyledOneColumnSectionDiv>
      </PaperSection>
      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputImage;
