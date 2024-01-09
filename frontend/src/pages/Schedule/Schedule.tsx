import MainPanel from "../../components/main-panel/MainPanel";
import Schedule from "../../components/schedule/Schedule";
import ModalEvent from "../../components/modal-event/ModalEvent";
import { useAppSelector } from "../../utils/hooks/redux";

const SchedulePage = () => {
  const isOpen = useAppSelector((state) => state.modalEvent.isOpen);
  return (
    <MainPanel>
      <Schedule />
      {isOpen && <ModalEvent />}
    </MainPanel>
  );
};

export default SchedulePage;
