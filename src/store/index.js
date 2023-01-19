import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./reducers/Posts";
import UsersReducer from "./reducers/Users";
export const store = configureStore({
  reducer: { posts: PostsReducer, users: UsersReducer },
});
