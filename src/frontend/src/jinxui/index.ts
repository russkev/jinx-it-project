/* Form */
export { default as ErrorMessage } from "./components/form/ErrorMessage";
export { default as EntryTitle } from "./components/form/EntryTitle";
export { default as FormDiv } from "./components/form/FormDiv";
export { default as FormEntry } from "./components/form/FormEntry";
export { default as SubmitButton } from "./components/form/SubmitButton";
export { default as FormAlert } from "./components/form/FormAlert";
export { default as FormOuterDiv } from "./components/form/FormOuterDiv";
export { default as FormBottomButtonsDiv } from "./components/form/FormBottomButtonsDiv";
export { default as FormSectionsDiv } from "./components/form/FormSectionDiv";

/* Site */
export { default as SiteLayout } from "./components/site/SiteLayout";
export { default as PrimaryColumnDiv } from "./components/site/PrimaryColumnDiv";
export { default as PrimaryMenu } from "./components/site/PrimaryMenu";
export { default as SnackbarAlert } from "./components/site/SnackbarAlert"; 

/* Button */
export { PrimaryButton } from "./components/button/Button";
export { SecondaryButton } from "./components/button/Button";

/* Header */
export { default as StyledHeaderDiv } from "./components/header/StyledHeaderDiv";
export { default as StyledSiteHeader } from "./components/header/StyledSiteHeader";
export { default as LogoLink } from "./components/header/LogoLink";
export { default as StyledHeaderTitle } from "./components/header/StyledHeaderTitle";
export { HeaderBar, HeaderMediaWidth } from "./components/header/HeaderBar";
export { default as HeaderButton } from "./components/header/StyledHeaderButton";
export { default as StyledHeaderBarSpacer } from "./components/header/StyledHeaderBarSpacer";
export { default as DropdownPortfolio } from "./components/header/DropdownPortfolio";
export { default as DialogShare } from "./components/header/DialogShare";
export { default as DialogTheme } from "./components/header/DialogTheme";

/* Account */
export { default as AccountPageDiv } from "./components/account/AccountPageDiv";

/* Display */
export { default as PageName } from "./components/display/PageName";
export { default as SectionName } from "./components/display/SectionName";
export { default as TextSectionDiv } from "./components/display/TextSectionDiv";
export { default as PageDiv } from "./components/display/PageDiv";
export { default as OneColumnSectionDiv } from "./components/display/OneColumnSectionDiv";
export { default as TwoColumnSectionDiv } from "./components/display/TwoColumnSectionDiv";
export { default as DisplayLinks } from "./components/display/DisplayLinks"
export { themeColors } from "./components/display/MuiComponents"

/* Display Mui*/
export {
  Section,
  SectionGrid,
  CentredGrid,
  BackgroundImage,
  Copyright,
  ScreenBlock,
  PortfolioHeader,
} from "./components/display/MuiComponents";

/* Edit */
export { default as HeaderEditAddition } from "./components/edit/HeaderEditAddition"
export { default as PaperSection } from "./components/edit/PaperSection"
export { default as ContentChoiceMenu } from "./components/edit/ContentChoiceMenu"
export { default as InputComponentTextField } from "./components/edit/InputComponentTextField"
export { default as InputComponentUploadImage } from "./components/edit/InputComponentUploadImage"
export { default as InputComponentVideo } from "./components/edit/InputComponentVideo"
export { default as InputText } from "./components/edit/InputText"
export { default as InputImage } from "./components/edit/InputImage"
export { default as InputImageText } from "./components/edit/InputImageText"
export { default as InputPortfolio } from "./components/edit/InputPortfolio"
export { default as InputVideo } from "./components/edit/InputVideo"
export { default as SkeletonInput } from "./components/edit/SkeletonInput"
export { default as LinkIconMenu } from "./components/edit/LinkIconMenu"
export { default as LinkDialog } from "./components/edit/LinkDialog"
export { default as LinkEditMenu } from "./components/edit/LinkEditMenu"
export { default as LinksDisplay } from "./components/edit/LinksDisplay"
export { default as NewSectionButton } from "./components/edit/NewSectionButton"
export { default as PortfolioNameSectionInput } from "./components/edit/LinksDisplay"
export { default as PaperSectionsDisplay } from "./components/edit/PaperSectionList"
export { LinkIconEnum, LinkDisplayIcon } from "./components/edit/LinkDisplayIcon"
export { default as SkeletonLinks } from "./components/edit/SkeletonLinks"
export { default as PageEdit } from "./components/edit/PageEdit"
export { default as SaveMobile } from "./components/edit/SaveMobile"
export { default as SaveDesktop } from "./components/edit/SaveDesktop"
export { default as StyledUserImage } from "./components/edit/StyledUserImage";
export { default as StyledPaperSectionBase } from "./components/edit/StyledPaperSectionBase"
export { default as StyledPaperSectionDiv } from "./components/edit/StyledPaperSectionDiv"
export { default as StyledPaperSectionHeading } from "./components/edit/StyledPaperSectionHeading"
export { default as SkeletonEditAll } from "./components/edit/SkeletonEditAll"

/* Home */
export { default as HomeTemplates } from "./components/home/HomeTemplates";
export { UploadIcon, FormIcon, LogoTextIcon } from "./components/home/HomeIcons";
export { default as HomeFooter } from "./components/home/HomeFooter";

/* Routes */
export { LoggedInRoute, LoggedOutRoute } from "./routes/ProtectedRoutes.js";
export { PortfolioDisplay } from "./routes/PortfolioDisplay";
export { Routes } from "./routes/Routes";

/* Context */
export {
  UserContextProvider,
  UserContext,
  defaultUserContext,
  storeUserData,
  retrieveUserData,
  PortfolioContextProvider,
  PortfolioContext,
  defaultPortfolioContext,
  PageContextProvider,
  PageContext,
  defaultPageContext,
  SectionContextProvider,
  SectionContext,
  defaultSectionContext,
} from "./contexts/index";

/* Utils */
export {
  listDelete,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "./components/site/Utils";

/* Hook */
export { useUser } from "./hooks/useUser";
export { usePortfolio } from "./hooks/usePortfolio";
export { useSection } from "./hooks/useSection";
export { usePage } from "./hooks/usePage";

/* Theme */
export {
  LightTheme,
  DarkTheme,
  LightShadowColour,
  DarkShadowColour,
  LightHeaderGrad,
  DarkHeaderGrad,
  LightTitleBGGrad,
  DarkTitleBGGrad,
  LightPrimaryButtonGrad,
  LightPrimaryButtonGradHover,
  DarkPrimaryButtonGrad,
  BlueIconGrad,
} from "./theme/GlobalTheme";

/* Portfolio themes */
export { PortfolioThemes, defaultColors } from "./theme/index";

const LOGIN_PATH = "auth/token/login";
const LOGOUT_PATH = "auth/token/logout";
const ACCOUNT_PATH = "api/accounts";
const SIGNUP_PATH = "auth/users";
const IMAGES_PATH = "api/images";
const PORTFOLIOS_PATH = "api/portfolios";
export {
  LOGIN_PATH,
  LOGOUT_PATH,
  ACCOUNT_PATH,
  SIGNUP_PATH,
  IMAGES_PATH,
  PORTFOLIOS_PATH,
};

/* Sizes */
const BOX_HEIGHT = "130px";
const MAX_EDIT_HEADING_WIDTH = "550px"
const MAX_EDIT_SECTION_WIDTH = "900px"
const SAVE_DESKTOP_WIDTH = "1380px"
export {
  BOX_HEIGHT,
  MAX_EDIT_HEADING_WIDTH,
  MAX_EDIT_SECTION_WIDTH,
  SAVE_DESKTOP_WIDTH,
}