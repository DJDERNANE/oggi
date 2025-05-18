// Save the token when the user logs in
import Cookies from "js-cookie";

export const RemoveToken = () => {
  Cookies.remove("oggi_token");
};
