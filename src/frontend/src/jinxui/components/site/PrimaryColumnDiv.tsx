import styled from "styled-components";
import { MAX_EDIT_SECTION_WIDTH } from "jinxui";

const PrimaryColumnDiv = styled.div`
  height: auto;
  width: 920px;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 100px;
  display: block;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr minMax(200px, ${() => MAX_EDIT_SECTION_WIDTH}) 1fr;
  `;

export default PrimaryColumnDiv;