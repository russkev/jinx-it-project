import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddPhotoAlternateOutlined from "@material-ui/icons/AddPhotoAlternateOutlined";
import { useUser, useSection, StyledUserImageEdit } from "jinxui";
import { TImage, TSectionInfo } from "jinxui/types";
import { defaultImageContext } from "jinxui/contexts";
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
`;

const StyledImageUploadOverlay = styled(Paper)`
  grid-column: 1/4;
  grid-row: 1/4;
  display: grid;
  width: 100%;
  height: 100%;
  align-content: center;
  text-align: center;
  font-size: 20px;
  opacity: 0%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    opacity: 65%;
  }
  cursor: pointer;
`;

const StyledImageUploadButton = styled(AddPhotoAlternateOutlined)`
  z-index: 2;
`;

const InputComponentUploadImage = (props: TSectionInfo) => {
  // const [imagePath, setImagePath] = useState(FRONT_END_URL + "blank_image.svg");
  const { onSectionChange, getFetchedSection } = useSection();
  const [imageExists, setImageExists] = useState(false);
  const { uploadImage } = useUser();
  // const [imageResponse, setImageResponse] = useState({ path: "", id: "null" });
  const [localImage, setLocalImage] = useState<TImage>(() => {
    const existingImage = getFetchedSection(props.pageId, props.section.id)
      .image;
    if (existingImage !== null) {
      return existingImage;
    } else {
      return defaultImageContext;
    }
  });
  const input_id = uuidv4();
  const [progress, setProgress] = useState(0.0);
  useEffect(() => {
    if (
      props.section.image !== null &&
      props.section.image.id !== defaultImageContext.id
    ) {
      setImageExists(true);
    }
  }, [props.section]);

  return (
    <>
      {/* Make a hidden upload image button here that we will use a 
          further button to ensure provide interaction
          This button is notoriously difficult to style */}
      <Box justifySelf="center">
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
                      onSectionChange(props.pageId, props.section.id, {
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
                      }
                    : {
                        opacity: "30%",
                        padding: "40%",
                      }
                }
              />
            </ImageGridMain>
            <StyledImageUploadOverlay
              elevation={0}
              square
              style={progress ? { display: "none" } : {}}
            >
              Upload Image
            </StyledImageUploadOverlay>
            <ImageGridIcon>
              <StyledImageUploadButton />
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
