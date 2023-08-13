import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "./reducers/gift/gift.reducer";
import conversionReducer from "./reducers/conversion/conversion.reducer";
import honeyReducer from "./reducers/honey/honey.reducer";
import semesterReducer from "./reducers/semester/semester.reducer";
import historyReducer from "./reducers/history/history.reducer";
import notificationReducer from "./reducers/notification/notification.reducer";
import studentSemestertReducer from "./reducers/student-semester/student-semester.reducer";
import usersReducer from "./reducers/users/users.reducer";
import loaddingReducer from "./reducers/loading/loading.reducer";
import categoryReducer from "./reducers/category/category.reducer";

export const store = configureStore({
  reducer: {
    gift: giftReducer,
    conversion: conversionReducer,
    history: historyReducer,
    notification: notificationReducer,
    honey: honeyReducer,
    semester: semesterReducer,
    user: usersReducer,
    studentSemestert: studentSemestertReducer,
    loadding: loaddingReducer,
    category: categoryReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
