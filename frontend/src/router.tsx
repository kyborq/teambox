import { createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  MembersPage,
  ProtectedRoot,
  RegisterPage,
  RolesPage,
  Root,
  TasksPage,
} from "./pages";

export enum Router {
  Home = "/",
  Login = "/login",
  Register = "/register",
  Members = "/members",
  Roles = "/roles",
  Tasks = "/tasks",
  Time = "/tracker",
}

export const APP_NAVIGATION = {
  [Router.Home]: "Профиль",
  [Router.Members]: "Участники",
  [Router.Roles]: "Роли",
  [Router.Tasks]: "Задачи",
  [Router.Time]: "Время",
};

export const router = createBrowserRouter([
  {
    path: Router.Home,
    element: <Root redirectTo={Router.Home} />,
    children: [
      {
        path: Router.Login,
        element: <LoginPage />,
      },
      {
        path: Router.Register,
        element: <RegisterPage />,
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
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
]);
