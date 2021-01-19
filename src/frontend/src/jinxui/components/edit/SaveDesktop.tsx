import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import {
  usePortfolio,
  StyledPaperSectionBase,
  PrimaryButton,
  SecondaryButton,
  SAVE_DESKTOP_WIDTH,
} from "jinxui";

const StyledSaveMenuDiv = styled.div`
  @media (max-width: ${() => SAVE_DESKTOP_WIDTH}) {
    display: none;
  }
`;

type TSaveDesktop = {
  history: any
}
const SaveDesktop = (props: TSaveDesktop) => {
  const { handlePublishAndRedirect, handleSave } = usePortfolio();

  return (
    <StyledSaveMenuDiv>
      <Box
        padding="30px"
        position="fixed"
        display="flex"
        flexDirection="column"
        width="min-content"
      >
        <StyledPaperSectionBase variant="outlined">
          <SecondaryButton onClick={handleSave} style={{ width: "160px" }}>
            Save Progress
          </SecondaryButton>
          <PrimaryButton
            onClick={() => handlePublishAndRedirect(props.history)}
            style={{ width: "160px" }}
          >
            PUBLISH
          </PrimaryButton>
        </StyledPaperSectionBase>
      </Box>
    </StyledSaveMenuDiv>
  );
};

export default SaveDesktop;
