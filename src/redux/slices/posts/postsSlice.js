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
  posts: [],
  post: null,
  success: false,
};

//! ---------------  fetch public posts
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.get(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/posts/public`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  fetch private posts
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
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
        `${BASE_URL}/posts`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  fetch single posts
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.get(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/posts/${postId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  delete post
export const deletePostAction = createAsyncThunk(
  "posts/delete-post",
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
        `${BASE_URL}/posts/${postId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  post view count
export const postViewCountAction = createAsyncThunk(
  "posts/post-views",
  async (postId, { rejectWithValue, getState, dispatch }) => {
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
        `${BASE_URL}/posts/${postId}/post-view-count`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  like post
export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
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
        `${BASE_URL}/posts/likes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  dislike post
export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
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
        `${BASE_URL}/posts/dislikes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! ---------------  clap post
export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
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
        `${BASE_URL}/posts/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Create Posts
export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      // convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("released", payload?.released);
      formData.append("targetAmount", payload?.targetAmount);
      formData.append("trackMonth", payload?.trackMonth);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/posts`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//! --------------- Update Post
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      // convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("released", payload?.released);
      formData.append("targetAmount", payload?.targetAmount);
      formData.append("trackMonth", payload?.trackMonth);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        // can be response.data but destructured it into {data}
        `${BASE_URL}/posts/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//**************! ----------- Posts Slices -----------  *************
const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //!  fetch public posts -------------------------------------
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  fetch private posts -------------------------------------
    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  create posts -------------------------------------
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  update posts -------------------------------------
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  get single post -------------------------------------
    builder.addCase(getPostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  like post -------------------------------------
    builder.addCase(likePostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  dislike post -------------------------------------
    builder.addCase(dislikePostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  post view -------------------------------------
    builder.addCase(postViewCountAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(postViewCountAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(postViewCountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  clap post -------------------------------------
    builder.addCase(clapPostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!  delete post -------------------------------------
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection state
    builder.addCase(deletePostAction.rejected, (state, action) => {
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
const postsReducer = postSlice.reducer;

export default postsReducer;
