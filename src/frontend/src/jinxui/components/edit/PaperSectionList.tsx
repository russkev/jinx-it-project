import React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useUser,
  usePortfolio,
  usePage,
  useSection,
  InputText,
  InputImage,
  InputImageText,
  InputPortfolio,
  InputSkeleton,
  PageEdit,
} from "jinxui";

import { TSection, TPage } from "jinxui/types";
import { defaultSectionContext } from "jinxui/contexts";

const PaperSectionsDisplay = () => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const { getFetchedPages } = usePage();
  const { getFetchedSections } = useSection();

  return (
    <>
      <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <InputPortfolio />
      {getFetchedPages().map(
        // Map over pages
        (page: TPage, index: number) => {
          const sections = getFetchedSections(page.id);
          if (sections && !page.toDelete) {
            return (
              <Box key={page.id}>
                <PageEdit pageIndex={index} page={page} />
                {sections.length > 0 ? (
                  sections.map(
                    // Map over sections
                    (section: TSection) => {
                      if (section.type === "skeleton" && section.id) {
                        return <InputSkeleton key={section.id} />;
                      } else if (section.type === "text" && section.id) {
                        return (
                          <InputText
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else if (section.type === "image" && section.id) {
                        return (
                          <InputImage
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else if (section.type === "image_text" && section.id) {
                        return (
                          <InputImageText
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else {
                        return <> </>;
                      }
                    }
                  )
                ) : (
                  <></>
                )}
                {index === getFetchedPages().length - 1 ? <PageEdit /> : <> </>}
              </Box>
            );
          }
        }
      )}
    </>
  );

  // return (
  //   <>
  //     <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
  //       <CircularProgress color="secondary" />
  //     </Backdrop>
  //     <InputPortfolio />
  //     {getFetchedPages().map(
  //       // Map over pages
  //       (page: TPage, index: number) => {
  //         // const section = getFetchedSections(page.id);
  //         const sections = getFetchedSections(page.id);
  //         if (sections) {
  //           return (
  //             <Box key={page.id}>
  //               <PageEdit pageIndex={index} />
  //               {sections.map((section: TSection) => {
  //                 return (
  //                   <InputText
  //                     key={section.id}
  //                     pageId={page.id}
  //                     section={section}
  //                   />
  //                 );
  //               })}

  //               <InputSkeleton />
  //             </Box>
  //           );
  //         }
  //       }
  //     )}
  //   </>
  // );
};

export default PaperSectionsDisplay;
