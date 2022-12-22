import { createSlice } from "@reduxjs/toolkit";

export const initApp = {
  chartList: [],
};

const appSlice = createSlice({
  name: "app", //the way it will look in the store
  initialState: initApp,
  reducers: {
    updateChartList(state, action) {
      state.chartList = action.payload;
    },
  },
});

export const { updateChartList } = appSlice.actions;
export default appSlice.reducer;
