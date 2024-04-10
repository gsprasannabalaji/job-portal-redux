import {configureStore} from '@reduxjs/toolkit';
import galleryReducer from '../features/gallery/gallerySlice';
import employeesReducer from '../features/employees/employeesSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import newJobReducer from '../features/jobs/addJobSlice';
import userReducer from '../features/user/userSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        employee: employeesReducer,
        jobs: jobsReducer,
        addJob: newJobReducer,
        user: userReducer,
        login: loginReducer
    }
}); 