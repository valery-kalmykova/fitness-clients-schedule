import MainPanel from "../../components/main-panel/MainPanel";
import Schedule from "./components/schedule/Schedule";
import ModalEvent from "./components/modal-event/ModalEvent";
import { useAppSelector } from "../../utils/hooks/redux";
import MainCardBody from "../../components/main-card-body/MainCardBody";
import ModalTask from "./components/modal-event/ModaTask";

const SchedulePage = () => {
  const isOpenEventInfo = useAppSelector((state) => state.modal.isOpenEventInfo);
  const isOpenTaskInfo = useAppSelector((state) => state.modal.isOpenTaskInfo);
  return (
    <MainPanel>
      <MainCardBody flexGrow={1}>
        <Schedule />
        {isOpenEventInfo && <ModalEvent />}
        {isOpenTaskInfo && <ModalTask />}
      </MainCardBody>
    </MainPanel>
  );
};

export default SchedulePage;
