import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    error: {
        message: "",
        status: 200
    }
};

export const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            debugger;
            state.employees = action.payload;
        },
        setEmployeeError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setEmployees, setEmployeeError } = employeeSlice.actions;

export default employeeSlice.reducer;