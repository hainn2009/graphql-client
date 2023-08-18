import React from "react";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import CovidStatus from "./pages/CovidStatus";
import AuthRoute from "./util/AuthRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/posts/:postId"
                element={
                    <AuthRoute>
                        <SinglePost />
                    </AuthRoute>
                }
            />
            <Route path="/covid" element={<CovidStatus />} />
        </Route>
    )
);

export default function MainProvider() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
