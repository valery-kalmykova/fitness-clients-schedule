import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../utils/constants";

export interface weekEventsState {
  events: Event[] | null;
}

const initialState: weekEventsState = {
  events: null,
};

export const weekEventsSlice = createSlice({
  name: "weekDates",
  initialState,
  reducers: {
    setWeekEventsStore: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setWeekEventsStore } =weekEventsSlice.actions;

export default weekEventsSlice.reducer;
