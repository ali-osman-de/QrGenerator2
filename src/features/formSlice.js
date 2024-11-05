import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: "",
  name: "",
  phoneNumber: "",
  phoneType: "",
  job: "",
  email: "",
  emailType: "",
  aboutSelf: "",
  address: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAboutSelf: (state, action) => {
      state.aboutSelf = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPhoneType: (state, action) => {
      state.phoneType = action.payload;
    },
    setEmailType: (state, action) => {
      state.emailType = action.payload;
    },
  },
});

export const {
  setImageUrl,
  setName,
  setPhoneNumber,
  setJob,
  setEmail,
  setAboutSelf,
  setAddress,
  setPhoneType,
  setEmailType,
} = formSlice.actions;
export default formSlice.reducer;
