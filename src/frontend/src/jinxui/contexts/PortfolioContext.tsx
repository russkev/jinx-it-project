import React, { useState } from "react";
import {
  TPortfolio,
} from "jinxui/types";

export const defaultPortfolioContext: TPortfolio = {
  id: "0-0-0-0-0",
  owner: 0,
  name: "",
  subtitle: "",
  pages: [],
  links: [],
  private: true,
  theme: "",
  background: null,
  avatar: null,
}

export const PortfolioContext = React.createContext<[TPortfolio, any, any]>([
  defaultPortfolioContext,
  () => {},
  () => {},
]);

type TPortfolioContextProvider = {
  children: any;
};
export const PortfolioContextProvider = (props: TPortfolioContextProvider) => {
  let [state, setState] = useState<TPortfolio>(defaultPortfolioContext);

  const updateState = (fieldsToUpdate: Partial<TPortfolio>) => {
    setState({...state, ...fieldsToUpdate})
    return;
  }

  const resetState = () => {
    setState(defaultPortfolioContext)
  }

  return (
    <PortfolioContext.Provider value={[state, updateState, resetState]}>
      {props.children}
    </PortfolioContext.Provider>
  );
};


