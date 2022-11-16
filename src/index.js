import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/Layout"
import ErrorPage from "./pages/Error"
import Login from "./pages/login"
import Posts, { loader as PostsLoader } from "./pages/Posts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts",
        loader: PostsLoader,
        element: <Posts />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
