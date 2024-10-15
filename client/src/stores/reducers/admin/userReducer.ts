import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../../interface/admin";
import {
  addUser,
  getAllUser,
  paginateUser,
  searchUser,
  sortUser,
  updateUser,
  updateUserStatus,
} from "../../../services/admin/user.service";

const userState: Users[] = [];

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: userState,
    account: JSON.parse(localStorage.getItem("account") || "{}"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<{ id: number; status: number }>) => {
          const userIndex = state.user.findIndex(
            (user) => user.id === action.payload.id
          );
          if (userIndex !== -1) {
            state.user[userIndex].status = action.payload.status;
          }
        }
      )
      .addCase(searchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.account = action.payload;
        localStorage.setItem("account", JSON.stringify(action.payload));
      })
      .addCase(sortUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(paginateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userReducer.reducer;
