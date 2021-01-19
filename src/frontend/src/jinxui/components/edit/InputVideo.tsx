import React, { useState } from "react";

import {
  useSection,
  NewSectionButton,
  OneColumnSectionDiv,
  PaperSection,
  InputComponentVideo,
} from "jinxui";

import { TSectionInfo } from "jinxui/types";


const InputVideo = (props: TSectionInfo) => {
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
        <OneColumnSectionDiv>
          <InputComponentVideo pageId={props.pageId} section={props.section}/>
        </OneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputVideo;
