import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";  
import { AuthProvider } from "./context/AuthContext";  
import { BrowserRouter } from "react-router-dom";       
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider> 
      <ThemeProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
