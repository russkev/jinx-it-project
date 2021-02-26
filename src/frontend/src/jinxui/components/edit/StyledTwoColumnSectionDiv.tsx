import styled from "styled-components"
import { StyledOneColumnSectionDiv } from "jinxui"

const StyledTwoColumnSectionDiv = styled(StyledOneColumnSectionDiv)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
  }
  grid-gap: 60px;

`;

export default StyledTwoColumnSectionDiv