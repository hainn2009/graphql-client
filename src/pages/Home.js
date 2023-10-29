import React, { useContext, useState } from "react";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { useEffect } from "react";
import { getPosts } from "../services/Post";

function Home() {
    const [posts, setPosts] = useState([]);
    let loading = posts?.data?.length > 0 ? true : false;
    useEffect(() => {
        getPosts()
            .then((data) => {
                setPosts(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const { user } = useContext(AuthContext);

    const handlePostAdded = () => {
        getPosts()
            .then((data) => {
                setPosts(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm onPostAdded={handlePostAdded} />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    // <Transition.Group>
                    <>
                        {posts &&
                            posts.map((post) => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostCard post={post} onDeletedPost={handlePostAdded} onLikedPost={handlePostAdded} />
                                </Grid.Column>
                            ))}
                    </>
                    // </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;
