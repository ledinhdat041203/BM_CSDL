import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { findAllProfileName } from "../API/profileApi";
import { findAllRoleName } from "../API/roleApi";
import { findAllTableSpace } from "../API/userApi";

const UserFormDialog = ({
  dialogOpen,
  handleClose,
  isEditing,
  activeStep,
  setActiveStep,
  userForm,
  setUserForm,
  handleNext,
  handleBack,
  handleSave,
}) => {
  const steps = ["Account info", "Profile & Role"];
  const [defaultTablespaces, setDefaultTablespaces] = useState([]);
  const [tempTablespaces, setTempTablespaces] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchProfileName = async () => {
    try {
      const response = await findAllProfileName();
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchRoleName = async () => {
    try {
      const response = await findAllRoleName();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchTableSpace = async () => {
    try {
      const response = await findAllTableSpace();
      setDefaultTablespaces(response.data.defaultTablespace);
      setTempTablespaces(response.data.tempTablespace);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 99:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="User ID"
              value={userForm.userId}
              onChange={(e) =>
                setUserForm({ ...userForm, userId: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Full Name"
              value={userForm.fullName}
              onChange={(e) =>
                setUserForm({ ...userForm, fullName: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={userForm.phone}
              onChange={(e) =>
                setUserForm({ ...userForm, phone: e.target.value })
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
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            {/* Nhập User Name */}
            <TextField
              fullWidth
              label="User Name"
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            {/* Nhập Password */}
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={userForm.pass}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            {/* Nhập Quota */}
            <TextField
              fullWidth
              label="Quota (MB)"
              type="number"
              value={userForm.quota}
              onChange={(e) =>
                setUserForm({ ...userForm, quota: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            {/* Default Tablespace */}
            <Autocomplete
              options={defaultTablespaces} // Danh sách lấy từ API
              value={userForm.defaultTablespace}
              onChange={(event, newValue) =>
                setUserForm({ ...userForm, defaultTablespace: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Default Tablespace" fullWidth />
              )}
              sx={{ mb: 2 }}
            />

            {/* Temporary Tablespace */}
            <Autocomplete
              options={tempTablespaces} // Danh sách lấy từ API
              value={userForm.tempTablespace}
              onChange={(event, newValue) =>
                setUserForm({ ...userForm, tempTablespace: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Temporary Tablespace" fullWidth />
              )}
              sx={{ mb: 2 }}
            />
            {/* Account Status */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={userForm.accountStatus === "UNLOCK"}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      accountStatus: e.target.checked ? "UNLOCK" : "LOCK",
                    })
                  }
                />
              }
              label="Account Active"
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            {/* Select Profile */}
            <Autocomplete
              options={profiles}
              value={userForm.profile}
              onChange={(event, newValue) =>
                setUserForm({ ...userForm, profile: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Profile" fullWidth />
              )}
              sx={{ mb: 2 }}
            />

            {/* Select Role */}
            <Autocomplete
              options={roles} // Danh sách lấy từ API
              value={userForm.role}
              onChange={(event, newValue) =>
                setUserForm({ ...userForm, role: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Role" fullWidth />
              )}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // if (steps == 2) {
    fetchProfileName();
    fetchRoleName();
    fetchTableSpace();
    // }
  }, []);

  return (
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
  );
};

export default UserFormDialog;
