import React, { useState } from "react";
import { TSection, TSections, Tuuid, ESectionType } from "jinxui/types";

export const defaultSectionContext: TSection = {
  id: "0-0-0-0-0",
  name: "",
  type: ESectionType.skeleton,
  index: 0,
  text: "",
  image: undefined,
  video: "",
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
    fieldsToUpdate: Partial<TSection>
  ) => {
    if (!(pageId in state)) {
      throw Error("Sections for page " + pageId + " not found.")
    }
    setState({
      ...state,
        [pageId]: [
          ...state[pageId].slice(0, index),
          { ...state[pageId][index], ...fieldsToUpdate },
          ...state[pageId].slice(index + 1)]
      });
  };

  const resetState = () => {
    setState({})
  };

  return (
    <SectionContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </SectionContext.Provider>
  );
};
