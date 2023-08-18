import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import MyPopup from "../util/MyPopup";
import { likePost } from "../services/Post";

function LikeButton({ user, post: { id, likes, likeCount }, onLikedPost }) {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    );

    return (
        <Button
            as="div"
            labelPosition="right"
            onClick={async () => {
                const token = localStorage.getItem("jwtToken");
                await likePost(id, token);
                onLikedPost();
            }}
        >
            <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
}

export default LikeButton;
