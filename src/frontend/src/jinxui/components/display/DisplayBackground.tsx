import React from "react"
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

import { ThemeSectionColors } from "jinxui"

// Display background color or gradient based on theme properties
// This will only make a visible change if the theme indexing type is
// one of the `allowedIndexingTypes`.
type TDisplayBackground = {
  allowedIndexingTypes: string[],
  index: number,
  children: any,
}
const DisplayBackground = (props: TDisplayBackground) => {
  const theme = useTheme();

  const bgColorIndexing = theme.portfolio.section
    ? theme.portfolio.section.bgColorIndexing
    : "page";
  
  const backgroundIsRequired = props.allowedIndexingTypes.includes(bgColorIndexing)

  return (
    <Box style={ backgroundIsRequired 
      ? { background: ThemeSectionColors(theme, props.index)[0]}
      : {}}
    >
      {props.children}
    </Box>
  )
}

export default DisplayBackground