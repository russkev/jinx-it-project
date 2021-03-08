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
  isAvatar?: boolean;
  isBackground?: boolean;
}
const InputComponentUploadImage = (props: TInputComponentUploadImage) => {
  const classes = useStyles();
  const {
    getFetchedPortfolio,
    onPortfolioBackgroundChange,
    onPortfolioAvatarChange,
    getThemeFromName,
  } = usePortfolio();
  const { getFetchedSection, onSectionChange } = useSection();
  const [imageExists, setImageExists] = useState(false);
  const { uploadImage, setErrorMessage } = useUser();
  const pageId = props.pageId ? props.pageId : defaultPageContext.id;
  const section = props.section
    ? props.section
    : JSON.parse(JSON.stringify(defaultSectionContext));
  const portfolio = getFetchedPortfolio();

  const [localImage, setLocalImage] = useState<TImage>(() => {
    const existingImage = props.isAvatar
      ? portfolio.avatar
      : props.isBackground
      ? portfolio.background
      : getFetchedSection(pageId, section.id).image;
    if (existingImage !== null) {
      return existingImage;
    } else {
      let blankImage = JSON.parse(JSON.stringify(defaultImageContext));
      if (props.isAvatar) {
        blankImage.path = process.env.REACT_APP_FRONT_URL + "blank_user.svg";
      }
      if (props.isBackground) {
        const theme = getThemeFromName(portfolio.theme);
        blankImage.path = theme.portfolio.headerBackground.src;
      }
      return blankImage;
    }
  });
  const input_id = uuidv4();
  const [progress, setProgress] = useState(0.0);

  useEffect(() => {
    const thisImage = props.isAvatar
      ? portfolio.avatar
      : props.isBackground
      ? portfolio.background
      : section.image;
    if (thisImage !== null && thisImage.id !== defaultImageContext.id) {
      setImageExists(true);
    }
  }, [
    props.section,
    portfolio,
    props.isAvatar,
    section.image,
    props.isBackground,
  ]);

  function imageStyle() {
    let outStyle = {};
    if (props.isAvatar || props.isBackground) {
      outStyle = {
        ...outStyle,
        height: "200px",
        objectFit: "cover",
      };
    }
    if (props.isAvatar) {
      outStyle = {
        ...outStyle,
        borderRadius: "50%",
        width: "200px",
      };
    }
    if (imageExists && progress === 0.0) {
      outStyle = {
        ...outStyle,
        opacity: "100%",
      };
      if (!(props.isAvatar || props.isBackground)) {
        outStyle = {
          ...outStyle,
          maxBlockSize: "600px",
        };
      }
    } else {
      outStyle = {
        ...outStyle,
        opacity: "30%",
      };
    }
    if (props.isBackground) {
      outStyle = {
        ...outStyle,
        opacity: "100%",
      };
    }
    return outStyle;
  }

  return (
    <>
      {/* Make a hidden upload image button here that we will use a 
          further button to ensure provide interaction
          This button is notoriously difficult to style */}
      <Box
        justifySelf="center"
        width={imageExists ? "auto" : "100%"}
        height="100%"
      >
        <label htmlFor={input_id}>
          <StyledInput
            accept="image/*"
            id={input_id}
            multiple
            type="file"
            onChange={(event) => {
              try {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  const type = event.currentTarget.files[0].type;
                  if (
                    ![
                      "image/jpeg",
                      "image/webp",
                      "image/gif",
                      "image/png",
                    ].includes(type)
                  ) {
                    const message = "Invalid file type";
                    throw Error(message);
                  }
                  uploadImage(
                    event.currentTarget.files[0],
                    event.currentTarget.files[0].name,
                    setProgress
                  )
                    .then((response) => {
                      setLocalImage(() => {
                        if (props.isBackground) {
                          onPortfolioBackgroundChange(response.data);
                        } else if (props.isAvatar) {
                          onPortfolioAvatarChange(response.data);
                        } else {
                          onSectionChange(pageId, section.id, {
                            image: response.data,
                          });
                        }
                        return response.data;
                      });

                      // setLocalImage(() => {
                      //   // onPortfolioChange({background: response.data.path})

                      //   // props.isAvatar
                      //   //   ? onPortfolioChange({ avatar: response.data.path })
                      //   //   : props.isBackground
                      //   //   ? onPortfolioChange({
                      //   //       background: response.data.path,
                      //   //     })
                      //   //   : onSectionChange(pageId, section.id, {
                      //   //       image: response.data,
                      //   //     });
                      //   return response.data;
                      // });
                      setImageExists(true);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  throw Error("Invalid image");
                }
              } catch (error) {
                setErrorMessage(error.message);
              }
            }}
          />

          {/* Use CSS grid to ensure upload image icon stays in the correct 
            relative to the image*/}
          <Box
            display="grid"
            gridTemplateColumns={
              props.isAvatar || props.isBackground
                ? "10px 30px 1fr"
                : "20px 30px 1fr"
            }
            gridTemplateRows={
              props.isAvatar || props.isBackground
                ? "1fr 30px 10px"
                : "1fr 30px 20px"
            }
            height={props.isAvatar || props.isBackground ? "200px" : "auto"}
          >
            <ImageGridMain>
              <StyledUserImageEdit
                src={localImage.path}
                onLoad={() => setProgress(0.0)}
                style={imageStyle()}
              />
            </ImageGridMain>
            <Paper
              elevation={0}
              square
              style={progress ? { display: "none" } : {}}
              classes={{ root: classes.imageOverlay }}
            >
              {props.isAvatar
                ? "Upload Avatar"
                : props.isBackground
                ? "Upload Background Image"
                : "Upload Image"}
            </Paper>
            <ImageGridIcon>
              <AddPhotoAlternateOutlined />
            </ImageGridIcon>
          </Box>
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
