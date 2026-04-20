import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Organization } from "./components/Organization";
import { Contact } from "./components/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "certificates", Component: Certificates },
      { path: "organization", Component: Organization },
      { path: "contact", Component: Contact },
      { path: "*", Component: Home },
    ],
  },
]);
