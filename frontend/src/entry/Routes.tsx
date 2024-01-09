import { Outlet, createBrowserRouter } from "react-router-dom";
import styles from "./App.module.css";
import Aside from "../components/aside/Aside";
import Header from "../components/header/Header";
import SchedulePage from "../pages/Schedule/Schedule";
import ModalTest from "../components/modal-event/ModalEvent";

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
        element: <SchedulePage />,
        children: [
          // {
          //   path: "/:id",
          //   element: <ModalTest />,
          // },
        ],
      },
    ],
  },
]);

export default router;
