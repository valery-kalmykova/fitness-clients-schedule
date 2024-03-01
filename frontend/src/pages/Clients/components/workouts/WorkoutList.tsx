import WorkoutCard from "./WorkoutCard";
import { useEffect, useState } from "react";
import { CLIENT_SEGMENT_TYPE, Event } from "../../../../utils/types";

interface Props {
  workoutList: [];
  value: CLIENT_SEGMENT_TYPE;
}

const WorkputList = ({ workoutList, value }: Props) => {
  const [pastWorkouts, setPastWorkouts] = useState<Event[] | null>(null);
  const [futureWorkouts, setFutureWorkouts] = useState<Event[] | null>(null);

  useEffect(() => {
    const past = workoutList.filter((el: Event) => {
      return new Date(el.startDate) < new Date();
    });
    setPastWorkouts(past);
    const future = workoutList.filter((el: Event) => {
      return new Date(el.startDate) > new Date();
    });
    setFutureWorkouts(future);
  }, [workoutList]);

  return (
    <ul>
      {value === CLIENT_SEGMENT_TYPE.past &&
        pastWorkouts &&
        pastWorkouts.map((el: any) => {
          return <WorkoutCard event={el} key={el.id} />;
        })}
      {value === CLIENT_SEGMENT_TYPE.future &&
        futureWorkouts &&
        futureWorkouts!.map((el: any) => {
          return <WorkoutCard event={el} key={el.id} />;
        })}
    </ul>
  );
};

export default WorkputList;
