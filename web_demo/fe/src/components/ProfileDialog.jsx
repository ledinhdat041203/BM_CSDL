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
import { findAllTableSpace } from "../API/userApi copy";

const ProfileFormDialog = ({
  dialogOpen,
  handleClose,
  isEditing,
  activeStep,
  setActiveStep,
  profileForm,
  setProfileForm,
  handleNext,
  handleBack,
  handleSave,
  
}) => {
  const steps = ["New profile", "General", "Password"];
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
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Profile Name"
              value={profileForm.profileName}
              onChange={(e) =>
                setProfileForm({ ...profileForm, profileName: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              freeSolo
              options={["UNLIMITED", "DEFAULT"]}
              value={profileForm.sessionPerUser}
              onChange={(event, newValue) =>
                setProfileForm({ ...profileForm, sessionPerUser: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Session per user"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      sessionPerUser: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Autocomplete
              freeSolo
              options={["UNLIMITED", "DEFAULT"]}
              value={profileForm.connectTime}
              onChange={(event, newValue) =>
                setProfileForm({ ...profileForm, connectTime: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Connect Time"
                  type="text"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      connectTime: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Autocomplete
              freeSolo
              options={["UNLIMITED", "DEFAULT"]}
              value={profileForm.idleTime}
              onChange={(event, newValue) =>
                setProfileForm({ ...profileForm, idleTime: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Idle Time"
                  type="text"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      idleTime: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              freeSolo
              options={["UNLIMITED", "DEFAULT"]}
              value={profileForm.passLife}
              onChange={(event, newValue) =>
                setProfileForm({ ...profileForm, sessionPerUser: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Password life time"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      passLife: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Autocomplete
              freeSolo
              options={["UNLIMITED", "DEFAULT"]}
              value={profileForm.failLogin}
              onChange={(event, newValue) =>
                setProfileForm({ ...profileForm, sessionPerUser: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fail login attempts"
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      failLogin: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
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
      <DialogTitle>
        {isEditing ? "Edit Profile" : "Add New Profile"}
      </DialogTitle>
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

export default ProfileFormDialog;
