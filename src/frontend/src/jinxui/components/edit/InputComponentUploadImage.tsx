import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddPhotoAlternateOutlined from "@material-ui/icons/AddPhotoAlternateOutlined";
import { useUser, useSection, usePortfolio, StyledUserImageEdit } from "jinxui";
import { TImage, TSection, Tuuid } from "jinxui/types";
import {
  defaultImageContext,
  defaultSectionContext,
  defaultPageContext,
} from "jinxui/contexts";
import { v4 as uuidv4 } from "uuid";

const StyledInput = styled.input`
  display: none;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 20px 30px 1fr;
  grid-template-rows: 1fr 30px 20px;
`;

const ImageGridMain = styled.div`
  grid-column: 1/4;
  grid-row: 1/4;
  object-fit: cover;
`;

const ImageGridIcon = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  object-fit: cover;
  z-index: 200;
`;

const useStyles = makeStyles((theme: Theme) => {
  const backgroundHover = theme.palette.background.paper + "80";
  return createStyles({
    imageOverlay: {
      gridColumn: "1/4",
      gridRow: "1/4",
      display: "grid",
      width: "100%",
      height: "100%",
      alignContent: "center",
      textAlign: "center",
      fontSize: "20px",
      opacity: "0%",
      transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
      "&:hover": {
        opacity: "100%",
        background: backgroundHover,
      },
      cursor: "pointer",
      zIndex: 100,
    },
  });
});

interface TInputComponentUploadImage {
  pageId?: Tuuid;
  section?: TSection;
  isProfilePicture?: boolean;
}
const InputComponentUploadImage = (props: TInputComponentUploadImage) => {
  const classes = useStyles();
  const { getFetchedPortfolio, onPortfolioChange } = usePortfolio();
  const { getFetchedSection, onSectionChange } = useSection();
  const [imageExists, setImageExists] = useState(false);
  const { uploadImage } = useUser();
  const pageId = props.pageId ? props.pageId : defaultPageContext.id;
  const section = props.section
    ? props.section
    : JSON.parse(JSON.stringify(defaultSectionContext));

  const [localImage, setLocalImage] = useState<TImage>(() => {
    const existingImage = props.isProfilePicture
      ? getFetchedPortfolio().profile_picture
      : getFetchedSection(pageId, section.id).image;
    if (existingImage !== null) {
      return existingImage;
    } else {
      return defaultImageContext;
    }
  });
  const input_id = uuidv4();
  const [progress, setProgress] = useState(0.0);
  useEffect(() => {
    const thisImage = props.isProfilePicture
      ? getFetchedPortfolio().profile_picture
      : section.image;
    if (thisImage !== null && thisImage.id !== defaultImageContext.id) {
      setImageExists(true);
    }
  }, [props.section, getFetchedPortfolio()]);

  return (
    <>
      {/* Make a hidden upload image button here that we will use a 
          further button to ensure provide interaction
          This button is notoriously difficult to style */}
      <Box justifySelf="center" width={imageExists ? "auto" : "100%"}>
        <label htmlFor={input_id}>
          <StyledInput
            accept="image/*"
            id={input_id}
            multiple
            type="file"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                uploadImage(
                  event.currentTarget.files[0],
                  event.currentTarget.files[0].name,
                  setProgress
                )
                  .then((response) => {
                    setLocalImage(() => {
                      props.isProfilePicture
                        ? onPortfolioChange({ profile_picture: response.data })
                        : onSectionChange(pageId, section.id, {
                            image: response.data,
                          });
                      return response.data;
                    });
                    setImageExists(true);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log("Image failure");
              }
            }}
          />

          {/* Use CSS grid to ensure upload image icon stays in the correct 
            relative to the image*/}
          <ImageGrid>
            <ImageGridMain>
              <StyledUserImageEdit
                src={localImage.path}
                onLoad={() => setProgress(0.0)}
                style={
                  imageExists && progress === 0.0
                    ? {
                        opacity: "100%",
                        padding: 0,
                        maxBlockSize: "600px",
                      }
                    : {
                        opacity: "30%",
                        padding: "40%",
                      }
                }
              />
            </ImageGridMain>
            {/* <StyledImageUploadOverlay */}
            <Paper
              elevation={0}
              square
              style={progress ? { display: "none" } : {}}
              classes={{ root: classes.imageOverlay }}
            >
              Upload Image
              {/* </StyledImageUploadOverlay> */}
            </Paper>
            <ImageGridIcon>
              <AddPhotoAlternateOutlined />
            </ImageGridIcon>
          </ImageGrid>
          {progress ? (
            <LinearProgress
              variant="determinate"
              color="secondary"
              value={progress}
              style={{ marginTop: -8 }}
            />
          ) : null}
        </label>
      </Box>
    </>
  );
};

export default InputComponentUploadImage;
