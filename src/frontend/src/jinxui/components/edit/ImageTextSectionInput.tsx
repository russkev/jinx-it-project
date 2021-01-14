import React from "react";

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
  NewSectionMenu,
  useSection,
} from "jinxui";

import { TSection, Tuuid } from "jinxui/types";

type TImageTextSectionInput = {
  key: string;
  pageId: Tuuid;
  section: TSection;
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  // const {
  //   getFetchedSections,
  //   handleTitleChange,
  //   handleContentChange,
  // } = useSection();

  // const index = getFetchedSections(props.pageId).findIndex(
  //   (p: TSection) => p.id === props.section.id
  // );

  // return (
  //   <>
  //     {index === 0 && (
  //       <NewSectionMenu
  //         pageId={props.pageId}
  //         section={props.section}
  //         placeAbove={true}
  //       />
  //     )}
  //     <PaperSection
  //       pageId={props.pageId}
  //       section={props.section}
  //       handleTitleChange={handleTitleChange}
  //     >
  //       <TwoColumnSectionDiv>
  //         <TextFieldSubSection
  //           pageId={props.pageId}
  //           section={props.section}
  //           handleChange={handleContentChange}
  //           rows={15}
  //         />
  //         <UploadImageSubSection section={props.section} />
  //       </TwoColumnSectionDiv>
  //     </PaperSection>
  //     <NewSectionMenu pageId={props.pageId} section={props.section} />
  //   </>
  // );
  return (<> </>)
};

export default ImageTextSectionInput;
