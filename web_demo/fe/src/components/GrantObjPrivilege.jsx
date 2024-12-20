import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { findAllUserNameAPI } from "../API/userApi";

import { findRoleNameAPI } from "../API/roleApi";
import {
  grantObjPermissionAPI,
  grantSysPermissionAPI,
} from "../API/permissionAPI";
import { toast } from "react-toastify";

function GrantObjPrivilege() {
  const [objectType, setObjectType] = useState("");
  const [selectedObject, setSelectedObject] = useState("");
  const [privileges, setPrivileges] = useState([]);
  const [grantOption, setGrantOption] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const tableOptions = [
    "MANAGERDB.DEPARTMENTS",
    "MANAGERDB.USER_INFO",
    "MANAGERDB.EMPLOYEES",
    "MANAGERDB.SALARIES",
  ];
  const privilegeOptions = ["SELECT", "UPDATE", "DELETE"];

  const fetchUserName = async () => {
    try {
      const response = await findAllUserNameAPI();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchRoleName = async () => {
    try {
      const response = await findRoleNameAPI();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const grantSysPermission = async () => {
    const permission = privileges.join(", ");
    let response;
    try {
      response = await grantObjPermissionAPI({
        name: selectedObject,
        table: selectedTable,
        permission,
        grantOption,
      });

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

  const handleSubmit = () => {
    grantSysPermission();
  };
  useEffect(() => {
    fetchUserName();
    fetchRoleName();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
        Grant Object Privilege
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Grant To</InputLabel>
        <Select
          value={objectType}
          onChange={(e) => {
            setObjectType(e.target.value);
            setSelectedObject("");
          }}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="role">Role</MenuItem>
        </Select>
      </FormControl>

      {objectType && (
        <Autocomplete
          options={objectType === "user" ? users : roles}
          onChange={(event, newValue) => setSelectedObject(newValue)}
          value={selectedObject}
          renderInput={(params) => (
            <TextField
              {...params}
              label={objectType === "user" ? "Select User" : "Select Role"}
              placeholder={`Choose a ${objectType}`}
            />
          )}
        />
      )}

      <Autocomplete
        options={tableOptions}
        onChange={(event, newValue) => setSelectedTable(newValue)}
        value={selectedTable}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Table"
            placeholder="Choose a Table"
          />
        )}
      />

      {/* Chọn quyền */}
      <Box>
        <Autocomplete
          multiple
          options={privilegeOptions}
          disableCloseOnSelect
          value={privileges}
          onChange={(event, newValue) => setPrivileges(newValue)}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Privileges" placeholder="Select..." />
          )}
        />
      </Box>

      {/* Checkbox Grant Option */}
      <FormControlLabel
        control={
          <Checkbox
            checked={grantOption}
            onChange={(e) => setGrantOption(e.target.checked)}
          />
        }
        label="Grant Option"
      />

      {/* Nút Submit */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!objectType || !selectedObject || privileges.length === 0}
      >
        Grant Privileges
      </Button>
    </Box>
  );
}

export default GrantObjPrivilege;
