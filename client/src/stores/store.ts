import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./reducers/admin/courseReducer";
import userReducer from "./reducers/admin/userReducer";
import subjectReducer from "./reducers/admin/subjectReducer";
import examReducer from "./reducers/admin/examReducer";
import questionReducer from "./reducers/admin/questionReducer";
import historyReducer from "./reducers/user/historyReducer";

const store = configureStore({
    reducer: {
        courses: courseReducer,
        users: userReducer,
        subjects: subjectReducer,
        exams: examReducer,
        questions: questionReducer,
        historys: historyReducer
    }
    
})
export default store