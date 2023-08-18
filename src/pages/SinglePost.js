import React, { useContext, useState, useRef, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Card, Grid, Image, Button, Icon, Label, Form } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";
import { getPost } from "../services/Post";
import { createComment, deleteComment } from "../services/Post";

export default function SinglePost(props) {
    //TODO: no phai la postId vì trong app.js đã viết như vậy
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState();

    useEffect(() => {
        getPost(postId)
            .then((data) => {
                setPost(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const reloadData = () => {
        getPost(postId)
            .then((data) => {
                setPost(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    //     variables: { postId },
    // });

    // const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    //     update() {
    //         //Set comment to empty after submit it
    //         setComment("");
    //         commentInputRef.current.blur();
    //     },
    //     variables: {
    //         postId,
    //         body: comment,
    //     },
    // });

    const deletePostCallback = () => {
        props.history.push("/");
    };

    let postMarkup;
    const token = localStorage.getItem("jwtToken");
    console.log("comments", post && post.comments);
    if (!post) {
        postMarkup = "<p>Loading...</p>";
    } else {
        const { id, username, body, createAt, likes, likeCount, comments, commentCount } = post;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated="right" size="small" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createAt).fromNow()}.</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} onLikedPost={reloadData} />
                                <MyPopup content="Comment on post">
                                    <Button as="div" labelPosition="right" onClick={() => console.log("Comments")}>
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentCount}
                                        </Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="comment.."
                                                name="comment"
                                                value={comment}
                                                onChange={(event) => setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ""}
                                                onClick={async () => {
                                                    await createComment({ postId, token, comment });
                                                    setComment("");
                                                    reloadData();
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && comment.username === user.username && (
                                        <DeleteButton postId={postId} commentId={comment.id} onDeletedComment={reloadData} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                username
                createAt
                body
            }
            commentCount
        }
    }
`;

const FETCH_POST_QUERY = gql`
    query ($postId: ID!) {
        getPost(postId: $postId) {
            id
            username
            createAt
            body
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createAt
                body
            }
        }
    }
`;
