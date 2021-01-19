import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InputAdornment, TextField, Button } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import CreateIcon from "@material-ui/icons/Create";

import {
  useUser,
  usePortfolio,
  LinkDialog,
  LinksDisplay,
  SkeletonLinks,
  OneColumnSectionDiv,
  SkeletonEditAll,
  StyledPaperSectionBase,
  StyledPaperSectionDiv,
} from "jinxui";

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
`;

const InputPortfolio = () => {
  const { isLoading } = useUser();
  const {
    setPortfolioName,
    logPortfolioState,
    getFetchedPortfolio,
  } = usePortfolio();
  var portfolioState = getFetchedPortfolio();
  const [localTitle, setLocalTitle] = useState<string>(portfolioState.name);
  const [localSubtitle, setLocalSubtitle] = useState<string>(
    portfolioState.subtitle
  );

  useEffect(() => {
    setLocalTitle(portfolioState.name);
    setLocalSubtitle(portfolioState.subtitle);
  }, [portfolioState]);

  const onTitleChange = (event: any) => {
    let newValue = event.target.value;
    setLocalTitle(() => {
      portfolioState.name = newValue;
      return newValue;
    });
  };

  const onSubtitleChange = (event: any) => {
    let newValue = event.target.value;
    setLocalSubtitle(() => {
      portfolioState.subtitle = newValue;
      return newValue;
    });
  };

  return (
    <>
      {isLoading() ? (
        <SkeletonEditAll />
      ) : (
        <StyledPaperSectionDiv>
          <StyledPaperSectionBase elevation={3} variant="outlined" square>
            <OneColumnSectionDiv>
              <TextField
                name={"portfolioTitle"}
                label={"Portfolio Title"}
                onChange={onTitleChange}
                value={localTitle}
                id="standard-full-width"
                fullWidth
                color="secondary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateIcon />
                    </InputAdornment>
                  ),
                  style: { fontSize: 20, fontWeight: 600 },
                }}
              />
              <Box width="100%" height="16px" />
              <TextField
                name={"portfolioSubtitle"}
                label={"Portfolio Subtitle"}
                onChange={onSubtitleChange}
                value={localSubtitle}
                id="standard-full-width2"
                fullWidth
                color="secondary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <p></p>
              <LinksDiv>
                <LinksDisplay />
                <LinkDialog />
                <Button onClick={logPortfolioState}>Log Portfolio State</Button>
              </LinksDiv>
            </OneColumnSectionDiv>
          </StyledPaperSectionBase>
        </StyledPaperSectionDiv>
      )}
    </>
  );
};

export default InputPortfolio;
