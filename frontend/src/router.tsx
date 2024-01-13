import { createBrowserRouter } from "react-router-dom";
import { LoginPage, Root } from "./pages";
import { ProtectedRoot } from "./pages/ProtectedRoot";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Root redirectTo="/app" />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "app",
    element: <ProtectedRoot redirectTo="/login" />,
    children: [
      {
        index: true,
        element: <h1>sdfasdfsdfsd</h1>,
      },
    ],
  },
]);
