import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-api";

// Api
const tagTypes = {
  Lists: "Lists",
};

export const DashboardApi = createApi({
  reducerPath: "dashboard-api",
  baseQuery: baseQuery,
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // List APIs
    getList: builder.mutation({
      query: ({ params }) => ({
        url: `/chart`,
        method: "GET",
        params: params,
      }),
      invalidatesTags: [tagTypes.Lists],
    }),
  }),
});
