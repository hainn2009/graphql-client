export const getPosts = () => {
    return fetch("http://localhost:3001/posts", {
        method: 'GET',           
    })
}
export const createPost = (post, token) => {
    return fetch("http://localhost:3001/posts", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
}
