import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Startpage from "./pagess/Startpage";
import AppLayout from "./layouts/applayout";
import Onbording from "./pagess/onbording";
import Joblisting from "./pagess/joblisting";
import Jobpage from "./pagess/joppage";
import Postjob from "./pagess/postjob";
import Savedjob from "./pagess/savedjobs";
import myjob from "./pagess/my-job";

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
        element: <Onbording />,
      },
      {
        path: "/jobs",
        element: <Joblisting />,
      },
      {
        path: "/jobpage",
        element: <Jobpage/>,
      },
      {
        path: "/postjob",
        element: <Postjob/>,
      },
      {
        path: "/savedjob",
        element: <Savedjob/>,
      },
      {
        path: "/myjob",
        element: <myjob/>,
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
