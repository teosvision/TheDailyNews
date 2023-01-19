import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:3001";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, order = "asc", limit = "10" }, { getState }) => {
    try {
      const resp = await axios.get(
        `${baseURL}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`
      );
      const prevState = getState().posts;
      console.log({ prevState });
      return {
        items: [...prevState.articles.items, ...resp.data],
        page: page,
        end: resp.data.length === 0 ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostsByid = createAsyncThunk(
  "post/fetchPostsByid",
  async (id) => {
    try {
      const resp = await axios.get(`${baseURL}/posts/${id}`);
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userEmail = createAsyncThunk("users/userEmail", async (data) => {
  try {
    const findUser = await axios.get(
      `${baseURL}/newsletter?email=${data.email}`
    );

    if (!Array.isArray(findUser.data) || !findUser.data.length) {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/newsletter`,
        data: {
          email: data.email,
        },
      });

      return {
        newsletter: "added",
        email: response.data,
      };
    } else {
      return {
        newsletter: "failed",
      };
    }
  } catch (error) {
    throw error;
  }
});
export const sendMessage = createAsyncThunk(
  "posts/sendMessage",
  async (data) => {
    try {
      await axios({
        method: "POST",
        url: `${baseURL}/contact`,
        data: "data",
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
);
