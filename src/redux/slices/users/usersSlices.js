import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initalstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  isVerified: false,
  emailMessage: undefined,
  profile: {},
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! --------------- Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/login`,
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Register User Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/register`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Get User Public Profile Action
export const userPublicProfileAction = createAsyncThunk(
  "users/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/public-profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Get User Private Profile Action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/user-profile`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Block User Action
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/block/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- UnBlock User Action
export const unBlockUserAction = createAsyncThunk(
  "users/unblock-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/unblock/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Follow User Action
export const followUserAction = createAsyncThunk(
  "users/follow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/following/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- UnFollow User Action
export const unFollowUserAction = createAsyncThunk(
  "users/unfollow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/unfollowing/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Logout Action
export const logoutAction = createAsyncThunk("users/logut", async () => {
  //remove the token from local storage
  localStorage.removeItem("userInfo");
  return true;
});

//! --------------- upload cover image
export const uploadCoverImageAction = createAsyncThunk(
  "users/upload-cover-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      // convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/upload-cover-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- upload profile image
export const uploadProfileImageAction = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      // convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/upload-profile-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Send Account Verification Email
export const sendAccountVerificationEmailAction = createAsyncThunk(
  "users/send-account-verification-email",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/account-verification-email`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Verify Account Action
export const verifyAccountAction = createAsyncThunk(
  "users/account-verified",
  async (verifyToken, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/account-verification/${verifyToken}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Forgot Password Action
export const forgotPasswordAction = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/forgot-password`,
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Reset Password Action
export const resetPasswordAction = createAsyncThunk(
  "users/reset-password",
  async ({ resetToken, password }, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/reset-password/${resetToken}`,
        {
          password,
        }
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Update User Profile Action
export const updateUserProfileAction = createAsyncThunk(
  "users/update-user-profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/users/update-profile`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! Users Slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //? ---------------------------------------
    //! Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Get User Public Profile
    builder.addCase(userPublicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Upload user profile image
    builder.addCase(uploadProfileImageAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(uploadProfileImageAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(uploadProfileImageAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Upload user cover image
    builder.addCase(uploadCoverImageAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(uploadCoverImageAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(uploadCoverImageAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Get User Private Profile
    builder.addCase(userPrivateProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //? ---------------------------------------
    //! Update User Profile
    builder.addCase(updateUserProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(updateUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Send Account Verification Email
    builder.addCase(
      sendAccountVerificationEmailAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    // handle the fulfilled state
    builder.addCase(
      sendAccountVerificationEmailAction.fulfilled,
      (state, action) => {
        state.isEmailSent = true;
        state.success = true;
        state.loading = false;
        state.error = null;
      }
    );
    //* handle the rejection state
    builder.addCase(
      sendAccountVerificationEmailAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    //? ---------------------------------------
    //! Verify Account
    builder.addCase(verifyAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(verifyAccountAction.fulfilled, (state, action) => {
      state.isVerified = true;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Block User Profile
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Forgot Password
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Reset Password
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! UnBlock User Profile
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Follow User
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! UnFollow User
    builder.addCase(unFollowUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //? ---------------------------------------
    //! Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //! reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
    //! reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! Generate Reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
