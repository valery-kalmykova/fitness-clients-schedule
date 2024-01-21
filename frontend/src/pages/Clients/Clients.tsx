import MainCardBody from "../../components/main-card-body/MainCardBody";
import MainPanel from "../../components/main-panel/MainPanel";
import ClientList from "./components/client-list/ClientList";
import ClientInfo from "./components/client-info/ClientInfo";

const ClientsPage = () => {
  return (
    <MainPanel>
      <MainCardBody flexGrow={1}>
        <ClientList />
      </MainCardBody>
      <ClientInfo />
    </MainPanel>
  );
};

export default ClientsPage;
