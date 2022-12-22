import { useSelector } from "react-redux";

export const _getSettings = () => useSelector((state) => state.settings);
export const _getAccount = () => useSelector((state) => state.auth.account);
export const _getChartList = () => useSelector((state) => state.app.chartList);
