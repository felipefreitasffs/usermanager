import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";
import { Callback } from "../pages/Callback";
import { Users } from "../pages/Users";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "callback",
    element: < Callback />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/users",
        element: <Users />
      }
    ]
  }
]);

export default router;
