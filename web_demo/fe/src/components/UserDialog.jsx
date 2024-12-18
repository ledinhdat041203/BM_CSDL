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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaUserPlus } from "react-icons/fa";

const UserManagement = ({
  mockUsers,
  columns,
  steps,
  renderStepContent,
  renderUserInfo,
  renderSystemInfo,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({});
  const [activeStep, setActiveStep] = useState(0);

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

  const handleRowClick = (params) => {
    console.log("Row clicked:", params.row);
    handleEdit(params.row);
  };

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
          onRowClick={handleRowClick}
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
