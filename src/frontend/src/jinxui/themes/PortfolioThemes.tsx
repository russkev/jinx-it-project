/**
 * Theme creation guide
 * 1. Pick a nice primary and secondary colour: https://material.io/resources/color/
 * 2. Create a theme object (i.e. like MagmaTheme) and type in the colours you chose as the main for 
 *    both the primary and secondary fields.
 * 3. Decide whether you want to use the light or dark colours from your theme. Set this as the 
 *    `type` field in your palette.
 * 4. Pick a nice font if you want, and link it into frontend/public/index.html. https://fonts.google.com
 * 5. Run your theme object through `createTheme` and export it.
 * 6. Start using it. Mui will generate a theme using a dark or light variant (depending on the 
 *    theme type you chose) for the portfolio backgrounds, and will automatically calculate the 
 *    contrast text colour.
 * Happy theming!
 */

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import  
    ThemeBackgroundColors 
from "../components/display/ThemeBackgroundColors"


const createTheme = (theme: any) => responsiveFontSizes(createMuiTheme(theme));

// const magma: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#801313",
//         },
//         secondary: {
//             "main": "#362420",
//         },
//     },
//     typography: {
//         fontFamily: "Lora, serif",
//         // fontSize: 24,
//         h1: {
//             fontFamily: "Kaushan Script, sans-serif",
//             lineHeight: 1.5,
//             fontSize: "6rem",
//         },
//         h2: {
//             fontFamily: "Kaushan Script, sans-serif"
//         },
//         h3: {
//             fontFamily: "Kaushan Script, sans-serif",
//             lineHeight: 2.5,
//         },
//         body1: {
//             "fontFamily": "Lora, serif",
//             fontSize: 22,
//         }
//     },
//     portfolio: {
//         theme: {
//             name: "Magma",
//         },
//         headerBackground: {
//             src: require("images/backgrounds/magma_01.webp"),
//             src300: require("images/backgrounds/magma_01_300.jpg"),
//         },
//         section: {
//             sectionGap: "4em",
//             headingGap: "0em",
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     },
// });

// const sunset: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#ffa183",
//         },
//         secondary: {
//             "main": "#ffffa3",
//         },
//     },
//     typography: {
//         body1: {
//             fontSize: 22,
//         },
//     },
//     portfolio: {
//         theme: {
//             name: "Sunset",
//         },
//         headerBackground: {
//             isDark: true,
//             src: require("images/backgrounds/sunset_01.webp"),
//             src300: require("images/backgrounds/sunset_01_300.jpg"),
//         },
//         section: {
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     },

// });

// const lilypad: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#97b8b5",
//         },
//         secondary: {
//             "main": "#98b787",
//         },
//     },
//     typography: {
//         body1: {
//             fontSize: 22,
//         },
//     },
//     portfolio: {
//         theme: {
//             name: "Lily Pad",
//         },
//         headerBackground: {
//             src: require("images/backgrounds/lilypad_01.webp"),
//             src300: require("images/backgrounds/lilypad_01_300.jpg"),
//         },
//         section: {
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     },
// });

// const autumn: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#919196",
//         },
//         secondary: {
//             "main": "#8e6b5f",
//         },
//     },
//     typography: {
//         body1: {
//             fontSize: 22,
//         },
//     },
//     portfolio: {
//         theme: {
//             name: "Autumn",
//         },
//         headerBackground: {
//             src: require("images/backgrounds/autumn_01.webp"),
//             src300: require("images/backgrounds/autumn_01_300.jpg"),
//         },
//         section: {
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     },
// });

// const cityscape: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#4a4545",
//         },
//         secondary: {
//             "main": "#c79c79",
//         },
//     },
//     typography: {
//         body1: {
//             fontSize: "1.8rem"
//         }
//     },
//     portfolio: {
//         theme: {
//             name: "Cityscape",
//         },
//         headerBackground: {
//             src: require("images/backgrounds/cityscape_01.webp"),
//             src300: require("images/backgrounds/cityscape_01_300.jpg"),
//         },
//         section: {
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     },
// });

// const presentation: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1200,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark",
//         primary: {
//             "main": "#bcc4ea",
//         },
//         secondary: {
//             "main": "#9efdec",
//         },
//     },
//     typography: {
//         h1: {
//             fontFamily: "Computer Modern Bright"
//         },
//         h2: {
//             fontFamily: "Computer Modern Serif",
//             fontWeight: 700,
//         },
//         h3: {
//             fontFamily: "Computer Modern Serif"
//         },
//         body1: {
//             fontSize: 22,
//             fontFamily: "Computer Modern Serif, sans-serif"
//         }
//     },
//     portfolio: {
//         theme: {
//             name: "Presentation",
//         },
//         headerBackground: {
//             isDark: true,
//             overlayColor: "0, 0, 0, 0.0",
//             src: require("images/backgrounds/jinx_logo_bg.svg"),
//             src300: require("images/backgrounds/jinx_logo_bg.svg"),
//         },
//         section: {
//             sectionGap: "20rem",
//             colors: ThemeBackgroundColors.gradient,
//             bgColorIndexing: "full",
//         }
//     }
// });

// const rainbow: Theme = createTheme({
//     breakpoints: {
//         values: {
//             xs: 0,
//             sm: 700,    // One column / two column breakpoint
//             md: 1100,   // Section width
//             lg: 1280,   // Required for text breakpoints
//             xl: 1920,   // Required for text breakpoints
//         }
//     },
//     palette: {
//         type: "dark"
//     },
//     typography: {
//         body1: {
//             fontSize: "1.5rem"
//         }
//     },
//     portfolio: {
//         theme: {
//             name: "Rainbow",
//         },
//         headerBackground: {
//             src: require("images/backgrounds/rainbow_01.webp"),
//             src300: require("images/backgrounds/rainbow_01_300.jpg"),
//         },
//         section: {
//             colors: ThemeBackgroundColors.rainbowStep,
//             bgColorIndexing: "sectionGlobal",
//         }
//     }
// });

const rainbowSmooth: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 800,    // One column / two column breakpoint
            md: 950,    // Intermediate responsive font size change
            lg: 1100,   // Section width
            xl: 1700,   // Permenant drawer width
        }
    },
    palette: {
        type: "dark",
        secondary: {
            main: "#9c0c81",
        },
        background: {
            default: "#410054",
            paper: "#420d52"
        },
    },        
    typography: {
        body1: {
            fontSize: "1.1rem"
        },

    },
    portfolio: {
        theme: {
            name: "Retro",
        },
        headerBackground: {
            isDark: true,
            src: require("images/backgrounds/rainbow_01.webp"),
            src300: require("images/backgrounds/rainbow_01_300.jpg"),
        },
        section: {
            colors: ThemeBackgroundColors.rainbowGradient,
            bgColorIndexing: "sectionGlobal",
            borderColor: "secondary",
            borderThickness: "3px",
        }
    }
});

const arch: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 800,    // One column / two column breakpoint
            md: 950,    // Intermediate responsive font size change
            lg: 1100,   // Section width
            xl: 1700,   // Permenant drawer width
        }
    },
    palette: {
        common: {
            black: "#4F4F4F",
            white: "#F6F1F1",
        },
        primary: {
            main: "#748598",
        },
        secondary: {
            main: "#B7A0B2",
        },
        text: {
            primary: "#748598",
            secondary: "#B7A0B2"
        },
        background: {
            paper: "#EBDCE2",
            default: "#F6F1F1",
        }
    },
    typography: {
        fontFamily: "Rubik, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: { // Heading Main title
            fontWeight: 400,
            fontSize: "4rem",
        },
        h2: { // Section titles
            fontWeight: 300,
            fontSize: "3.2rem",
            lineHeight: 1.5,
        },
        h3: { // Heading secondary title
            fontWeight: 300,
            fontSize: "2rem",
        },
        body1: { // Section content text
            fontWeight: 300,
            fontSize: "1.3rem",
        }
    },
    shape:{
        borderRadius: 10,
    },
    portfolio: {
        theme: {
            name: "Arch",
        },
        headerBackground: {
            src: require("images/backgrounds/arch.jpg"),
            src300: require("images/backgrounds/arch_300.jpg"),
            overlayColor: "255, 255, 255, 0.65",
            maxHeight: "700px",
        },
        header: {
            verticalAlign: "flex-end",
            horizontalAlign: "flex-start",
            textAlign: "left",
            marginBottom: "10%",
            useSecondaryForSubtitle: true,
        },
        section: {
            borderIsSecondaryFill: true,
            colors: ThemeBackgroundColors.secondPaperColor,
            bgColorIndexing: "page",

        }
    }
})

const mountains: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 800,    // One column / two column breakpoint
            md: 950,    // Intermediate responsive font size change
            lg: 1100,   // Section width
            xl: 1700,   // Permenant drawer width
        }
    },
    palette: {
        type: "dark",
        secondary: {
            main: "#FFB800"
        },
        background: {
            paper: "#262330",
            default: "#191722",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h1: {                   // Main Title
            fontWeight: 700,
            fontSize: "4rem",
        },
        h2: {                   // Page Titles
            fontWeight: 600,
            fontSize: "3rem",
        },
        h3: {                   // Main Subtitle
            fontWeight: 400,
            fontSize: "1.8rem",
            letterSpacing: "0.2rem"
        },
        h4: {                   // Section Headings
            fontWeight: 600,
            fontSize: "1.6rem",
            letterSpacing: "0.1rem"
        },
        h6: {                   // Link Text
            fontWeight: 400,
        },
        body1: {
            fontSize: "1.1rem",
            fontWeight: 300,
            letterSpacing: "0.15rem",
            lineHeight: 1.7,
        }
    },
    portfolio: {
        theme: {
            name: "Mountains",
        },
        headerBackground: {
            src: require("images/backgrounds/mountains_03.jpg"),
            src300: require("images/backgrounds/mountains_03_300.jpg"),
            maxHeight: "1000px",
            overlayColor: "48, 41, 77, 0.41",
        },
        header: {
            verticalAlign: "center",
            horizontalAlign: "center",
            textAlign: "center",
            useSecondaryForSubtitle: true,
            disableSubtitleGap: false,
        },
        section: {
            // headingGap: "20px",
            spacing: 7,
            border: "first",
            borderColor: "secondary",
            borderPadding: 30,
            colors: ThemeBackgroundColors.alternatingBackgroundColors,
            bgColorIndexing: "page",
        }
    },
});

const sand: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,    // One column / two column breakpoint
            md: 1260,    // Section width
            lg: 960,   // Largest responsive font size
            xl: 1560,   // Permenant drawer width
        }
    },
    palette: {
        type: "dark",
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#FFFFFF",
            dark: "#FFFFFF",
        },
        background: {
            default: "#1D1E22",
            paper: "#13141C",
        },
    },
    typography: {
        fontFamily: "Lora, sans-serif",
        h1: {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "4rem",
            letterSpacing: "0.25rem",
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "3.3rem",
        },
        h3: {
            fontWeight: 300,
            fontSize: "1.6rem",
            lineHeight: 2,
        },
        h6: {
            fontWeight: 400,
            fontSize: "1.1rem",
        },
        body1: {
            fontSize: "1.1rem",
            lineHeight: 1.5,
        }
    },
    shape: {
        borderRadius: 0,
    },
    portfolio: {
        theme: {
            name: "Sand"
        },
        headerBackground: {
            src: require("images/backgrounds/black_sand.jpg"),
            src300: require("images/backgrounds/black_sand_300.jpg"),
            maxHeight: "100vh",
            overlayColor: "46, 54, 84, 0.22",
            isDark: true,
        },
        header: {
            verticalAlign: "center",
            horizontalAlign: "flex-start",
            textAlign: "left",
            allCaps: "true",
            disableSubtitleGap: "true",
        },
        section: {
            colors: ThemeBackgroundColors.secondPrimaryColor,
            bgColorIndexing: "page",
            borderColor: "textColor",
        }
    }
})


// Register your theme in here - this is the object you'll access it from
const PortfolioThemes = {
    arch: arch,
    mountains: mountains,
    sand: sand,
    // magma: magma,
    // sunset: sunset,
    // lilypad: lilypad,
    // autumn: autumn,
    // cityscape: cityscape,
    // rainbow: rainbow,
    rainbowSmooth: rainbowSmooth,
    // presentation: presentation,
}

export default PortfolioThemes;