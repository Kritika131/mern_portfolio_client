import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Persist to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setLogin, setLogout, updateUser } = userSlice.actions;
export default userSlice.reducer;
