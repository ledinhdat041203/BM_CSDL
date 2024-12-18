import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RolesManagement from "./RolesManagement";
import ProfilesManagement from "./ProfilesManagement";
import UserManagement from "./Screnn";

function ManagementPanel() {
  const [selectedMenu, setSelectedMenu] = useState("users");

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
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Management Panel
      </Typography>
      {renderContent()}
    </Box>
  );
}

export default ManagementPanel;
