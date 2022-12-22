import { DashboardApi } from "./dashboard-api";
import { AccountApi } from "./account-api";

const Api = {
  ...DashboardApi,
  ...AccountApi,

  reducers: {
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [AccountApi.reducerPath]: AccountApi.reducer,
  },
  middlewares: [DashboardApi.middleware, AccountApi.middleware],
};

export default Api;
