import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";
import { deletePost, deleteComment } from "../services/Post";

export default function DeleteButton({ postId, commentId, callback, onDeletedPost, onDeletedComment }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

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
