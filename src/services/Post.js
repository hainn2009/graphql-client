import axios from "axios";
const backendUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_URI_DEVELOPMENT : process.env.REACT_APP_URI_PRODUCTION;
export const getPosts = () => {
    return fetch(`${backendUrl}/posts`, {
        method: "GET",
    }).then((response) => response.json());
};
export const getPost = (postId) => {
    return fetch(`${backendUrl}/posts/${postId}`, {
        method: "GET",
    }).then((response) => response.json());
};
export const createPost = (post, token) => {
    return fetch(`${backendUrl}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
    }).then((response) => response.json());
};
export const deletePost = async (postId, token) => {
    try {
        const response = await axios.delete(`${backendUrl}/posts/${postId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};

export const likePost = async (postId, token) => {
    try {
        const response = await axios.post(`${backendUrl}/posts/${postId}/like`, undefined, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};

export const createComment = async ({ postId, comment, token }) => {
    try {
        const response = await axios.post(
            `${backendUrl}/posts/${postId}/comments`,
            { body: comment },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};

export const deleteComment = async ({ postId, commentId, token }) => {
    try {
        const response = await axios.delete(`${backendUrl}/posts/${postId}/comments/${commentId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};
