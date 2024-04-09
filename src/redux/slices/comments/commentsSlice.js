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
  comments: [],
  comment: null,
  success: false,
};

//! --------------- Create Comment
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/comments/${payload?.postId}`,
        {
          message: payload?.message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//**************! ----------- Comments Slices -----------  *************
const commentSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //create comment
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    //* handle the rejection state
    builder.addCase(createCommentAction.rejected, (state, action) => {
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
const commentReducer = commentSlice.reducer;

export default commentReducer;
