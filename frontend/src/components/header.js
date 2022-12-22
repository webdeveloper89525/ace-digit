import { Grid, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "store/auth-reducer";
import { _getAccount } from "store/selectors";
import { LoginDialog } from "./login-dialog";
import { SignupDialog } from "./signup-dialog";

const Header = () => {
  const dispatch = useDispatch();

  const account = _getAccount();

  const [login, setLogin] = useState(null);

  const handleLogin = () => {
    setLogin("login");
  };

  const handleSignUp = () => {
    setLogin("signup");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCloseLogin = () => {
    setLogin(null);
  };

  const handleCloseSignup = () => {
    setLogin(null);
  };

  return (
    <>
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
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Button
                variant="text"
                color="inherit"
                sx={{ width: "fit-content", textTransform: "capitalize" }}
                onClick={handleLogin}
              >
                <Typography variant="body2">Log in</Typography>
              </Button>
              <Typography variant="body2">/</Typography>
              <Button
                variant="text"
                color="inherit"
                sx={{ width: "fit-content", textTransform: "capitalize" }}
                onClick={handleSignUp}
              >
                <Typography variant="body2">Sign up</Typography>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end" }}
            >
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
      <LoginDialog
        open={login === "login"}
        onClose={handleCloseLogin}
      />
      <SignupDialog
        open={login === "signup"}
        onClose={handleCloseSignup}
      />
    </>
  );
};

export default Header;
