export enum EVENT_TYPE {
  event = "event",
  task = "task",
}

export enum EVENT_HEIGHT {
  small = 40,
  medium = 60,
  large = 90,
}

export interface EventTask {
  id: string;
  type: EVENT_TYPE;
  client?: Client;
  startDate: string;
  endDate?: string;
  comments: string[];
  color: string;
  done: boolean;
  related_to?: string | null;
  abonement?: boolean;
  title?: string;
}

export interface Event {
  id: string;
  type: EVENT_TYPE;
  client: Client;
  startDate: string;
  endDate: string;
  comments: string[];
  color: string;
  done: boolean;
  related_to: string | null;
  abonement: boolean;
}

export interface Task {
  id: string;
  type: EVENT_TYPE;
  startDate: string;
  comments: string[];
  color: string;
  done: boolean;
  title: string;
}

export interface TaskFormData {
  type: EVENT_TYPE;
  title: string;
  startDate: string;
  color: string;
  comments?: string[];
}

export interface EventFormData {
  type: EVENT_TYPE;
  clientId: string;
  endDate: string;
  startDate: string;
  color: string;
  abonement: boolean;
  comments?: string[];
}

export interface Client {
  id: string;
  name: string;
  phone?: string;
  age?: string;
  weight?: number;
  health?: string[];
  color: string;
}

export interface ClientFormData {
  name: string;
  phone?: string;
  age?: string;
  weight?: number;
  health?: string[];
  color: string;
}