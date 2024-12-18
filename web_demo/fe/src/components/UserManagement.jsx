import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  IconButton,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaUserPlus, FaEdit } from "react-icons/fa";

const UserManagement = ({}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "",
    systemAccess: "",
    deviceType: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const steps = ["Basic Information", "Department & Role", "System Settings"];

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

  const columns = [
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

  const renderUserInfo = () => {
    if (!selectedUser)
      return <Typography>Please select a user from the table</Typography>;

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">User Information</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>
            <strong>Department:</strong> {selectedUser.department}
          </Typography>
          <Typography>
            <strong>Role:</strong> {selectedUser.role}
          </Typography>
          <Typography>
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
          <Typography>
            <strong>Status:</strong> {selectedUser.status}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderSystemInfo = () => {
    if (!selectedUser)
      return <Typography>Please select a user from the table</Typography>;

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">System Information</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>
            <strong>System Access:</strong> {selectedUser.systemAccess}
          </Typography>
          <Typography>
            <strong>Last Login:</strong> {selectedUser.lastLogin}
          </Typography>
          <Typography>
            <strong>Device Type:</strong> {selectedUser.deviceType}
          </Typography>
        </Box>
      </Box>
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

  const handleRowClick = (params) => {
    setSelectedUser(params.row);
  };

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

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
      <Paper elevation={3} sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          rows={mockUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
      {selectedTab === 0 ? renderUserInfo() : renderSystemInfo()}

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
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
      </Dialog>
    </Box>
  );
};

export default UserManagement;
