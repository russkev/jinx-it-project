import React, { useState, useEffect } from "react";
import { TextField, Box } from "@material-ui/core";
import { useSection, LinksDisplay, LinkDialog } from "jinxui";
import { TSection, Tuuid } from "jinxui/types";
import { defaultSectionContext } from "jinxui/contexts";
import Button from "@material-ui/core/Button";

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
  const {
    registerSection,
    syncSections,
    setSections,
    getFetchedSection,
    onSectionChange,
  } = useSection();
  const [content, setContent] = useState("");
  // const [localText, setLocalText] = useState<string>("");
  const [localSection, setLocalSection] = useState<TSection>(props.section);
  const [localText, setLocalText] = useState<string>(
    props.section.text ? props.section.text : ""
  );

  // useEffect(() => {
  //   // if (props.section.text){
  //   //   setLocalText(props.section.text)
  //   // }
  //   setLocalSection(props.section);
  //   console.log("SETTING")
  // }, [props.section]);

  // function getLocalSection() {
  //   // setLocalSection({...localSection, text:"asdasasd"})
  //   console.log(localSection)
  //   // return localSection
  // }

  const getLocalSection = () => {
    console.log(localText);
  };

  useEffect(() => {
    // var thisSection = JSON.parse(JSON.stringify(props.section));
    // thisSection.text = localText
    if (props.section.name == "Hello There!") {
      console.log(props.section.name);
      registerSection(localText);
    }
  }, []);

  const handleChange = (new_text: string) => {
    // setLocalText(new_text)
    setLocalSection({ ...localSection, text: new_text });
  };

  const onChange = (event: any) => {
    let newValue = event.target.value;
    setLocalText(() => {
      onSectionChange(props.pageId, props.section.id, {text: newValue})
      return newValue
      // let newSection = { ...prevState, text: newValue };
      // const currSections = getFetchedSection("asdfas", "asdasd");
      // // setSections([
      // //   newSection,
      // //   ...currSections.slice(1),
      // // ]);
      // currSections[props.pageId][0] = newSection;
      // return newSection;
    });
  };

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
        <Button variant="contained" onClick={syncSections}>
          Sync Sections
        </Button>
        <Button variant="contained" onClick={getLocalSection}>
          Local Text
        </Button>
      </Box>
      <TextField
        name={props.section.id}
        // defaultValue={props.section.text}
        placeholder={
          "Start writing...\n\n\n" +
          "You can use markdown to format your text. \n\n" +
          "  - This displays as a dot point\n\n" +
          "**This displays in bold**\n\n" +
          "*This displays in italics*\n\n" +
          "[This displays as a link](https://app.jinx.systems/)"
        }
        // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //   const currSections = getFetchedSection("asdfas", "asdasd");
        //   setSections([
        //     { ...props.section, text: event.target.value },
        //     ...currSections.slice(1),
        //   ]);
        //   // setLocalText(event.target.value)
        //   // setLocalSection({...localSection, text: event.target.value})
        //   // handleChange(event.target.value)
        //   // setContent(e.target.value)
        // }}
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

export default TextFieldSubSection;
