import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const UpgradeRateSlice = createSlice({
  name: "upgradeRate",
  initialState,
  reducers: {
    SetUpgradeRate: (state, action) => {
      state = action.payload;
      return state;
    },

    AddUpgradeRate: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateUpgradeRate: (state, action) => {
      const updateAuction = action.payload;
      const index = state.findIndex(
        (auction) => auction.id === updateAuction.id
      );
      if (index !== -1) {
        state[index].originalHoney = updateAuction.originalHoney;
        state[index].destinationHoney = updateAuction.destinationHoney;
        state[index].status = updateAuction.status;
        state[index].ratio = updateAuction.ratio;
      }
    },
    ChangeUpgradeRateStatus: (state, action) => {
      const updateAuction = action.payload;
      const index = state.findIndex(
        (auction) => auction.id === updateAuction.id
      );
      if (index !== -1) {
        state[index].status = updateAuction.status;
      }
    },
    DeleteUpgradeRate: (state, action) => {
      const idAuction = action.payload;
      const index = state.findIndex((auction) => auction.id === idAuction);
      state.splice(index, 1);
    },
  },
});

export const GetUpgradeRate = (state) => state.auction;
export const {
  SetUpgradeRate,
  AddUpgradeRate,
  DeleteUpgradeRate,
  UpdateUpgradeRate,
  ChangeUpgradeRateStatus,
} = UpgradeRateSlice.actions;
export default UpgradeRateSlice.reducer;
