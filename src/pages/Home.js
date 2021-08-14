import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { useEffect } from 'react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    useEffect(() => {
        // fetch('https://worldometers.p.rapidapi.com/api/coronavirus/world', {
        fetch('/coronavirus/world', {
            method: 'GET',
            headers: {
                'x-rapidapi-key':
                    'e39b87197emsh36501cda6febd34p1c0fcdjsnf028b3dd5920',
                'x-rapidapi-host': 'worldometers.p.rapidapi.com',
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    });
    const { user } = useContext(AuthContext);

    const { loading, data: { getPosts: posts } = {} } =
        useQuery(FETCH_POSTS_QUERY);
    // const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    <Transition.Group>
                        {posts &&
                            posts.map((post) => (
                                <Grid.Column
                                    key={post.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;
