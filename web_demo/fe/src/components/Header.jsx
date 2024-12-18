import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { FaBars } from "react-icons/fa";

const Header = ({ open, drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
        ml: open ? `${drawerWidth}px` : 0,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ mr: 2 }}
        >
          <FaBars />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Oracle User Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
