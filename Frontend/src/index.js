import React from "react";
import ReactDOM from "react-dom/client"; // Use the client module
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.js";
import { Provider } from "react-redux";
import store from "./Context/Store"; // Import your Redux store
import Sales from "./Components/Sales.js";

// ReactDOM.render(<Sales />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <Provider store={store}> {/* Wrap your app in Provider with store */}
    <AuthProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
