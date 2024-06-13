import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home";
import { SignIn } from "../SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
