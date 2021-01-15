import React, { useState } from "react";
import { TSection, TSections, Tuuid } from "jinxui/types";
import { v4 as uuidv4 } from "uuid";

export const defaultSectionContext: TSection = {
  id: "0-0-0-0-0",
  name: "",
  type: "skeleton",
  index: 0,
  text: "",
  page: "0-0-0-0-0",
  links: [],
};



export const SectionContext = React.createContext<[TSections, any, any, any]>([
  {}, 
  () => {}, 
  () => {},
  () => {}
]);

type TSectionContextProvider = {
  children: any;
};
export const SectionContextProvider = (props: TSectionContextProvider) => {
  const [state, setState] = useState<TSections>({});

  const updateState = (
    pageId: Tuuid,
    index: number,
    // sectionId: Tuuid,
    fieldsToUpdate: Partial<TSection>
  ) => {
    // if (!(pageId in state)) {
    //   throw Error("Sections for page " + pageId + " not found.")
    // }
    // const index = state.findIndex(
    //   (section: TSection) => section.id === sectionId
    // );
    // setState({
    //   ...state,
    //     [pageId]: [
    //       ...state[pageId].slice(0, index),
    //       { ...state[pageId][index], ...fieldsToUpdate },
    //       ...state[pageId].slice(index + 1)]
    //   });
    // var newState = state;
    // newState.text = fieldsToUpdate?.text
    // setState(newState)
    // setState([
    //   // ...state.slice(0, index),
    //   {...state[index], ...fieldsToUpdate},
    //   // ...state.slice(index + 1)
    // ])
  };

  const resetState = () => {
    // setState([]);
    setState({})
  };

  return (
    <SectionContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </SectionContext.Provider>
  );
};
