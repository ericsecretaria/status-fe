import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import postsReducer from "../slices/posts/postsSlice";
import commentReducer from "../slices/comments/commentsSlice";
import targetReducer from "../slices/targets/targetsSlice";

//! Store

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentReducer,
    targets: targetReducer,
  },
});

export default store;
