import { MainAPI } from "./MainAPI"
import Cookies from "js-cookie";
export const DownloadRequest = async (url: string, auth: boolean, fileName: string) => {
    let headers: HeadersInit = {};
    if (auth) {
        const Token = Cookies.get("oggi_token");
        headers = {
            Authorization: `Bearer ${Token}`,
        };
    }

    const response = await fetch(`${MainAPI}${url}`, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
};