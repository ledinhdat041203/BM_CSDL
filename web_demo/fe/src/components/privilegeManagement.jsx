import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaUserPlus, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  createUserAPI,
  deleteUserAPI,
  findAllUser,
  updateUserAPI,
} from "../API/userApi";
import UserFormDialog from "./UserDialog";
import { toast } from "react-toastify";
import GrantSystemPrivilege from "./GrantSystemPrivilege";
import GrantObjObjPrivilege from "./GrantObjPrivilege";
import GrantObjPrivilege from "./GrantObjPrivilege";
import GrantRole from "./GrantRole";

const PrivilegeManagement = ({}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <GrantSystemPrivilege />;
      case 1:
        return <GrantObjPrivilege />;
      case 2:
        return <GrantRole />;
      case 3:
        return (
          <Typography variant="h6">Revoke System Privilege Content</Typography>
        );
      case 4:
        return (
          <Typography variant="h6">Revoke Object Privilege Content</Typography>
        );
      case 5:
        return <Typography variant="h6">Revoke Role Content</Typography>;
      default:
        return (
          <Typography variant="h6">Select a tab to view content</Typography>
        );
    }
  };

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Grant system privilege" />
          <Tab label="Grant object privilege" />
          <Tab label="Grant Role" />
          <Tab label="Revoke system privilege" />
          <Tab label="Revoke object privilege" />
          <Tab label="Revoke Role" />
        </Tabs>
      </Paper>

      <Paper
        elevation={3}
        sx={{ height: 550, width: "100%", mb: 2, maxWidth: "1600px" }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
};

export default PrivilegeManagement;
