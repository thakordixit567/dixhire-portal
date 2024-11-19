import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Startpage from "./pagess/Startpage";
import AppLayout from "./layouts/applayout";
import Onbording from "./pagess/onbording";
import Joblisting from "./pagess/joblisting";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Startpage />,
      },
      {
        path: "/onbording",
        element: <Onbording />,
      },
      {
        path: "/jobs",
        element: <Joblisting />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
