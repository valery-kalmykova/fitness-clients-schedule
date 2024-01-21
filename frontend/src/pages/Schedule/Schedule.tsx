import MainPanel from "../../components/main-panel/MainPanel";
import Schedule from "../../components/schedule/Schedule";
import ModalEvent from "../../components/modal-event/ModalEvent";
import { useAppSelector } from "../../utils/hooks/redux";
import MainCardBody from "../../components/main-card-body/MainCardBody";

const SchedulePage = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpenEventInfo);
  return (
    <MainPanel>
      <MainCardBody flexGrow={1}>
        <Schedule />
        {isOpen && <ModalEvent />}
      </MainCardBody>
    </MainPanel>
  );
};

export default SchedulePage;
