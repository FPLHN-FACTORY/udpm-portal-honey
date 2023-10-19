import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const UpgradeRateSlice = createSlice({
  name: "upgradeRate",
  initialState,
  reducers: {
    SetAuction: (state, action) => {
      state = action.payload;
      return state;
    },

    AddAuction: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateAuction: (state, action) => {
      const updateAuction = action.payload;
      const index = state.findIndex(
        (auction) => auction.id === updateAuction.id
      );
      if (index !== -1) {
        state[index].originalHoneyId = updateAuction.originalHoney;
        state[index].destinationHoneyId = updateAuction.destinationHoney;
        state[index].status = updateAuction.status;
      }
    },
    ChangeAuctionStatus: (state, action) => {
      const updateAuction = action.payload;
      const index = state.findIndex(
        (auction) => auction.id === updateAuction.id
      );
      if (index !== -1) {
        state[index].status = updateAuction.status;
      }
    },
    DeleteAuction: (state, action) => {
      const idAuction = action.payload;
      const index = state.findIndex((auction) => auction.id === idAuction);
      state.splice(index, 1);
    },
  },
});

export const GetAuction = (state) => state.auction;
export const { SetAuction, AddAuction, DeleteAuction, UpdateAuction, ChangeAuctionStatus } =
  AuctionSlice.actions;
export default AuctionSlice.reducer;
