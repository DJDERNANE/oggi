import { MainAPI } from "./MainAPI"
import Cookies from "js-cookie";

export const GetRequest = async (url: string, auth: boolean) => {
    let header = {}
    if (auth) {
        const Token = Cookies.get("oggi_token");
        header  = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          }
    }else{
        header  = {
            "Content-Type": "application/json",
          }
    }
    const response = await fetch(`${MainAPI}${url}`, {
      method: "GET",
      headers: header,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    return response.json();
  };