import React, { useState, useEffect } from "react";
import { TextField, Box } from "@material-ui/core";
import { LinksDisplay, LinkDialog } from "jinxui";
import { TSection, Tuuid } from "jinxui/types";
import { defaultSectionContext } from "jinxui/contexts";

type TTextFieldSubSection = {
  pageId: Tuuid;
  section: TSection;
  // handleChange: any;
  rows: number;
};

// Material ui text field
//  - variant="outlined" ensures that there is an outline that makes it easy
//      to see which field is selected
//  - placeholder will disappear as soon as a user starts writing something
//      preferrable to default value so the user doesn't have to erase
//      text before starting to write something of their own.

const TextFieldSubSection = (props: TTextFieldSubSection) => {
  const [content, setContent] = useState("");

  const [localText, setLocalText] = useState<string>("");

  useEffect(() => {
    if (props.section.text){
      setLocalText(props.section.text)
    }
  }, [props.section])

  const handleChange = (
    new_text: string
    ) => {
      setLocalText(new_text)
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        marginBottom="15px"
      >
        <LinksDisplay sectionUid={props.section.id} pageUid={props.pageId} />
        <LinkDialog sectionUid={props.section.id} pageUid={props.pageId} />
      </Box>
      <TextField
        name={props.section.id}
        defaultValue={props.section.text}
        placeholder={
          "Start writing...\n\n\n" +
          "You can use markdown to format your text. \n\n" +
          "  - This displays as a dot point\n\n" +
          "**This displays in bold**\n\n" +
          "*This displays in italics*\n\n" +
          "[This displays as a link](https://app.jinx.systems/)"
        }
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(
              event.target.value,
            )
          // setContent(e.target.value)
        }
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

export default TextFieldSubSection;
