export enum EVENT_TYPE {
  event = "event",
  task = "task",
  free = "free",
}

export enum EVENT_HEIGHT {
  small = 40,
  medium = 60,
  large = 90,
}

export enum RELATED_TYPE {
  all = "all",
  future = "future",
}

export enum CLIENT_SEGMENT_TYPE {
  future = "future",
  past = "past",
  payments = "payments",
}

export enum PAYMENT_TYPE {
  income = "income",
  expense = "expense",
}

export enum PAYMENT_AMOUNT {
  abonement = 2000,
  single = 2500,
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
  abonement?: string;
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
  abonement: string;
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
  health?: string;
  color: string;
}

export interface ClientFormData {
  name: string;
  phone: string;
  age?: string;
  weight?: number;
  health?: string;
  color: string;
}
