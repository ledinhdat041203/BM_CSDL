import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Tabs, Typography } from "@mui/material";
import { FaUserPlus } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { findAllRole } from "../API/roleApi";
import { findAllProfile } from "../API/profileApi";

function ProfilesManagement() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const columns = [
    { field: "PROFILE", headerName: "PROFILE", width: 200 },
    { field: "CONNECT_TIME", headerName: "CONNECT_TIME", width: 200 },
    { field: "IDLE_TIME", headerName: "IDLE_TIME", width: 200 },
    { field: "SESSIONS_PER_USER", headerName: "SESSIONS_PER_USER", width: 200 },
  ];

  const handleAddRole = () => {
    console.log("add role");
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await findAllProfile();
      console.log("datttttaa::", response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
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

      <Paper elevation={3} sx={{ height: 500, width: "100%", mb: 2 }}>
        <DataGrid
          rows={profiles}
          getRowId={(row) => row.PROFILE}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[2]}
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

export default ProfilesManagement;
