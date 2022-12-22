import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "config";

export const baseQuery = fetchBaseQuery({
  baseUrl: apiConfig.url,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.account?.token;

    if (token) {
      headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});
