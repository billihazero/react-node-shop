import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./thunkFunctions";
import { toast } from "react-toastify";

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
    //registerUser = thunkFunction에서 createAsyncThunk 함수를 사용함
    // createAsyncThunk 함수는 return 값으로 pending, fulfilled, rejected를 반환
    builder
      .addCase(registerUser.pending, (state) => {
        //thunk 시작 직후, 로딩 스피너 on
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        //성공했을 때, 로딩 스피너 off,
        state.isLoading = false;
        toast.info("회원가입을 성공했습니다.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        //실패했을 때, 로딩 스피너 off, 에러 메시지
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        //thunk 시작 직후, 로딩 스피너 on
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        //성공했을 때, 로딩 스피너 off,
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        //실패했을 때, 로딩 스피너 off, 에러 메시지
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
