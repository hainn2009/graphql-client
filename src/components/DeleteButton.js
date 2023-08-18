import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";
import { deletePost, deleteComment } from "../services/Post";

export default function DeleteButton({ postId, commentId, callback, onDeletedPost, onDeletedComment }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                //data.getPosts = data.getPosts.filter((p) => p.id !== postId);
                //proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter((p) => p.id !== postId),
                    },
                });
            }
            //Because if we call DeleteButton from Postcard, we don't have callback
            if (callback) callback();
        },
        variables: { postId, commentId },
    });

    const handleDeletedPost = async () => {
        const token = localStorage.getItem("jwtToken");
        setConfirmOpen(false);
        if (commentId) {
            await deleteComment({ postId, commentId, token });
            await onDeletedComment();
        } else {
            await deletePost(postId, token);
            if (onDeletedPost) await onDeletedPost();
        }
        if (callback) callback();
    };

    return (
        <>
            <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
                <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={() => handleDeletedPost()} />
        </>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;
const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                body
                createAt
            }
            commentCount
        }
    }
`;
