import { AUTH_TOKEN } from "./Constants";

export default class Token {
  public static get_auth_token() {
    // The auth token will usually be in a cookie
    const cookie = document.cookie;
    const cookie_contents = cookie.split(";"); // All the cookie items will be seperated by ';' sign
    const auth_token_content_filtered = cookie_contents.filter((content) =>
      content.includes(AUTH_TOKEN)
    );

    if (auth_token_content_filtered.length <= 0) return ""; // The auth token dosen't exist

    // Extract the token
    const auth_token_str = auth_token_content_filtered[0]; // Single item
    const auth_token = auth_token_str.split("=")[1]; // Any value after '=' sign is the actual cookie value. In this case 'auth_token'

    return auth_token;
  }

  public static check_for_auth_token(): boolean {
    // Get the auth token
    const auth_token = this.get_auth_token();

    return auth_token.length > 0;
  }
}
