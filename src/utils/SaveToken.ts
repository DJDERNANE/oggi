// Save the token when the user logs in
import Cookies from "js-cookie";

export const saveToken = (token: string) => {
  Cookies.set("oggi_token", token, { expires: 7 }); // Store token for 7 days
};

