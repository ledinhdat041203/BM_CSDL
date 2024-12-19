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
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const RoleFormDialog = ({
  dialogOpen,
  handleClose,
  isEditing,
  roleForm,
  setRoleForm,
  handleSave,
}) => {
  const [roleName, setRoleName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Edit Role" : "Add New Role"}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Nhập tên role */}
          <TextField
            fullWidth
            label="Role name"
            value={roleForm.roleName}
            onChange={(e) =>
              setRoleForm({ ...roleForm, roleName: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          {/* Nhập mật khẩu */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={roleForm.password || ""}
            onChange={(e) =>
              setRoleForm({ ...roleForm, password: e.target.value })
            }
            sx={{ mb: 2 }}
            disabled={!roleForm.hasPassword} // Vô hiệu hóa nếu checkbox chưa được chọn
          />

          {/* Checkbox để bật/tắt mật khẩu */}
          <FormControlLabel
            control={
              <Checkbox
                checked={roleForm.hasPassword || false}
                onChange={(e) =>
                  setRoleForm({ ...roleForm, hasPassword: e.target.checked })
                }
              />
            }
            label="Set Password"
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleFormDialog;
