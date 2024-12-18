import React, { Profiler, useState } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
} from "@mui/material";

import { FaUsers, FaUserTag, FaUserCog } from "react-icons/fa";
import Main from "./main";
import Header from "./Header";
import UserManagement from "./UserManagement";
import RolesManagement from "./RolesManagement";
import ProfilesManagement from "./ProfilesManagement";

const drawerWidth = 260;

const Home = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("users");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Users", icon: <FaUsers />, value: "users" },
    { text: "Roles", icon: <FaUserTag />, value: "roles" },
    { text: "Profiles", icon: <FaUserCog />, value: "profiles" },
  ];

  const handleMenuSelect = (value) => {
    setSelectedMenu(value);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "users":
        return <UserManagement />;
      case "roles":
        return <RolesManagement />;
      case "profiles":
        return <ProfilesManagement />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.value}
              onClick={() => handleMenuSelect(item.value)}
              selected={selectedMenu === item.value}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
        <Toolbar />
        <Container maxWidth="lg">{renderContent()}</Container>
      </Main>
    </Box>
  );
};

export default Home;
