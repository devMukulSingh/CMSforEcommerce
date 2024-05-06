import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  isOpen: boolean;
  loading: boolean;
  openSidebar: boolean;
  tableData: any[] 
}
const initialState: IinitialState = {
  isOpen: false,
  loading: false,
  openSidebar: false,
  tableData:[]
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDialog: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOpenSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
    setTableData : (state,action) => {
      state.tableData = action.payload;
    }
  },
});

export default adminSlice.reducer;
export const { setDialog, setLoading, setOpenSidebar, setTableData } = adminSlice.actions;
