import React, { useState } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { useSection, LinksDisplay, LinkDialog } from "jinxui";
import { TSection, Tuuid } from "jinxui/types";


// Material ui text field
//  - variant="outlined" ensures that there is an outline that makes it easy
//      to see which field is selected
//  - placeholder will disappear as soon as a user starts writing something
//      preferrable to default value so the user doesn't have to erase
//      text before starting to write something of their own.
type TInputComponentTextField = {
  pageId: Tuuid;
  section: TSection;
  rows: number;
};
const InputComponentTextField = (props: TInputComponentTextField) => {
  const {
    onSectionChange,
    logState,
  } = useSection();
  const [localText, setLocalText] = useState<string>(
    props.section.text ? props.section.text : ""
  );

  const onChange = (event: any) => {
    let newValue = event.target.value;
    setLocalText(() => {
      onSectionChange(props.pageId, props.section.id, {text: newValue})
      return newValue
    });
  };

  const LogPagesState = () => {
    const isDevelopmentMode = process.env.NODE_ENV === 'development';
    if (isDevelopmentMode) {
      return <Button onClick={logState}>Log State</Button>;
    } else {
      return null
    }
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        marginBottom="15px"
      >
        <LinksDisplay sectionId={props.section.id} pageId={props.pageId} />
        <LinkDialog sectionId={props.section.id} pageId={props.pageId} />
        <LogPagesState />
      </Box>
      <TextField
        name={props.section.id}
        placeholder={
          "Start writing...\n\n\n" +
          "You can use markdown to format your text. \n\n" +
          "  - This displays as a dot point\n\n" +
          "**This displays in bold**\n\n" +
          "*This displays in italics*\n\n" +
          "[This displays as a link](https://app.jinx.systems/)"
        }
        onChange={onChange}
        value={localText}
        id="standard-full-width"
        style={{ margin: 0, marginBottom: 15 }}
        fullWidth
        multiline
        rows={props.rows}
        rowsMax={1000}
        variant="outlined"
        color="secondary"
        inputProps={{
          style: {
            lineHeight: 1.4,
          },
        }}
      />
    </Box>
  );
};

export default InputComponentTextField;
