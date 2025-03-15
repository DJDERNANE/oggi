const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"; // Replace with your API URL

export const fetchData = async ({endpoint, method, body , token } : {endpoint: string, method?: string, body?: any, token?: null | string}) => {
    try {
        const headers : Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options : RequestInit = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    } catch (error : any) {
        console.error("Fetch Error:", error.message);
        throw error;
    }
};
