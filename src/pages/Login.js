import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import { login } from "../services/User";

const Login = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    async function loginUserCallback() {
        try {
            const data = await login(values);
            context.login(data);
            navigate("/");
        } catch (error) {
            setErrors(error);
        }
    }
    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmit}
                noValidate
                // className={loading ? "loading" : ""} TODO
            >
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

export default Login;
