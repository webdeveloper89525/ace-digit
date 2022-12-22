import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiConfig } from "../config";

// Api
const tagTypes = {
  Lists: "Lists",
};

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.url,
  }),
  tagTypes: [...Object.values(tagTypes)],
  endpoints: (builder) => ({
    // List APIs
    getList: builder.mutation({
      query: ({ params }) => ({
        url: `/api/v1/locations/closest_by_lat_lon.json`,
        method: "GET",
        params: params,
      }),
      invalidatesTags: [tagTypes.Lists],
    }),
  }),
});
