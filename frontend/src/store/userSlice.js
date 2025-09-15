import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunkFunctions";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        //thunk 시작 직후, 로딩 스피너 on
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        //성공했을 때, 로딩 스피너 off,
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        //실패했을 때, 로딩 스피너 off, 에러 메시지
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
