import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection,
  NewSectionMenu,
  useSection,
} from "jinxui";
import { TSection, Tuuid } from "jinxui/types";

type TImageSection = {
  key: string;
  pageId: Tuuid;
  section: TSection;
};
const ImageSectionInput = (props: TImageSection) => {
  const { sectionIndex, handleTitleChange } = useSection();
  const index = props.section.id 
    ? sectionIndex(props.pageId, props.section.id)
    : 0

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection
        pageId={props.pageId}
        section={props.section}
        handleTitleChange={handleTitleChange}
      >
        <OneColumnSectionDiv>
          <UploadImageSubSection section={props.section} />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        pageId={props.pageId}
        section={props.section}
      />
    </>
  );
};

export default ImageSectionInput;
