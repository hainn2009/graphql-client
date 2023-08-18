import axios from "axios";
console.log("environment", process.env.NODE_ENV);
const backendUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URI_DEVELOPMENT : process.env.REACT_APP_URI_PRODUCTION;

export const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/login`, { username, password });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/register`, {
            username,
            email,
            password,
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};
