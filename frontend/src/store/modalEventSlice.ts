import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface modalEventState {
  isOpen: boolean;
  eventId: number | null;
}

const initialState: modalEventState = {
  isOpen: false,
  eventId: null,
};

export const modalEventSlice = createSlice({
  name: "modalEvent",
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setEventId: (state, action: PayloadAction<number | null>) => {
      state.eventId = action.payload;
    },
  },
});

export const { setModalIsOpen, setEventId } = modalEventSlice.actions;

export default modalEventSlice.reducer;
