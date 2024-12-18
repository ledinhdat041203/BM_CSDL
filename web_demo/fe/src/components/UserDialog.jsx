import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Typography } from "@mui/material";

const steps = ["Step 1", "Step 2", "Step 3"];

function UserDialog({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleSave = () => {
    console.log("User saved");
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <h1>Step 1: Enter User Details</h1>;
      case 1:
        return <h1>Step 2: Assign Roles</h1>;
      case 2:
        return <h1>Step 3: Review and Confirm</h1>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add or Edit User</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
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
}

export default UserDialog;
