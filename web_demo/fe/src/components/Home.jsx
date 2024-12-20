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
  Button,
} from "@mui/material";

import { FaUsers, FaUserTag, FaUserCog } from "react-icons/fa";
import Main from "./main";
import Header from "./Header";
import UserManagement from "./UserManagement";
import RolesManagement from "./RolesManagement";
import ProfilesManagement from "./ProfilesManagement";

import logo from "../static/images/Oracle-Symbol.png";
import { IoBookmark, IoLogOut } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { HiMiniCheckBadge } from "react-icons/hi2";
import PrivilegeManagement from "./privilegeManagement";

const drawerWidth = 300;

const Home = ({ setLogin }) => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("users");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Users", icon: <FaUsers />, value: "users" },
    { text: "Roles", icon: <IoBookmark />, value: "roles" },
    { text: "Profiles", icon: <ImProfile />, value: "profiles" },
    { text: "Privilege", icon: <HiMiniCheckBadge />, value: "privilege" },
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
      case "privilege":
        return <PrivilegeManagement />;

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
        sx={{ paddingBottom: "12px" }}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "16px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 16px", // Khoảng cách trong Toolbar
            height: "100px",
            marginBottom: "24px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "180px",
              height: "auto",
            }}
          />
        </Toolbar>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.value}
              onClick={() => handleMenuSelect(item.value)}
              selected={selectedMenu === item.value}
              sx={{
                borderRadius: "4px",
                mb: 1,
                bgcolor:
                  selectedMenu === item.value ? "primary.main" : "transparent",
                color: selectedMenu === item.value ? "white" : "text.primary",
                boxShadow:
                  selectedMenu === item.value
                    ? "0px 4px 10px rgba(0,0,0,0.2)"
                    : "none",
                "&:hover": {
                  bgcolor: "primary.light", // Màu nền khi hover
                  color: "primary.contrastText",
                },
                transition: "all 0.3s ease", // Hiệu ứng chuyển động
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                  color: selectedMenu === item.value ? "white" : "primary.main",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedMenu === item.value ? "bold" : "normal",
                  fontSize: "1rem",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            position: "absolute ",
            bottom: 32, // Cách đáy 16px
            width: "80%", // Chiếm toàn bộ chiều ngang Drawer
            px: 2,
          }}
        >
          <Button
            variant="contained"
            // color="secondary"
            fullWidth
            startIcon={<IoLogOut />} 
            onClick={() => {
              setLogin(false);
            }}
            sx={{
              fontWeight: "bold",
              fontSize: "1rem", 
              textTransform: "none",
              py: 1.5, 
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Main open={open}>
        <Toolbar />
        <Container maxWidth="lg">{renderContent()}</Container>
      </Main>
    </Box>
  );
};

export default Home;
