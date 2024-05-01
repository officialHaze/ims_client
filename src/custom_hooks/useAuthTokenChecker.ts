import { useEffect, useState } from "react";
import Token from "../utils/Token";

export default function useAuthentication(pathname: string) {
  const [is_authenticated, set_is_authenticated] = useState(false);

  useEffect(() => {
    // Check if the auth token exists in cookie
    const auth_token_exists = Token.check_for_auth_token();

    if (auth_token_exists) {
      // Authorize the user
      set_is_authenticated(true);
    }
  }, [pathname]);

  return { is_authenticated };
}
