import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface modalEventState {
  isOpenAddEvent: boolean;
  isOpenEventInfo: boolean;
  eventId: number | null;
}

const initialState: modalEventState = {
  isOpenAddEvent: false,
  isOpenEventInfo: false,
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
    setEventId: (state, action: PayloadAction<number | null>) => {
      state.eventId = action.payload;
    },
  },
});

export const { setModalAddEventIsOpen, setModalEventInfoIsOpen, setEventId } =
  modalEventSlice.actions;

export default modalEventSlice.reducer;
