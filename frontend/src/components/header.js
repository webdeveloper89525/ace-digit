import { Grid, Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, logout } from "store/auth-reducer";
import { _getAccount } from "store/selectors";

const Header = () => {
  const dispatch = useDispatch();

  const account = _getAccount();

  const handleLogin = () => {
    dispatch(
      login({
        name: "John",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Grid
        item
        xs={"auto"}
        sx={{ mr: "auto" }}
      />
      <Grid
        item
        sx={{ width: "fit-content" }}
      >
        {!account ? (
          <Button
            variant="text"
            color="inherit"
            sx={{ width: "fit-content", textTransform: "capitalize" }}
            onClick={handleLogin}
          >
            <Typography variant="body2">Log in</Typography>
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end" }}>
            <Typography
              variant="body2"
              sx={{ px: 1 }}
            >
              Welcome, {account.name}
            </Typography>
            <Button
              variant="text"
              color="inherit"
              size="small"
              onClick={handleLogout}
              sx={{ width: "fit-content", textTransform: "capitalize" }}
            >
              <Typography variant="body2">Logout</Typography>
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
