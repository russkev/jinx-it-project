import {
  Theme,
} from "@material-ui/core/styles";

const ThemeSectionColors = (theme: Theme, index: number) => {
  const colors = theme.portfolio?.section?.colors || null;
  
  const defaultColors = [
    theme.palette.background.default,
    theme.palette.text.primary,
    false,
  ]

  const [backgroundColor, textColor, isFullHeight] = colors
    ? colors({ theme: theme, index: index })
    : defaultColors
  
    return [backgroundColor, textColor, isFullHeight];
};

export default ThemeSectionColors