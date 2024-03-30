import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import WithLayout from "./components/WithLayout";
import JobListing from "./pages/JobListing";
import customTheme from "./themes/customTheme";
import { ThemeProvider } from "@mui/material";
import Auth from "./components/Auth";
import "./App.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  {
    path: "/home",
    element: WithLayout(Home),
  },
  {
    path: "/about",
    element: WithLayout(About),
  },
  {
    path: "/contact",
    element: WithLayout(Contact),
  },
  {
    path: "/gallery",
    element: WithLayout(Gallery),
  },
  {
    path: "/jobListing",
    element: WithLayout(JobListing),
  },
]);

const App = () => {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
