import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import MainProvider from "./MainProvider";

const root = createRoot(document.getElementById("root"));
root.render(<MainProvider />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
