import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Dashboard from "components/dashboard";
import Layout from "components/layout";
import { _getSettings } from "store/selectors";

import { createCustomTheme } from "./theme";

const App = () => {
  const settings = _getSettings();

  const theme = createCustomTheme({
    direction: settings.direction,
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
