import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";
import { Callback } from "../pages/Callback";
import { Users } from "../pages/Users";
import { Clients } from "../pages/Clients";
import { Units } from "../pages/Units";
import { Groups } from "../pages/Groups";

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
      },
      {
        path: "/groups",
        element: <Groups />
      },
      {
        path: "/clients",
        element: <Clients />
      },
      {
        path: "/units",
        element: <Units />
      }
    ]
  }
]);

export default router;
