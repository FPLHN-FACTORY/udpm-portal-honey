import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "./reducers/gift/gift.reducer";
import conversionReducer from "./reducers/conversion/conversion.reducer";
import honeyReducer from "./reducers/honey/honey.reducer";
import historyReducer from "./reducers/history/history.reducer";
import studentSemestertReducer from "./reducers/student-semester/student-semester.reducer";
import usersReducer from "./reducers/users/users.reducer";
import loaddingReducer from "./reducers/loading/loading.reducer";
import categoryReducer from "./reducers/category/category.reducer";
import chestReducer from "./reducers/chest/chest.reducer";
import auctionReducer from "./reducers/auction/auction.reducer";
import archiveGiftReducer from "./reducers/archive-gift/archive-gift.reducer";
import chestGiftReducer from "./reducers/chest-gift/chest-gift.reducer";
import importReducer from "./reducers/import/import.reducer";
import giftArchiveReducer from "./reducers/archive-gift/gift-archive.reducer";
import archiveChestReducer from "./reducers/archive-gift/archive-chest.reducer";
import archiveCountGiftReducer from "./reducers/archive-gift/archive-count-gift.reducer";
import upgradeRateReducer from "./reducers/upgrade-rate/upgrade-rate.reducer";
import archiveReducer from "./reducers/archive/archive.reducer";
import importPresidentReducer from "./reducers/import/import.president.reducer";
import importTeacherReducer from "./reducers/import/import.teacher.reducer";
import honorReducer from "./reducers/honor/honor.reducer";
import pStudentReducer from "./reducers/honor/pStudent.reducer";
import countNotificationStudentReducer from "./reducers/notification/student/count-notification-student.reducer";
import notificationStudentReducer from "./reducers/notification/student/notification-student.reducer";
import countNotificationCensorReducer from "./reducers/notification/censor/count-notification-censor.reducer";
import notificationCensorReducer from "./reducers/notification/censor/notification-censor.reducer";
import notificationPresidentReducer from "./reducers/notification/president/notification-president.reducer";
import countNotificationPresidentReducer from "./reducers/notification/president/count-notification-president.reducer";
import notificationTeacherReducer from "./reducers/notification/teacher/notification-teacher.reducer";
import countNotificationTeacherReducer from "./reducers/notification/teacher/count-notification-teacher.reducer";

export const store = configureStore({
  reducer: {
    gift: giftReducer,
    conversion: conversionReducer,
    history: historyReducer,
    honey: honeyReducer,
    user: usersReducer,
    studentSemestert: studentSemestertReducer,
    loadding: loaddingReducer,
    category: categoryReducer,
    chest: chestReducer,
    auction: auctionReducer,
    archiveGift: archiveGiftReducer,
    chestGift: chestGiftReducer,
    import: importReducer,
    importPresident: importPresidentReducer,
    importTeacher: importTeacherReducer,
    giftArchive: giftArchiveReducer,
    archiveChest: archiveChestReducer,
    archiveCountGift: archiveCountGiftReducer,
    upgradeRate: upgradeRateReducer,
    archive: archiveReducer,
    honor: honorReducer,
    pStudent: pStudentReducer,
    notificationStudent: notificationStudentReducer,
    countNotificationStudent: countNotificationStudentReducer,
    notificationCensor: notificationCensorReducer,
    countNotificationCensor: countNotificationCensorReducer,
    notificationTeacher: notificationTeacherReducer,
    countNotificationTeacher: countNotificationTeacherReducer,
    notificationPresident: notificationPresidentReducer,
    countNotificationPresident: countNotificationPresidentReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
