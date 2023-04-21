import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/auth/" }),
    endpoints: (builder) => ({
        signup: builder.mutation<
            { message: String },
            {
                username: String;
                nickname: String;
                email: String;
                password: String;
            }
        >({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                body: data,
            }),
        }),
        signin: builder.mutation<
            { message: String },
            { email: String; password: String }
        >({
            query: (data) => ({
                url: "/signin",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
