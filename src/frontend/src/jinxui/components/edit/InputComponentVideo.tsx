import React, { useState } from "react";
import ReactPlayer from "react-player";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CreateIcon from "@material-ui/icons/Create";

import {
  useSection,
  NewSectionButton,
  OneColumnSectionDiv,
  PaperSection,
  InputComponentTextField,
} from "jinxui";
import { Tuuid, TSection } from "jinxui/types";

type TInputComponentVideo = {
  pageId: Tuuid;
  section: TSection;
};
const InputComponentVideo = (props: TInputComponentVideo) => {
  const { sectionIndex, onSectionChange } = useSection();
  const [localVideo, setLocalVideo] = useState<string>(
    props.section.video ? props.section.video : ""
  );

  const onUrlChange = (event: any) => {
    const newValue = event.target.value;
    setLocalVideo(() => {
      onSectionChange(props.pageId, props.section.id, { video: newValue });
      return newValue;
    });
  };

  return (
    <>
      <Box
        position="relative"
        paddingBottom="56.25%" // 16:9
        paddingTop="30px"
        height={0}
        overflow="hidden"
        marginBottom="15px"
        // border="1px solid"
        style={{ background: "black" }}
        // marginBottom="-15px"
      >
        <Box position="absolute" top={0} left={0} width="100%" height="100%">
          <ReactPlayer
            url={localVideo}
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <TextField
        name={"videoUrl"}
        label={"Video Url"}
        onChange={onUrlChange}
        value={localVideo}
        fullWidth
        color="secondary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CreateIcon />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default InputComponentVideo