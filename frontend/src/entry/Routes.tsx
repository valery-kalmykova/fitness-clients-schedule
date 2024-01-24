import { Outlet, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import Aside from "../components/aside/Aside";
import Header from "../components/header/Header";
import SchedulePage from "../pages/Schedule/SchedulePage";
import ClientsPage from "../pages/Clients/ClientsPage";
import ClientInfo from "../pages/Clients/components/client-info/ClientInfo";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Aside />
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SchedulePage />
      },
      {
        path: "/schedule",
        element: <SchedulePage />
      },
      {
        path: "/clients",
        element: <ClientsPage />,
        children: [
          {
            path: "/clients/:id",
            element: <ClientInfo />
          }
        ]
      },
    ],
  },
]);

export default router;
