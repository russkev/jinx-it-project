import React from "react";

import {
  PaperSection,
  InputComponentUploadImage,
  TwoColumnSectionDiv,
  InputComponentTextField,
  NewSectionMenu,
  useSection,
} from "jinxui";

import { TSection, Tuuid } from "jinxui/types";

type TInputImageText = {
  key: string;
  pageId: Tuuid;
  section: TSection;
};

const InputImageText = (props: TInputImageText) => {
  const {
    getFetchedSections,    
  } = useSection();

  const index = getFetchedSections(props.pageId).findIndex(
    (p: TSection) => p.id === props.section.id
  );

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
      >
        <TwoColumnSectionDiv>
          <InputComponentTextField
            pageId={props.pageId}
            section={props.section}
            rows={15}
          />
          <InputComponentUploadImage
            pageId={props.pageId}
            section={props.section}
          />
        </TwoColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu pageId={props.pageId} section={props.section} />
    </>
  );
};

export default InputImageText;
