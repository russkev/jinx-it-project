import { useContext } from "react";
import API from "../../API";
import { AxiosRequestConfig } from "axios";

import { 
  LOGIN_PATH,
  LOGOUT_PATH,
  ACCOUNT_PATH,
  SIGNUP_PATH,
  IMAGES_PATH,
  PORTFOLIOS_PATH,
} from "jinxui";

import {
  Tuuid
} from "jinxui/types"

import {
  UserContext
} from "jinxui/contexts"

/**
 * The 'user' hook
 *
 * Abstracts all API calls and management of user data (both in React components
 * and the browser's local storage) away from other components.
 *
 * When writing a function for the user hook, please keep in mind:
 * 1. The success (return) of your function shouldn't include anything axios or HTTP related
 * 2. The failure (throw) of your function should be an error message, probably extracted from
 *    the HTTP response. Please do not leave it to other components to extract the error message.
 */
export const useUser = () => {
  const [state, updateState, resetState] = useContext(UserContext);

  /**
   * Abstract the login procedure. Returns the auth_token if login succeeded,
   * or the backend response if it failed.
   * @param username
   * @param password
   */
  async function login(username: string, password: string) {
    try {
      const response = await API.post(LOGIN_PATH, {
        username: username,
        password: password,
      });
      if ("auth_token" in response.data) {
        // Set auth header to authenticate future requests
        const config = {
          headers: {
            Authorization: "Token " + response.data.auth_token,
          },
        };
        const accDetails = await getAccountDetails(config);
        const stateChanges = {
          username: username,
          firstName: accDetails.first_name,
          lastName: accDetails.last_name,
          email: accDetails.user.email,
          portfolioId: accDetails.primary_portfolio,
          theme: accDetails.theme,
          token: response.data["auth_token"],
          authenticated: true,
          isSaving: false,
          config: config,
          successMessage: "",
          errorMessage: "",
        };
        await updateState(stateChanges);
        return config;
      }
    } catch (e) {
      throw handleError(e);
    }
  }

  type TUpdateAccount = {
    firstName: string;
    lastName: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }
  async function updateAccount(
    accountDetails: TUpdateAccount
  ) {
    try {
      const accountPath = ACCOUNT_PATH + "/me"
      const passwordPath = SIGNUP_PATH + "/set_password"
      if (accountDetails.newPassword.length > 0 
        || accountDetails.oldPassword.length > 0
        || accountDetails.newPasswordConfirm.length > 0) {
          await API.post(
            passwordPath,
            {
              current_password: accountDetails.oldPassword,
              new_password: accountDetails.newPassword,
            },
            state.config
          );
        }

      const accountResponse = await API.patch(
        accountPath,
        {
          'first_name': accountDetails.firstName,
          'last_name': accountDetails.lastName,
          'user': {
            'email': accountDetails.email
          }
        },
        state.config 
        )
      updateState(
        {
          firstName: accountResponse.data.first_name,
          lastName: accountResponse.data.last_name,
          email: accountResponse.data.user.email,
        })
        return accountResponse
    } catch (e) {
      throw e;
    }

  }

  async function savePortfolioId(id: number) {
    try {
      await updateState({
        portfolioId: id,
      });
    } catch (e) {
      throw e;
    }
  }

  async function switchLightThemeMode() {
    try {
      await updateState({
        lightThemeMode: !state.lightThemeMode,
      });
    } catch (e) {
      throw e;
    }
    return state.lightThemeMode;
  }


  // Another style: await with try catch
  async function logout() {
    /**
     * Reset context state to default, and clear browser-stored user data.
     * Do this before the POST in case already logged out (failing POST would prevent
     * reseting browser state).
     */
    await resetState();
    try {
      const response = await API.post(LOGOUT_PATH, {}, state.config);
      // Logout succeeded on backend
      if (response.status === 204) {
        return response;
      }
      // Logout failed on backend - the browser's token might have already expired
    } catch (e) {
      console.log(e)
      throw handleError(e);
    }
  }

  // Declaring a function as async means the return gets wrapped in a promise
  /** Complete these tasks:
   * 1. Sign up the user in the backend.
   * 2. Log the user in automatically.
   */
  async function signup(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const response = await API.post(SIGNUP_PATH, {
        username: username,
        password: password,
        email: email,
      });
      const config = await login(username, password);
      if (config) {
        await setAccountDetails(
          firstName, 
          lastName, 
          config,
        );
      } else {
        throw Error("Portfolio not found")
      }
      // Manually update state to include first name, since login normally does this
      // but can't because the firstName/lastName haven't been stored yet.
      // await updateState({firstName: firstName});
      await login(username, password);
      return response;
    } catch (e) {
      throw handleError(e);
    }
  }

  // Declaring a function as async means the return gets wrapped in a promise
  async function uploadImage(file: File, name: string, setProgress: any) {
    const form_data = new FormData();
    form_data.append("path", file, file.name);
    form_data.append("name", name);

    const local_config = {
      ...state.config, 
      onUploadProgress: (progressEvent:any) => {
        const prog = Math.round(100 * progressEvent.loaded / progressEvent.total)
        setProgress(prog)
      }
    }

    const result = API.post(IMAGES_PATH, form_data, local_config)
      .then((response: any) => response)
      .catch((error: any) => {
        throw error;
      });
    return result;
  }

async function fetchImage(imageId: Tuuid) {
  const path = IMAGES_PATH + "/" + imageId
  try {
    return await API.get(path, state.config)
  } catch(error) {
    throw(error)
  }
}

  /**
   * Update the logged in user's account details.
   * @param first_name
   * @param last_name
   * @param konfig ignore this, you don't need this argument - only used for sign up trickery
   */
  async function setAccountDetails(
    first_name?: string,
    last_name?: string,
    konfig: AxiosRequestConfig = state.config
  ) {
    const result = API.put(
      ACCOUNT_PATH + "/me",
      {
        first_name: first_name,
        last_name: last_name,
      },
      konfig
    )
      .then((response) => response)
      .catch((error) => {
        throw handleError(error);
      });
    return result;
  }

  function getSavedPortfolioId() {
    return state.portfolioId;
  }

  function getSavedLightThemeMode() {
    return state.lightThemeMode;
  }

  function setSaving(isSaving: boolean) {
    updateState({isSaving: isSaving})
  }

  function isSaving() {
    return state.isSaving;
  }

  function setLoading(isLoading: boolean) {
    updateState({isLoading: isLoading})
  }

  function isLoading() {
    return state.isLoading;
  }

  async function getAccountDetails(konfig: AxiosRequestConfig = state.config) {
    try {
      const response = await API.get(ACCOUNT_PATH + "/me", konfig);
      if ("first_name" in response.data) {
        return response.data;
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getAccountDetailsFromUsername(
    username: string
  ): Promise<{
    first_name: string;
    last_name: string;
    primary_portfolio: Tuuid;
  }> {
    try {
      const response = await API.get(
        ACCOUNT_PATH + `?username=${username}`,
        state.config
      );
      let profile = response.data[0]
      delete profile.user
      return profile
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getImage(image_id: number) {
    const path = IMAGES_PATH + "/" + image_id;
    const result = API.get(path, state.config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  function themePreview(theme_name: string) {
    try {
      updateState({theme: theme_name});
    } catch (e) {
      throw e;
    }
  }

  async function themePreviewCancel(portfolioId: Tuuid) {
    try {
      const path = PORTFOLIOS_PATH + "/" + portfolioId;
      const response = await API.get(
        path,
        state.config
      );
      updateState({theme: response.data.theme})
    } catch (e) {
      throw e;
    }
  } 

  async function setTheme(portfolioId: Tuuid) {
    const path = PORTFOLIOS_PATH + "/" + portfolioId;
    try {
      const response = await API.patch(
        path,
        {
          theme: state.theme,
        },
        state.config
      )
      updateState({theme: response.data.theme})
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  function setInitialThemeState(theme: string) {
    updateState({theme: theme})
  }

  const getConfig = () => {
    return state.config
  }

  async function setSuccessMessage(message: string) {
    try {
      await updateState({successMessage: message})
    } catch(e) {
      throw e;
    }
  }

  async function setErrorMessage(message: string) {
    try {
      await updateState({ errorMessage: message });
    } catch (e) {
      throw e;
    }
  }
  
  function getSuccessMessage() {
    return state.successMessage;
  }

  function getErrorMessage() {
    return state.errorMessage;
  }

  /**
   * Extract the error message from various hook functions.
   * If we come up with a standard error response format, this function will become much smaller.
   * @param error
   */
  const handleError = (e: { response: any }) => {
    const error = e.response;
    var errorVar = null;
    var submitError = "";

    // If an authenticated API request failed, the user is likely unauthenticated.
    // Log them in.
    if (state.authenticated) logout();

    if (error.message) {
      errorVar = error.message;
    } else if (error.data) {
      if (error.data.non_field_errors) {
        errorVar = error.data.non_field_errors;
      } else if (error.data.password) {
        errorVar = error.data.password;
      } else if (error.data.username) {
        errorVar = error.data.username;
      } else if (error.data.email) {
        errorVar = error.data.email;
      }
    }
    if (errorVar) {
      let i = 0;
      for (i = 0; i < errorVar.length; i++) {
        submitError = submitError.concat(errorVar[i]);
      }
    } else {
      submitError = "service is currently unavailable, please try again later";
      console.error("Unable to connect to API for login (or unknown error)");
    }

    return submitError;
  };

  return {
    userData: state,
    login,
    updateAccount,
    savePortfolioId,
    switchLightThemeMode,
    logout,
    signup,
    setAccountDetails,
    uploadImage,
    fetchImage,
    isSaving,
    setSaving,
    isLoading,
    setLoading,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    getImage,
    getAccountDetails,
    getAccountDetailsFromUsername,
    handleError,
    themePreview,
    themePreviewCancel,
    setTheme,
    setInitialThemeState,
    getConfig,
    setSuccessMessage,
    setErrorMessage,
    getSuccessMessage,
    getErrorMessage,

    // Context state managing functions - warning, not recommended for use!
    // Using these might cause unexpected behaviour for the wrapper functions above (login, logout, etc).
    // If you need to use these, please write a wrapper in this User hook instead. :)
    updateState,
    resetState,
  };
};
