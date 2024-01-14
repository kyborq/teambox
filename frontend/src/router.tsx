import { createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, MembersPage, ProtectedRoot, Root } from "./pages";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Root redirectTo="/" />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoot redirectTo="/login" />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "members",
        element: <MembersPage />,
      },
    ],
  },
]);
