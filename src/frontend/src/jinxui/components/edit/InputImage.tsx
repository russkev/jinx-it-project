import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  InputComponentUploadImage,
  NewSectionMenu,
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
        <NewSectionMenu
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
      <NewSectionMenu pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputImage;
