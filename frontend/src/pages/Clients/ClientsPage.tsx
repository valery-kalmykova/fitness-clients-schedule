import MainPanel from "../../components/main-panel/MainPanel";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import ModalEvent from "../Schedule/components/modal-event/ModalEvent";
import ClientList from "./components/client-list/ClientList";
import { Outlet, useLocation } from "react-router-dom";
import FormEditClient from "./components/forms/client-edit/FormEditClient";
import FormsWrapperClients from "./components/forms/FormsWrapper";
import Modal from "../../components/modal-wrapper/Modal";
import { setModalEditClientIsOpen } from "../../store/modalSlice";

const ClientsPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isOpenEventInfo = useAppSelector(
    (state) => state.modal.isOpenEventInfo
  );
  const isOpenEditClient = useAppSelector(
    (state) => state.modal.isOpenEditClient
  );

  return (
    <MainPanel>
      <ClientList location={location.pathname.split("/")[2]} />
      <Outlet />
      {isOpenEventInfo && <ModalEvent />}
      {isOpenEditClient && (
        <Modal handleClose={() => dispatch(setModalEditClientIsOpen(false))}>
          <FormsWrapperClients>
            <FormEditClient />
          </FormsWrapperClients>
        </Modal>
      )}
    </MainPanel>
  );
};

export default ClientsPage;
