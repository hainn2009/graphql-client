import { Outlet } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { AuthProvider } from "./context/auth";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";

function App() {
    return (
        <AuthProvider>
            <Container>
                <MenuBar />
                <Outlet />
            </Container>
        </AuthProvider>
    );
}

export default App;
