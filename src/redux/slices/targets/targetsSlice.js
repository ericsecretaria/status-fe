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
  targets: [],
  target: null,
  success: false,
};

//! --------------- Create target
export const createTargetAction = createAsyncThunk(
  "targets/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      // convert the payload to formdata
      const formData = new FormData();
      formData.append("renter", payload?.renter);
      formData.append("rentAmount", payload?.rentAmount);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/targets/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  delete target
export const deleteTargetAction = createAsyncThunk(
  "targets/delete-target",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/targets/${postId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//**************! ----------- Targets Slices -----------  *************
const targetSlice = createSlice({
  name: "targets",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //!  create target -------------------------------------

    builder.addCase(createTargetAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(createTargetAction.fulfilled, (state, action) => {
      state.targets = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    //* handle the rejection state
    builder.addCase(createTargetAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //!  delete target -------------------------------------
    builder.addCase(deleteTargetAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(deleteTargetAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(deleteTargetAction.rejected, (state, action) => {
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
const targetReducer = targetSlice.reducer;

export default targetReducer;
