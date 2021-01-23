import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";

import CircularProgress from "@material-ui/core/CircularProgress";

import { DarkTheme } from "jinxui/themes";

function LoadingLogo(props: any) {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.967548 19.8141C1.75432 19.2595 2.31628 19.1486 4.00222 18.2613C5.01378 17.7289 6.69973 18.0395 7.14931 19.3705C7.5989 20.7015 7.12019 20.4796 9.17246 24.2508C12.4319 30.2404 17.2046 30.6841 19.8501 30.6841C22.5476 30.6841 29.741 30.0186 33.0005 24.2508C36.3304 18.3584 32.5509 11.4953 31.4269 9.60972C30.3029 7.72412 30.213 6.17127 31.4269 5.50577C32.4385 4.95118 33.5624 4.17475 35.0236 3.50925C36.4847 2.84374 36.7095 4.84027 36.7095 5.39486C36.7095 5.94945 37.3839 6.50402 37.7211 7.28045C38.0583 8.05687 41.5426 12.8263 41.655 17.8176C41.7674 22.8089 40.8682 23.6963 40.531 24.9163C40.1938 26.1364 40.0814 26.8019 40.531 27.4675C40.9806 28.133 42.1045 31.3496 41.9921 31.6823C41.8797 32.0151 41.3178 32.9024 40.531 33.6788C39.852 34.3489 38.1707 33.6788 37.0467 33.3461C36.2268 33.1034 35.136 32.6806 34.2368 33.3461C33.3376 34.0116 31.4269 35.3426 28.9542 36.3409C26.4815 37.3391 24.4583 37.1173 23.1096 37.2282C21.7608 37.3391 22.098 37.3391 21.3112 37.7828C20.5245 38.2265 17.827 42.1086 17.0402 41.9977C16.2534 41.8867 15.6914 41.6649 14.9047 41.4431C14.1179 41.2212 13.7807 39.5575 13.2187 37.45C12.8638 36.119 12.3195 36.0081 11.308 35.4535C9.95923 34.7141 8.16089 33.6788 5.01381 30.6841C1.86673 27.6893 1.86671 24.5836 1.30473 23.1417C0.889319 22.0758 0.293156 22.0325 0.0683634 21.367C-0.156429 20.7015 0.180775 20.3687 0.967548 19.8141Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M24.375 17.6249C24.375 21.3529 21.3529 24.3749 17.625 24.3749C13.8971 24.3749 10.875 21.3529 10.875 17.6249C10.875 13.897 13.8971 10.8749 17.625 10.8749C21.3529 10.8749 24.375 13.897 24.375 17.6249Z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M28.1493 5.65283C28.1493 7.7239 26.4424 9.40283 24.3368 9.40283C22.2312 9.40283 20.5243 7.7239 20.5243 5.65283C20.5243 3.58176 22.2312 1.90283 24.3368 1.90283C26.4424 1.90283 28.1493 3.58176 28.1493 5.65283Z"
          fill="url(#paint2_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="21"
            y1="3.375"
            x2="20.932"
            y2="50.4272"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0047FF" />
            <stop offset="1" stop-color="#00A3FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="24.3368"
            y1="1.90283"
            x2="24.466"
            y2="24.33"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C2FF" />
            <stop offset="1" stop-color="#00FFC2" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="24.3368"
            y1="1.90283"
            x2="24.466"
            y2="24.33"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C2FF" />
            <stop offset="1" stop-color="#00FFC2" />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
}

const DisplayLoading = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={DarkTheme}>
        <Box
          bgcolor="black"
          display="grid"
          width="100vw"
          height="100vh"
          gridTemplateColumns="auto 1fr auto"
          gridTemplateRows="auto 1fr auto"
        >
          <Box
            gridColumn="2 / span 1"
            gridRow="2 / span 1"
            alignSelf="center"
            justifySelf="center"
          >
            <LoadingLogo style={{fontSize: 100}}/>
          </Box>
          <Box
            gridColumn="2 / span 1"
            gridRow="2 / span 1"
            alignSelf="center"
            justifySelf="center"
          >
            <CircularProgress color="secondary" size={200} thickness={1} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default DisplayLoading