import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { createPost } from '../services/Post';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(useFormCallBack, {
        body: '',
    });

    /*
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        // update(_, result) {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            // data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...data.getPosts] },
            });
            values.body = '';
        },
    });
    */
    const token = localStorage.getItem('jwtToken')
    const createAPost = () => {
        createPost(values, token).then(response => response.json())
        .then((data) => {
            // setPosts(data.data);
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }
    // const [posts, setPosts] = useState([]);
    // let loading = posts?.data?.length > 0 ? true : false;

   const error = false;
    function useFormCallBack() {
        createAPost();

    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 28 }}>
                    <ui className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ui>
                </div>
            )}
        </>
    );
}
//create mutation that call createPost with body parameter get value from $body
const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createAt
            username
            likes {
                id
                username
                createAt
            }
            likeCount
            comments {
                id
                body
                username
                createAt
            }
            commentCount
        }
    }
`;

export default PostForm;
