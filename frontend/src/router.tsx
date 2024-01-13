import { createBrowserRouter } from "react-router-dom";
import { LoginPage, Root } from "./pages";
import { ProtectedRoot } from "./pages/ProtectedRoot";
import { HomePage } from "./pages/HomePage";

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
    ],
  },
]);
