import axios from "axios";

export const getPosts = () => {
    return fetch("http://localhost:3001/posts", {
        method: "GET",
    }).then((response) => response.json());
};
export const createPost = (post, token) => {
    return fetch("http://localhost:3001/posts", {
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
        const response = await axios.delete(`http://localhost:3001/posts/${postId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data.errors;
    }
};
