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
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaUserPlus, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  createUserAPI,
  deleteUserAPI,
  findAllUser,
  findAllUserInfoAPI,
  updateUserAPI,
} from "../API/userApi";
import UserFormDialog from "./UserDialog";
import { toast } from "react-toastify";

const UserManagement = ({}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    defaultTablespace: "",
    tempTablespace: "",
    quota: "",
    profile: "",
    role: "",
    accountStatus: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);

  const userInfoColumns = [
    { field: "userId", headerName: "userId", width: 100 },
    { field: "userName", headerName: "usserName", width: 150 },
    { field: "fullName", headerName: "fullName", width: 150 },
    { field: "email", headerName: "email", width: 200 },
    { field: "phoneNumber", headerName: "phoneNumber", width: 150 },
    {
      field: "ACTION",
      headerName: "ACTION",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            width: "%",
          }}
        >
          <IconButton
            onClick={() => handleEdit(params.row)}
            sx={{ color: "#1976D2" }}
          >
            <FaEdit />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(params.row)}
            sx={{ color: "#F44336" }}
          >
            <RiDeleteBin6Line />
          </IconButton>
        </Box>
      ),
    },
  ];

  const sysInfoColumns = [
    { field: "USERNAME", headerName: "USERNAME", width: 100 },
    { field: "ACCOUNT_STATUS", headerName: "ACCOUNT_STATUS", width: 200 },
    { field: "LOCK_DATE", headerName: "LOCK_DATE", width: 250 },
    { field: "CREATED", headerName: "CREATED", width: 150 },
    {
      field: "TEMPORARY_TABLESPACE",
      headerName: "TEMPORARY_TABLESPACE",
      width: 150,
    },
    {
      field: "DEFAULT_TABLESPACE",
      headerName: "DEFAULT_TABLESPACE",
      width: 150,
    },
    { field: "PROFILE", headerName: "PROFILE", width: 150 },
    {
      field: "ACTION",
      headerName: "ACTION",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => handleEdit(params.row)}
            sx={{ color: "#1976D2" }}
          >
            <FaEdit />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(params.row)}
            sx={{ color: "#F44336" }}
          >
            <RiDeleteBin6Line />
          </IconButton>
        </Box>
      ),
    },
  ];

  const renderUserInfo = () => {
    return (
      <DataGrid
        rows={usersInfo}
        getRowId={(row) => row.userId}
        columns={userInfoColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        checkboxSelection
        disableSelectionOnClick
      />
    );
  };

  const renderSystemInfo = () => {
    return (
      <DataGrid
        rows={users}
        getRowId={(row) => row.USERNAME}
        columns={sysInfoColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    );
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={userForm.name}
              onChange={(e) =>
                setUserForm({ ...userForm, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={userForm.department}
                label="Department"
                onChange={(e) =>
                  setUserForm({ ...userForm, department: e.target.value })
                }
              >
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={userForm.role}
                label="Role"
                onChange={(e) =>
                  setUserForm({ ...userForm, role: e.target.value })
                }
              >
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Executive">Executive</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={userForm.status}
                label="Status"
                onChange={(e) =>
                  setUserForm({ ...userForm, status: e.target.value })
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>System Access</InputLabel>
              <Select
                value={userForm.systemAccess}
                label="System Access"
                onChange={(e) =>
                  setUserForm({ ...userForm, systemAccess: e.target.value })
                }
              >
                <MenuItem value="Full">Full</MenuItem>
                <MenuItem value="Limited">Limited</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Device Type</InputLabel>
              <Select
                value={userForm.deviceType}
                label="Device Type"
                onChange={(e) =>
                  setUserForm({ ...userForm, deviceType: e.target.value })
                }
              >
                <MenuItem value="Desktop">Desktop</MenuItem>
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Mobile">Mobile</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  const handleDelete = (selectedProfile) => {
    console.log("delete", selectedProfile.USERNAME);
    deleteUser(selectedProfile.USERNAME);
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setUserForm({
      username: user.USERNAME,
      defaultTablespace: user.DEFAULT_TABLESPACE,
      tempTablespace: user.TEMPORARY_TABLESPACE,
      accountStatus: user.ACCOUNT_STATUS == "OPEN" ? "UNLOCK" : "LOCK",
      profile: user.PROFILE,
      quota: 5,
    });
    setDialogOpen(true);
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setUserForm({
      username: "",
      password: "",
      defaultTablespace: "",
      tempTablespace: "",
      quota: "50",
      profile: "",
      role: "",
      accountStatus: "LOCK",
    });
    setDialogOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setActiveStep(0);
  };

  const handleSave = async () => {
    console.log("Saved user:", userForm);

    if (isEditing) {
      await updateUser();
    } else {
      await createUser();
    }
    fetchUses();
    handleClose();
  };

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  const fetchUses = async () => {
    try {
      const response = await findAllUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchUsesInfo = async () => {
    try {
      const response = await findAllUserInfoAPI();
      setUsersInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const deleteUser = async (userName) => {
    let response;
    try {
      response = await deleteUserAPI(userName);
      console.log("response", response);

      setUsers((prevUser) =>
        prevUser.filter((user) => user.USERNAME !== userName)
      );

      toast.success(response?.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log("err:", error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  const createUser = async () => {
    let response;
    try {
      console.log("user info::", userForm);
      response = await createUserAPI(userForm);

      toast.success(response.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log("err:", error);
      toast.error(error?.response.data.message, {
        position: "top-right",
      });
    }
  };

  const updateUser = async () => {
    let response;
    try {
      console.log("user info::", userForm);
      response = await updateUserAPI(userForm);

      toast.success(response.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log("err:", error);
      toast.error(error?.response.data.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchUses();
    fetchUsesInfo();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<FaUserPlus />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="User Info" />
          <Tab label="System Info" />
        </Tabs>
      </Paper>

      <Paper
        elevation={3}
        sx={{ height: 400, width: "100%", mb: 2, maxWidth: "1600px" }}
      >
        {selectedTab === 0 ? renderUserInfo() : renderSystemInfo()}
      </Paper>

      <UserFormDialog
        dialogOpen={dialogOpen}
        handleClose={handleClose}
        isEditing={isEditing}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        userForm={userForm}
        setUserForm={setUserForm}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default UserManagement;
