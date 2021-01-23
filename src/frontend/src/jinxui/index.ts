/* Form */
export { default as StyledFormDiv } from "./components/form/StyledFormDiv";
export { default as StyledFormAlert } from "./components/form/StyledFormAlert";
export { default as StyledFormOuterDiv } from "./components/form/StyledFormOuterDiv";
export { default as StyledFormBottomButtonsDiv } from "./components/form/StyledFormBottomButtonsDiv";
export { default as StyledFormSectionsDiv } from "./components/form/StyledFormSectionDiv";

/* Site */
export { default as SiteLayout } from "./components/site/SiteLayout";
export { default as PrimaryColumnDiv } from "./components/site/PrimaryColumnDiv";
export { default as PrimaryMenu } from "./components/site/PrimaryMenu";
export { default as SnackbarAlert } from "./components/site/SnackbarAlert";
export { default as MenuGap } from "./components/site/MenuGap"

/* Button */
export { PrimaryButton } from "./components/site/Button";
export { SecondaryButton } from "./components/site/Button";

/* Header */
export { default as LogoLink } from "./components/header/LogoLink";
export { HeaderBar, HeaderMediaWidth } from "./components/header/HeaderBar";
export { default as DropdownPortfolio } from "./components/header/DropdownPortfolio";
export { default as DialogAccount } from "./components/header/DialogAccount"
export { default as DialogShare } from "./components/header/DialogShare";
export { default as DialogTheme } from "./components/header/DialogTheme";
export { default as StyledHeaderButton } from "./components/header/StyledHeaderButton";
export { default as StyledHeaderDiv } from "./components/header/StyledHeaderDiv";
export { default as StyledSiteHeader } from "./components/header/StyledSiteHeader";
export { default as StyledHeaderTitle } from "./components/header/StyledHeaderTitle";
export { default as StyledHeaderBarSpacer } from "./components/header/StyledHeaderBarSpacer";

/* Account */
export { default as AccountPageDiv } from "./components/account/AccountPageDiv";

/* Display */
export { default as DisplayBackground } from "./components/display/DisplayBackground"
export { default as DisplayCopyright } from "./components/display/DisplayCopyright"
export { default as DisplayHeader } from "./components/display/DisplayHeader"
export { default as DisplayLinks } from "./components/display/DisplayLinks"
export { default as DisplaySection } from "./components/display/DisplaySection"
export { default as DisplaySectionList } from "./components/display/DisplaySectionList"
export { default as DisplayPageList } from "./components/display/DisplayPageList"
export { HandleNavigationClick } from "./components/display/DisplayNavigation"
export { default as DisplayNavigation } from "./components/display/DisplayNavigation"
export { default as DisplayNavigationDesktop } from "./components/display/DisplayNavigationDesktop"
export { default as DisplayNavigationMobile } from "./components/display/DisplayNavigationMobile"
export { default as DisplayNavigationHeader } from "./components/display/DisplayNavigationHeader"
export { default as ThemeBackgroundColors } from "./components/display/ThemeBackgroundColors"
export { default as ThemeSectionColors } from "./components/display/ThemeSectionColors"

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
export { default as LinkIconMenu } from "./components/edit/LinkIconMenu"
export { default as LinkDialog } from "./components/edit/LinkDialog"
export { default as LinkEditMenu } from "./components/edit/LinkEditMenu"
export { default as LinksDisplay } from "./components/edit/LinksDisplay"
export { default as NewSectionButton } from "./components/edit/NewSectionButton"
export { default as PortfolioNameSectionInput } from "./components/edit/LinksDisplay"
export { default as PaperSectionsDisplay } from "./components/edit/PaperSectionList"
export { LinkIconEnum, LinkDisplayIcon } from "./components/edit/LinkDisplayIcon"
export { default as PageEdit } from "./components/edit/PageEdit"
export { default as SaveMobile } from "./components/edit/SaveMobile"
export { default as SaveDesktop } from "./components/edit/SaveDesktop"
export { default as StyledOneColumnSectionDiv } from "./components/edit/StyledOneColumnSectionDiv";
export { default as StyledTwoColumnSectionDiv } from "./components/edit/StyledTwoColumnSectionDiv";
export { default as StyledUserImageEdit } from "./components/edit/StyledUserImageEdit";
export { default as StyledPaperSectionBase } from "./components/edit/StyledPaperSectionBase"
export { default as StyledPaperSectionDiv } from "./components/edit/StyledPaperSectionDiv"
export { default as StyledPaperSectionHeading } from "./components/edit/StyledPaperSectionHeading"
export { default as SkeletonLinks } from "./components/edit/SkeletonLinks"
export { default as SkeletonInput } from "./components/edit/SkeletonInput"
export { default as SkeletonEditAll } from "./components/edit/SkeletonEditAll"

/* Home */
export { default as HomeTemplates } from "./components/home/HomeTemplates";
export { UploadIcon, FormIcon, LogoTextIcon } from "./components/home/HomeIcons";
export { default as HomeFooter } from "./components/home/HomeFooter";

/* Routes */
export { LoggedInRoute, LoggedOutRoute } from "./routes/ProtectedRoutes.js";
export { PortfolioDisplay } from "./routes/PortfolioDisplay";
export { Routes } from "./routes/Routes";

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


/* Constants */
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