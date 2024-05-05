import { useEffect, useState } from "react";
import Token from "../utils/Token";

export default function useAuthentication(pathname: string) {
  const [is_authenticated, set_is_authenticated] = useState(false);

  useEffect(() => {
    // Check if the auth token exists in cookie
    const accessTokenExists = Token.checkForAccessToken();

    if (accessTokenExists) set_is_authenticated(true); // Authorize the user
    else set_is_authenticated(false); // Unauthorize the user
  }, [pathname]);

  return { is_authenticated };
}
