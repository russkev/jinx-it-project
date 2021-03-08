import React from "react";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import {
  StyledPaperSectionDiv,
  StyledPaperSectionBase,
  StyledOneColumnSectionDiv,
  SkeletonLinks,
  SkeletonInput,
  BOX_HEIGHT,
} from "jinxui";

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
`;

const ButtonsSkeletonDiv = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, auto);
  padding: 15px;
  align-content: center;
  padding-right: 10px;
`;

const SkeletonPortfolioInput = () => {
  return (
    <StyledPaperSectionDiv>
      <StyledPaperSectionBase elevation={0} variant="outlined" square>
        <StyledOneColumnSectionDiv>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <Box width="200px" marginBottom="30px">
              <Box display="flex">
                <Skeleton variant="text" height={10} width={100} />
              </Box>
              <Skeleton variant="circle" width="200px" height="200px" />
            </Box>
            <Box width="30px" />
            <Box flexGrow={2} marginBottom="30px">
              <Box display="flex">
                <Skeleton variant="text" height={10} width={100} />
              </Box>
              <Skeleton variant="rect" height="200px" />
            </Box>
          </Box>
          <Skeleton variant="text" height={14} width={100} />
          <Skeleton variant="text" height={40} animation="wave" />
          <Box width="100%" height="16px" />
          <Skeleton variant="text" height={14} width={100} />
          <Skeleton variant="text" height={40} animation="wave" />
          <p></p>
          <LinksDiv>
            <SkeletonLinks />
          </LinksDiv>
        </StyledOneColumnSectionDiv>
      </StyledPaperSectionBase>
    </StyledPaperSectionDiv>
  );
};

const SkeletonPageInput = () => {
  return (
    <>
      <Box
        width="100vw"
        height={BOX_HEIGHT}
        bgcolor="background.paper"
        position="absolute"
        left="0px"
        // marginTop="30px"
      />
      <Box
        height={BOX_HEIGHT}
        marginBottom="30px"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        position="relative"
      >
        <Box alignSelf="center">
          <Skeleton variant="circle" width={30} height={30} />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="auto min-content"
          alignContent="center"
          alignItems="center"
        >
          <Skeleton variant="text" height={40} width={550} animation="wave" />
          <Box display="flex" justifyContent="end">
            <ButtonsSkeletonDiv>
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton variant="circle" width={30} height={30} />
              <Skeleton variant="circle" width={30} height={30} />
            </ButtonsSkeletonDiv>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SkeletonEditAll = () => {
  return (
    <>
      <SkeletonPortfolioInput />
      <SkeletonPageInput />
      <SkeletonInput />
      <SkeletonPageInput />
    </>
  );
};

export default SkeletonEditAll;
