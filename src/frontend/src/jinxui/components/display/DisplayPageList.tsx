import React from "react";

import { 
  usePage, 
  DisplaySectionList, 
  DisplayBackground 
} from "jinxui";

import { TPage } from "jinxui/types";

const DisplayPageList = () => {
  const { getFetchedPages } = usePage();

  return (
    <DisplayBackground allowedIndexingTypes={["full"]} index={0}>
      {getFetchedPages().map((page: TPage) => {
        return <DisplaySectionList key={page.id} page={page} />;
      })}
    </DisplayBackground>
  );
};

export default DisplayPageList;
