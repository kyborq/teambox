import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  MembersPage,
  ProtectedRoot,
  RolesPage,
  Root,
} from "./pages";

export enum Router {
  Home = "/",
  Login = "/login",
  Members = "/members",
  Roles = "/roles",
  Tasks = "/tasks",
  Time = "/tracker",
}

export const APP_NAVIGATION = {
  [Router.Home]: "Профиль",
  [Router.Members]: "Команда",
  [Router.Roles]: "Роли",
  [Router.Tasks]: "Задачи",
  [Router.Time]: "Время",
};

export const router = createBrowserRouter([
  {
    path: Router.Login,
    element: <Root redirectTo={Router.Home} />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: Router.Home,
    element: <ProtectedRoot redirectTo={Router.Login} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "members",
        element: <MembersPage />,
      },
      {
        path: "roles",
        element: <RolesPage />,
      },
    ],
  },
]);
