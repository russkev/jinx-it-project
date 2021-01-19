import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  InputComponentUploadImage,
  NewSectionButton,
  useSection,
} from "jinxui";
import { TSection, Tuuid } from "jinxui/types";

type TInputImage = {
  key: string;
  pageId: Tuuid;
  section: TSection;
};
const InputImage = (props: TInputImage) => {
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
