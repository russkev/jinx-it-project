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
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PaperSectionPage,
  SkeletonSectionInput,
  PageEdit,
} from "jinxui";

import { TSection, TPage } from "jinxui/types";
import { defaultSectionContext } from "jinxui/contexts";

const PaperSectionsDisplay = () => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const { getFetchedPages } = usePage();
  const { getFetchedSections } = useSection();

  // const [section, setSection] = useState<TSection>(defaultSectionContext);

  // const sections = getFetchedSections("0-0-0-0-0");

  // useEffect(() => {
  //   setSection(masterState)
  // }, [masterState])

  // return (
  //   <>
  //     <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
  //       <CircularProgress color="secondary" />
  //     </Backdrop>
  //     <PaperSectionPage />
  //     {getFetchedPages().map(
  //       // Map over pages
  //       (page: TPage, index: number) => {
  //         const sections = getFetchedSections(page.id)
  //         console.log(sections)
  //           return (
  //             <Box key={page.id}>
  //               <PageEdit pageIndex={index} />
  //               {sections.length > 0 ? (
  //                 sections.map(
  //                   // Map over sections
  //                   (section: TSection) => {
  //                     if (section.type === "skeleton" && section.id) {
  //                       console.log("SKELETON");
  //                       return <SkeletonSectionInput key={section.id} />;
  //                     } else if (section.type === "text" && section.id) {
  //                       console.log("TEXT")
  //                       return (
  //                         <TextSectionInput
  //                           key={section.id}
  //                           pageId={page.id}
  //                           section={section}
  //                         />
  //                       );
  //                     } else if (section.type === "image" && section.id) {
  //                       return (
  //                         <ImageSectionInput
  //                           key={section.id}
  //                           pageId={page.id}
  //                           section={section}
  //                         />
  //                       );
  //                     } else if (section.type === "image_text" && section.id) {
  //                       return (
  //                         <ImageTextSectionInput
  //                           key={section.id}
  //                           pageId={page.id}
  //                           section={section}
  //                         />
  //                       );
  //                     } else {
  //                       return <> </>;
  //                     }
  //                   }
  //                 )
  //               ) : (
  //                 <>
  //                 </>
  //               )}
  //               {index === getFetchedPages().length - 1 ? <PageEdit /> : <> </>}
  //             </Box>
  //           );
  //       }
  //     )}
  //   </>
  // );

  return (
    <>
      <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <PaperSectionPage />
      {getFetchedPages().map(
        // Map over pages
        (page: TPage, index: number) => {
          // const section = getFetchedSections(page.id);
          const sections = getFetchedSections(page.id);
          if (sections) {
            return (
              <Box key={page.id}>
                <PageEdit pageIndex={index} />
                {sections.map((section: TSection) => {
                  return (
                    <TextSectionInput
                      key={section.id}
                      pageId={page.id}
                      section={section}
                    />
                  );
                })}

                <SkeletonSectionInput />
              </Box>
            );
          }
        }
      )}
    </>
  );
};

export default PaperSectionsDisplay;
