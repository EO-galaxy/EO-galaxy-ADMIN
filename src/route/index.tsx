import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../Dashboard";
import { SignIn } from "../SignIn";
import Layout from "../Layout/Layout";
import Loader from "../Loader";
import Error from "../Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => <Loader />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
