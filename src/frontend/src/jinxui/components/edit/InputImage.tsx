import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  InputComponentUploadImage,
  NewSectionButton,
  useSection,
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
        <OneColumnSectionDiv>
          <InputComponentUploadImage
            pageId={props.pageId}
            section={props.section}
          />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputImage;
