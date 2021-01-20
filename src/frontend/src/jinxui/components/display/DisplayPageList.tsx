import React from "react";

import { usePage, DisplaySectionList } from "jinxui";

import { TPage } from "jinxui/types";

const DisplayPageList = () => {
  const { getFetchedPages } = usePage();

  return (
    <>
      {getFetchedPages().map((page: TPage) => {
        return (
          <>
            <DisplaySectionList key={page.id} pageId={page.id} />
          </>
        );
      })}
    </>
  );
};

export default DisplayPageList;
