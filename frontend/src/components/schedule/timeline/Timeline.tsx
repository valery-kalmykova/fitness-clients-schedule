import styles from "./Timeline.module.css";
import { timeLine, calendarStartHour } from "../../../utils/data";
import { useEffect, useState } from "react";

const Timeline = () => {
  const [timelineSorted, setTimelineSorted] = useState<string[] | null>(null);
  useEffect(() => {
    const calendarStartHourIndex = timeLine.indexOf(calendarStartHour);
    setTimelineSorted(
      timeLine
        .slice(calendarStartHourIndex)
        .concat(timeLine.slice(0, calendarStartHourIndex))
    );
  },[])

  return (
    <div className={styles.timeline}>
      <ul>
        {timelineSorted &&
          timelineSorted.map((item: any) => {
            return (
              <li key={item}>
                <span>{item}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Timeline;
