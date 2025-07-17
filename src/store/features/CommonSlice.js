import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: true,
  mobileSidebar: false, // 👈 mobile drawer control
};

const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebar = !state.mobileSidebar;
    },
    closeMobileSidebar: (state) => {
      state.mobileSidebar = false;
    },
  },
});

export const { setMenu, toggleMobileSidebar, closeMobileSidebar } = CommonSlice.actions;
export default CommonSlice.reducer;
