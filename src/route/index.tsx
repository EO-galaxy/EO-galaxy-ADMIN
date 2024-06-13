import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home";
import { SignIn } from "../SignIn";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
