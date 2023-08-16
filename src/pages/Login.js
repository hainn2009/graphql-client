import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { login } from "../services/User";

const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update(_, result) {
        //     context.login(result.data.login);
        //     props.history.push('/');
        // },
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        // variables: {
        //     username: values.username
        // }
        variables: values,
    });
    async function loginUserCallback() {
        // loginUser();
        // fetch("http://localhost:3001/login", {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(values),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         context.login(data.data);
        //         props.history.push("/");
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         setErrors(err);
        //     });
        try {
            const data = await login(values);
            context.login(data);
            props.history.push("/");
        } catch (error) {
            setErrors(error);
        }
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login Page</h1>
                <Form.Input
                    label="Username"
                    placeholder="username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username

            password: $password
        ) {
            id
            email
            username
            createAt
            token
        }
    }
`;

export default Login;
