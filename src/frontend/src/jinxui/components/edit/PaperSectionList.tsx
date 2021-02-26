import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useUser,
  usePage,
  useSection,
  InputText,
  InputImage,
  InputImageText,
  InputPortfolio,
  InputVideo,
  SkeletonInput,
  PageEdit,
} from "jinxui";

import { TSection, TPage, ESectionType } from "jinxui/types";

const PaperSectionList = () => {
  const { isSaving, isLoading } = useUser();
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
                      if (
                        section.type === ESectionType.skeleton &&
                        section.id
                      ) {
                        return <SkeletonInput key={section.id} />;
                      } else if (
                        section.type === ESectionType.text &&
                        section.id
                      ) {
                        return (
                          <InputText
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else if (
                        section.type === ESectionType.image &&
                        section.id
                      ) {
                        return (
                          <InputImage
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else if (
                        section.type === ESectionType.imageText &&
                        section.id
                      ) {
                        return (
                          <InputImageText
                            key={section.id}
                            pageId={page.id}
                            section={section}
                          />
                        );
                      } else if (
                        section.type === ESectionType.video &&
                        section.id
                      ) {
                        return (
                          <InputVideo
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
                {/* {isLastPage ? <PageEdit /> : <> </>} */}
              </Box>
            );
          } else {
            return (
              <></>
            )
          }
        }
      )}
      {isLoading() ? null : <PageEdit />}
    </>
  );
};

export default PaperSectionList;
