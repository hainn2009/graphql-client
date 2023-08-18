import React, { useContext, useState, useRef, useEffect } from "react";
import { Card, Grid, Image, Button, Icon, Label, Form } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";
import { getPost } from "../services/Post";
import { createComment } from "../services/Post";
import { useNavigate, useParams } from "react-router";

export default function SinglePost() {
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState();

    useEffect(() => {
        getPost(postId)
            .then((data) => {
                setPost(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [postId]);

    const reloadData = () => {
        getPost(postId)
            .then((data) => {
                setPost(data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const deletePostCallback = () => {
        navigate("/");
    };

    let postMarkup;
    const token = localStorage.getItem("jwtToken");
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
                                    <Button as="div" labelPosition="right">
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
