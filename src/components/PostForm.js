import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { createPost } from "../services/Post";

function PostForm({ onPostAdded }) {
    const { values, onChange, onSubmit } = useForm(useFormCallBack, {
        body: "",
    });

    const token = localStorage.getItem("jwtToken");
    const createAPost = () => {
        createPost(values, token)
            .then(() => {
                onChange({ target: { name: "body", value: "" } });
                onPostAdded();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const error = false;
    function useFormCallBack() {
        createAPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Form.Input placeholder="Hi World" name="body" onChange={onChange} value={values.body} error={error ? true : false} />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 28 }}>
                    <ui className="list">
                        <li>{error.message}</li>
                    </ui>
                </div>
            )}
        </>
    );
}

export default PostForm;
