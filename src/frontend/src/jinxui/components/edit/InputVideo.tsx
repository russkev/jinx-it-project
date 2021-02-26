import React from "react";

import {
  useSection,
  NewSectionButton,
  PaperSection,
  InputComponentVideo,
  StyledOneColumnSectionDiv,
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
        <StyledOneColumnSectionDiv>
          <InputComponentVideo pageId={props.pageId} section={props.section}/>
        </StyledOneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionButton pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputVideo;
