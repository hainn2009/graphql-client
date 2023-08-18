import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { register } from "../services/User";
import { useNavigate } from "react-router";

const Register = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    async function registerUser() {
        // addUser();
        try {
            const data = await register(values);
            context.login(data);
            navigate("/");
        } catch (errors) {
            console.log(errors);
            if (Object.keys(errors).length > 0) setErrors(errors);
            else setErrors({ error: "Internal server error" });
        }
    }

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmit}
                noValidate
                // className={loading ? "loading" : ""}
            >
                <h1>Register Page</h1>
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
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    label="Confirm password"
                    placeholder="Confirm password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
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

export default Register;
