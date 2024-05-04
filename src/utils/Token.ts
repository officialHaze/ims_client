import { ACCESS_TOKEN, REFRESH_TOKEN } from "./Constants";

export default class Token {
  public static getAccessToken() {
    // The access token will usually be in a cookie
    const cookie = document.cookie;
    const cookie_contents = cookie.split(";"); // All the cookie items will be seperated by ';' sign
    const access_token_content_filtered = cookie_contents.filter(content =>
      content.includes(ACCESS_TOKEN)
    );

    if (access_token_content_filtered.length <= 0) return ""; // The acess token dosen't exist

    // Extract the token
    const access_token_str = access_token_content_filtered[0]; // Single item
    const access_token = access_token_str.split("=")[1]; // Any value after '=' sign is the actual cookie value. In this case 'auth_token'

    return access_token;
  }

  public static saveAccessToken(accessToken: string) {
    // The access token will be saved in cookie
    document.cookie = `${ACCESS_TOKEN}=${accessToken}; max-age=${
      process.env.REACT_APP_ACCESS_TOKEN_COOKIE_EXPIRY_SECONDS || "1200"
    }; path=/;`;
  }

  public static saveRefreshToken(refreshToken: string) {
    // Refresh token will be saved in local storage
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public static deleteAccessToken() {
    document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public static deleteRefreshToken() {
    localStorage.removeItem(`${REFRESH_TOKEN}`);
  }

  public static checkForAccessToken(): boolean {
    // Get the auth token
    const accessToken = this.getAccessToken();

    return accessToken.length > 0;
  }
}
