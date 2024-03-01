import { ConfigProvider, Segmented } from "antd";
import styles from "./segmentedBlock.module.css";
import WorkputList from "../workouts/WorkoutList";
import { useState } from "react";
import { optionsSegmentsClientInfo } from "../../../../utils/constants";
import { CLIENT_SEGMENT_TYPE } from "../../../../utils/types";
import Payments from "../payments/Payments";

interface Props {
  workoutList: [];
}

const SegmentedBlock = ({ workoutList }: Props) => {
  const [value, setValue] = useState<CLIENT_SEGMENT_TYPE>(
    CLIENT_SEGMENT_TYPE.past
  );

  function onChange(value: any) {
    setValue(value);
  }

  const SegmentedStyled = {
    marginBottom: "20px",
    width: "fit-content",
  };

  return (
    <div className={styles.flexColumn}>
      <h3 className={styles.title}>Тренировки:</h3>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemSelectedBg: "#3B887B",
            },
          },
        }}
      >
        <Segmented
          options={optionsSegmentsClientInfo}
          value={value}
          size="large"
          onChange={onChange}
          style={SegmentedStyled}
        />
      </ConfigProvider>
      {value === CLIENT_SEGMENT_TYPE.payments ? (
        <Payments />
      ) : (
        <WorkputList workoutList={workoutList} value={value} />
      )}
    </div>
  );
};

export default SegmentedBlock;
