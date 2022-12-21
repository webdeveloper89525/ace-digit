import { PinballApi } from "./pinball-api";

const Api = {
    ...PinballApi,

    reducers: {
        [PinballApi.reducerPath]: PinballApi.reducer,
    },
    middlewares: [PinballApi.middleware],
};

export default Api;
