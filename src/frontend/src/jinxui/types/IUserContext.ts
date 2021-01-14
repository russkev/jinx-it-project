import { AxiosRequestConfig } from "axios";
import { Tuuid } from "jinxui/types"

// Type for user context state
export interface IUserContext {
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  // Set true when user logged in; set false when token is invalid
  authenticated: boolean;
  lightThemeMode: boolean;
  portfolioId: Tuuid;
  theme: string;
  isSaving: boolean;
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
  config: AxiosRequestConfig;
}
