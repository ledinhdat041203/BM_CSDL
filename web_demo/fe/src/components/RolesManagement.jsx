import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Tabs, Typography } from "@mui/material";
import { FaUserPlus } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { findAllRole } from "../API/roleApi";

function RolesManagement() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Role Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  const handleAddRole = () => {
    console.log("add role");
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await findAllRole();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<FaUserPlus />}
          onClick={handleAddRole}
        >
          Add Roles
        </Button>
      </Box>

      <Paper elevation={3} sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
        />
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
    </Box>
  );
}

export default RolesManagement;
