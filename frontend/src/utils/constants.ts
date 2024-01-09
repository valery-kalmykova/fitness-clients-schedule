export enum EVENT_TYPE {
  event = 'event',
  task = 'task',
}

export interface Event {
  id: string;
  type: EVENT_TYPE;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  comment: string;
  color: string;
  done: boolean;
}