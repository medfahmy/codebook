import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts'
    })
  })
});

export interface User {
  id: number;
  username: string;
  password: string;
}

interface Credentials {
  username: string;
  password: string;
}

const { actions, reducer } = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    register(state, action: PayloadAction<Credentials>) {},
  },
});

export const { register } = actions;

export const userReducer = reducer;
