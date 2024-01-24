import MainPanel from "../../components/main-panel/MainPanel";
import ClientList from "./components/client-list/ClientList";
import { Outlet } from "react-router-dom";

const ClientsPage = () => {
  return (
    <MainPanel>
      <ClientList />
      <Outlet />
    </MainPanel>
  );
};

export default ClientsPage;
