import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home.jsx";
import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/user.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";

// 1. Cấu hình các đường dẫn (Routes) của ứng dụng
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout chung (chứa Header)
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

// 2. Render ứng dụng và bao bọc bởi AuthWrapper
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
);
