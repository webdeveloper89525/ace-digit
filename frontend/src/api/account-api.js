import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-api";

// Api
const tagTypes = {
  Accounts: "Accounts",
};

export const AccountApi = createApi({
  reducerPath: "account-api",
  baseQuery: baseQuery,
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
