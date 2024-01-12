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

export const presetColors = [
  "#3B887B",
  "#125446",
  "#6D94C4",
  "#284D79",
  "#995E7C",
  "#683142",
  "#D7620F",
  "#961B06",
  "#FC5F6A",
  "#E7242D",
];

export const optionsRegular = [
  { label: "Не повторять", value: "not-regular" },
  { label: "Повторять еженедельно", value: "regular" },
];