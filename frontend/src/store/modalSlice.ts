import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface modalEventState {
  isOpenAddEvent: boolean;
  isOpenEventInfo: boolean;
  isOpenTaskInfo: boolean;
  isOpenAddClient: boolean;
  selectedDate: string | null;
  eventId: string | null;
}

const initialState: modalEventState = {
  isOpenAddEvent: false,
  isOpenEventInfo: false,
  isOpenTaskInfo: false,
  isOpenAddClient: false,
  selectedDate: null,
  eventId: null,
};

export const modalEventSlice = createSlice({
  name: "modalEvent",
  initialState,
  reducers: {
    setModalAddEventIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddEvent = action.payload;
    },
    setModalEventInfoIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenEventInfo = action.payload;
    },
    setModalTaskInfoIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenTaskInfo = action.payload;
    },
    setEventId: (state, action: PayloadAction<string | null>) => {
      state.eventId = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setModalAddClientIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddClient = action.payload;
    },
  },
});

export const {
  setModalAddEventIsOpen,
  setModalEventInfoIsOpen,
  setModalTaskInfoIsOpen,
  setEventId,
  setSelectedDate,
  setModalAddClientIsOpen,
} = modalEventSlice.actions;

export default modalEventSlice.reducer;
