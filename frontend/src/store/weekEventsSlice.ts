import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../utils/types";

export interface weekEventsState {
  events: Event[] | null;
  isShowFreeTime: boolean;
}

const initialState: weekEventsState = {
  events: null,
  isShowFreeTime: false,
};

export const weekEventsSlice = createSlice({
  name: "weekEvents",
  initialState,
  reducers: {
    setWeekEventsStore: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setIsShowFreeTime: (state, action: PayloadAction<boolean>) => {
      state.isShowFreeTime = action.payload;
    },
  },
});

export const { setWeekEventsStore, setIsShowFreeTime } = weekEventsSlice.actions;

export default weekEventsSlice.reducer;
