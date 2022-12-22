import { Api as ApiItem } from "./api";

const Api = {
  ...ApiItem,

  reducers: {
    [ApiItem.reducerPath]: ApiItem.reducer,
  },
  middlewares: [ApiItem.middleware],
};

export default Api;
