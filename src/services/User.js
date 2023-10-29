import axios from "axios";
const backendUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URI_PRODUCTION : process.env.REACT_APP_URI_PRODUCTION;

export const login = async ({ username, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/users/login`, { username, password });
        return response.data.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post(`${backendUrl}/users/register`, {
            username,
            email,
            password,
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.error;
    }
};
