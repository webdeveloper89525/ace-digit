import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pinballApiConfig } from "../config";

// Api
const tagTypes = {
    ClosetLocations: "ClosetLocations",
};

export const PinballApi = createApi({
    reducerPath: "PinballApi",
    baseQuery: fetchBaseQuery({
        baseUrl: pinballApiConfig.url,
    }),
    tagTypes: [...Object.values(tagTypes)],
    endpoints: (builder) => ({
        // Airport APIs
        getClosetLocations: builder.mutation({
            query: ({ params }) => ({
                url: `/api/v1/locations/closest_by_lat_lon.json`,
                method: "GET",
                params: params,
            }),
            invalidatesTags: [tagTypes.ClosetLocations],
        }),
    }),
});
