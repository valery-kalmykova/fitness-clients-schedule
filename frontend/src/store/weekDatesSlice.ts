import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface weekDatesState {
  dates: string[] | null;
  activeDay: number | null;
}

const initialState: weekDatesState = {
  dates: null,
  activeDay: null,
};

export const weekDatesSlice = createSlice({
  name: "weekDates",
  initialState,
  reducers: {
    setWeekDates: (state, action: PayloadAction<string[]>) => {
      state.dates = action.payload;
    },
    setActiveWeekDay: (state, action: PayloadAction<number | null>) => {
      state.activeDay = action.payload;
    },
  },
});

export const { setWeekDates, setActiveWeekDay } = weekDatesSlice.actions;

export default weekDatesSlice.reducer;
