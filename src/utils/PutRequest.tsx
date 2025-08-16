import { MainAPI } from "./MainAPI"
import Cookies from "js-cookie";

export const PutRequest: any = async (url: string, auth: boolean, body: any) => {
  let headers: any = {};

  if (auth) {
      const Token = Cookies.get("oggi_token");
      headers['Authorization'] = `Bearer ${Token}`;
  }

  const isFormData = body instanceof FormData;

  if (!isFormData) {
      headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${MainAPI}${url}`, {
      method: "Put",
      headers,
      body: isFormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
