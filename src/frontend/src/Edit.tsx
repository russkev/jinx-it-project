import React, { useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";

import {
  useUser,
  usePortfolio,
  SecondaryButton,
  Routes,
  PrimaryColumnDiv,
  PaperSectionsList,
  HeaderEditAddition,
  SaveMobile,
  SaveDesktop,
} from "jinxui";

const FormTitle = styled.h2`
  font-weight: 300;
`;

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;

// Required for disabled buttons
const TooltipDiv = styled.div`
  display: flex;
`;

const Edit = (props: any) => {
  /*  Existing portfolio checks removed. New accounts should have an 
      portfolio created automatically. If no portfolios are found, an error
      should be reported */

  const {
    setLoading,
    setSaving,
  } = useUser();
  const {
    fetchFullPortfolio,
    getLightTheme,
  } = usePortfolio();

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setSaving(false);
      setLoading(true);
      try {
        await fetchFullPortfolio();
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ThemeProvider theme={getLightTheme()}>
        <HeaderEditAddition />
        <CssBaseline />
        <PrimaryColumnDiv>
          <div></div>
          <div>
            <FormTitle>Enter your information</FormTitle>
            <form>
              <SaveMobile history={props.history} />
              {PaperSectionsList()}
              <PublishCancelDiv>
                <TooltipDiv>
                  <Tooltip title="Cancel, go back to Jinx home page" arrow>
                    <a href={Routes.HOME}>
                      <SecondaryButton>Cancel</SecondaryButton>
                    </a>
                  </Tooltip>
                </TooltipDiv>
              </PublishCancelDiv>
            </form>
          </div>
          <div>
            <SaveDesktop history={props.history} />
          </div>
        </PrimaryColumnDiv>
      </ThemeProvider>
    </>
  );
};

export default Edit;
