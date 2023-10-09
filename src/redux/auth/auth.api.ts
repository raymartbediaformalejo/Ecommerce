import { nanoid } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import { TLogin, TLoginResponse, TUserResponse, TRegister } from "./auth.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TLoginResponse, TLogin>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: build.mutation<TUserResponse, TRegister>({
      query: (user) => ({
        url: "/users/add",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: TUserResponse) => ({
        ...response,
        token: nanoid(),
      }),
    }),

    getUser: build.query<TUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authApi;
