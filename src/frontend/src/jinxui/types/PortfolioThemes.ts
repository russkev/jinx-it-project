/** Material Ui theme object extension */
// This must be left here
import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    portfolio: {
      theme: {
        name: string
      },
      headerBackground: {
        // Source of the background image file
        src: string
        // 300 pixel width version of background image for theme selector
        src300: string
        // The RGBA color to overlay the image
        overlayColor?: string
        // Header height will be minimum of this number and 100% view height
        maxHeight?: number
        // Flags whether the background is dark (for text contrast colour)
        isDark?: boolean
      },
      header?: {
        // How to vertically align the title text
        verticalAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | undefined
        // How to horizontally align the title text
        horizontalAlign?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
        // How to align the actual text component
        textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
        // How much space between the bottom of the header and the title text
        marginBottom?: any
        // Force title to be all capital letters
        allCaps?: boolean
        // Reduce gap between title and subtitle
        disableSubtitleGap?: boolean
        // Use main secondary color for the subtitle
        useSecondaryForSubtitle?: boolean
      },
      section?: {
        // Color function to be used for background
        colors?: any
        // Specify custom css in this sort of object
        css?: any
        // Gap between section title and section content
        titleGap?: any
        // Gap between two sections
        sectionGap?: any
        // Material ui spacing between two columns of a single section
        spacing?: 0 | 1 | 10 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined
        // Which sections to give a border to
        border?: "first" | "odds" | "evens" | "all" | undefined
        // How much padding a border should have
        borderPadding?: number
        // What property should be used determine background colors
        bgColorIndexing: "sectionLocal" | "sectionGlobal" | "page" | "full" 
      }
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    portfolio: {
      headerBackground?: {
        src?: string
        src300?: string
        overlayColor?: string
        maxHeight?: number
        isDark?: boolean
      },
      header?: {
        verticalAlign?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | undefined
        horizontalAlign?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
        textAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
        disableSubtitleGap?: boolean
        allCaps?: boolean
        useSecondaryForSubtitle?: boolean
        headerGap?: any
      }
      theme?: {
        name?: string
      },
      section?: {
        colors?: any
        css?: any
        titleGap?: any
        sectionGap?: any
        spacing?: 0 | 1 | 10 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined
        border?: "first" | "odds" | "evens" | "all" | undefined
        borderPadding?: number
        bgColorIndexing: "sectionLocal" | "sectionGlobal" | "page" | "full" 
      }
    },
  }
}
