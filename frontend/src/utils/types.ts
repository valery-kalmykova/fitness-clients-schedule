export enum EVENT_TYPE {
  event = "event",
  task = "task",
}

export interface Event {
  id: string;
  type: EVENT_TYPE;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  comment: string[];
  color: string;
  done: boolean;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  age: string;
  weight: number;
  health: string[];
  color: string;
}