/** Material Ui theme object extension */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    portfolio: {
      headerBackground: {
        src: string
      }
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    portfolio: {
      headerBackground?: {
        src?: string
      }
    },
  }
}
