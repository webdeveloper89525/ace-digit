import { Grid, Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
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
        {!isLogged ? (
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
              Welcome, XXX
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
