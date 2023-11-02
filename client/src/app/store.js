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
import chestReducer from "./reducers/chest/chest.reducer";
import auctionReducer from "./reducers/auction/auction.reducer";
import archiveGiftReducer from "./reducers/archive-gift/archive-gift.reducer";
import chestGiftReducer from "./reducers/chest-gift/chest-gift.reducer";
import importReducer from "./reducers/import/import.reducer";
import giftArchiveReducer from "./reducers/archive-gift/gift-archive.reducer";
import archiveChestReducer from "./reducers/archive-gift/archive-chest.reducer";
import archiveCountGiftReducer from "./reducers/archive-gift/archive-count-gift.reducer";
import countNotificationReducer from "./reducers/notification/count-notification.reducer";
import upgradeRateReducer from "./reducers/upgrade-rate/upgrade-rate.reducer";
import archiveReducer from "./reducers/archive/archive.reducer";
import importPresidentReducer from "./reducers/import/import.president.reducer";
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
    chest: chestReducer,
    auction: auctionReducer,
    archiveGift: archiveGiftReducer,
    chestGift: chestGiftReducer,
    import: importReducer,
    importPresident: importPresidentReducer,
    giftArchive: giftArchiveReducer,
    archiveChest: archiveChestReducer,
    archiveCountGift: archiveCountGiftReducer,
    countNotification: countNotificationReducer,
    upgradeRate: upgradeRateReducer,
    archive: archiveReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
