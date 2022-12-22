import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "../config";

// Api
const tagTypes = {
  Accounts: "Accounts",
};

export const AccountApi = createApi({
  reducerPath: "account-api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.url,
  }),
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // login APIs
    login: builder.mutation({
      query: ({ payload }) => ({
        url: `/login`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.Accounts],
    }),
    // signup APIs
    signup: builder.mutation({
      query: ({ payload }) => ({
        url: `/register`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.Accounts],
    }),
  }),
});
