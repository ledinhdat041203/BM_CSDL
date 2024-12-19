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
import { findAllUser } from "../API/userApi copy";
import UserFormDialog from "./UserDialog";

const UserManagement = ({}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userForm, setUserForm] = useState({
    userId: "",
    fullName: "",
    phone: "",
    email: "",
    userName: "",
    pass: "",
    quota: "",
    profile: "",
    role: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@oracle.com",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      department: "Engineering",
      role: "Developer",
      systemAccess: "Full",
      lastLogin: "2023-10-15",
      deviceType: "Desktop",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@oracle.com",
      status: "Inactive",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      department: "Marketing",
      role: "Manager",
      systemAccess: "Limited",
      lastLogin: "2023-10-14",
      deviceType: "Mobile",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@oracle.com",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      department: "Sales",
      role: "Executive",
      systemAccess: "Full",
      lastLogin: "2023-10-13",
      deviceType: "Laptop",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@oracle.com",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      department: "HR",
      role: "Admin",
      systemAccess: "Full",
      lastLogin: "2023-10-12",
      deviceType: "Desktop",
    },
  ];

  const userInfoColumns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <FaEdit />
        </IconButton>
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
        rows={mockUsers}
        columns={userInfoColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
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
    console.log("delete");
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setUserForm(user);
    setDialogOpen(true);
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setUserForm({
      name: "",
      email: "",
      department: "",
      role: "",
      status: "",
      systemAccess: "",
      deviceType: "",
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

  const handleSave = () => {
    console.log("Saved User:", userForm);
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

  useEffect(() => {
    if (selectedTab === 1) {
      fetchUses();
    }
  }, [selectedTab]);
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

      {/* <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog> */}

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
