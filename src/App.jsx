import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css"

import Startpage from "./pagess/Startpage";
import AppLayout from "./layouts/applayout";
import Onbording from "./pagess/onbording";
import Joblisting from "./pagess/joblisting";
import Jobpage from "./pagess/joppage";
import Postjob from "./pagess/postjob";
import Savedjob from "./pagess/savedjobs";
import Myjob from "./pagess/myjobsmy";
import Protectedroute from "./components/protectedroute";

import { ThemeProvider } from "./components/theme-provider";

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
        element: (
          <Protectedroute>
            <Onbording />
          </Protectedroute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <Protectedroute>
            <Joblisting />
          </Protectedroute>
        ),
      },
      {
        path: "/jobpage",
        element: (
          <Protectedroute>
            <Jobpage />
          </Protectedroute>
        ),
      },
      {
        path: "/postjob",
        element: (
          <Protectedroute>
            <Postjob />
          </Protectedroute>
        ),
      },
      {
        path: "/savedjob",
        element: (
          <Protectedroute>
            <Savedjob />
          </Protectedroute>
        ),
      },
      {
        path: "/myjob",
        element: (
          <Protectedroute>
            <Myjob />
          </Protectedroute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
