import axios from "axios";

export const login = async ({ username, password }) => {
    try {
        const response = await axios.post("http://localhost:3001/login", { username, password });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post("http://localhost:3001/register", {
            username,
            email,
            password,
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};
