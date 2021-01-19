import React, { useState } from "react";
import ReactPlayer from "react-player";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment"
import CreateIcon from "@material-ui/icons/Create";


import {
  useSection,
  NewSectionButton,
  OneColumnSectionDiv,
  PaperSection,
  InputComponentVideo,
} from "jinxui";

import { Tuuid, TSection } from "jinxui/types";

type TInputVideo = {
  key: string;
  pageId: Tuuid;
  section: TSection;
};
const InputVideo = (props: TInputVideo) => {
  const { sectionIndex, onSectionChange } = useSection();
  const [localVideo, setLocalVideo] = useState<string>(
    props.section.video ? props.section.video : "" 
  )
  const index = sectionIndex(props.pageId, props.section.id);

  const onUrlChange = (event: any) => {
    const newValue = event.target.value;
    setLocalVideo(() => {
      onSectionChange(props.pageId, props.section.id, {video: newValue})
      return newValue
    });
  }

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
