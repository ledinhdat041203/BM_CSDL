import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  createRoleAPI,
  deleteRoleAPI,
  findAllRole,
  findAllRoleAndUser,
  updateRoleAPI,
} from "../API/roleApi";
import { IoMdAddCircle } from "react-icons/io";
import {
  findAllObjPermissionOfRoleAPI,
  findAllSysPermissionOfRoleAPI,
  findMyRoleAPI,
} from "../API/permissionAPI";
import RoleFormDialog from "./roleDialog";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateProfileAPI } from "../API/profileApi";

function RolesManagement() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [roleUser, setRoleUser] = useState([]);
  const [roleSysPrivis, setRoleSysPrivis] = useState([]);
  const [roleObjPrivis, setRoleObjPrivis] = useState([]);
  const [myRoles, setMyRoles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [roleForm, setRoleForm] = useState({
    roleName: "",
    password: "",
  });

  const RoleInfoColumns = [
    { field: "ROLE", headerName: "ROLE", width: 200 },
    { field: "PASSWORD_REQUIRED", headerName: "PASSWORD_REQUIRED", width: 200 },
    { field: "AUTHENCATION_TYPE", headerName: "AUTHENCATION_TYPE", width: 300 },
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
            width: "%",
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

  const RoleUserColumns = [
    { field: "id", headerName: "id", width: 20 },
    { field: "GRANTEE", headerName: "GRANTEE", width: 200 },
    { field: "GRANTED_ROLE", headerName: "GRANTED_ROLE", width: 200 },
    { field: "ADMIN_OPTION", headerName: "ADMIN_OPTION", width: 300 },
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
            width: "%",
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

  const RoleSysPrivisColumns = [
    { field: "id", headerName: "id", width: 20 },
    { field: "ROLE", headerName: "ROLE", width: 200 },
    { field: "PRIVILEGE", headerName: "PRIVILEGE", width: 200 },
    { field: "ADMIN_OPTION", headerName: "ADMIN_OPTION", width: 300 },
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
            width: "%",
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

  const RoleObjPrivisColumns = [
    { field: "id", headerName: "id", width: 20 },
    { field: "ROLE", headerName: "ROLE", width: 200 },
    { field: "OWNER", headerName: "OWNER", width: 100 },
    { field: "TABLE_NAME", headerName: "TABLE_NAME", width: 250 },
    { field: "PRIVILEGE", headerName: "PRIVILEGE", width: 150 },
    { field: "GRANTABLE", headerName: "GRANTABLE", width: 140 },
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
            width: "%",
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

  const MyRoleColumns = [
    { field: "id", headerName: "id", width: 20 },
    { field: "USERNAME", headerName: "USERNAME", width: 200 },
    { field: "GRANTED_ROLE", headerName: "GRANTED_ROLE", width: 200 },
    { field: "ADMIN_OPTION", headerName: "ADMIN_OPTION", width: 300 },
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
            width: "%",
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

  const handleEdit = (role) => {
    setIsEditing(true);
    setRoleForm({ roleName: role.ROLE, password: null });
    setDialogOpen(true);
  };

  const handleDelete = (selectedRole) => {
    console.log("delete", selectedRole.ROLE);
    if (selectedTab === 0) deleteRole(selectedRole.ROLE);
    else if (selectedTab === 4) deleteRole(selectedRole.GRANTED_ROLE);
  };

  const handleAddRole = () => {
    console.log("add role");
    setIsEditing(false);
    setRoleForm({
      roleName: "",
      password: null,
    });
    setDialogOpen(true);
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await findAllRole();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleUser = async () => {
    try {
      setLoading(true);
      const response = await findAllRoleAndUser();
      const data = response.data;
      const listRole = data.map((role, index) => ({
        ...role,
        id: index + 1,
      }));

      setRoleUser(listRole);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRoleInfo = () => {
    return (
      <DataGrid
        rows={roles}
        getRowId={(row) => row.ROLE}
        columns={RoleInfoColumns}
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
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
      />
    );
  };

  const fetchRoleSysPrivis = async () => {
    try {
      setLoading(true);
      const response = await findAllSysPermissionOfRoleAPI();
      setRoleSysPrivis(response);
      console.log("sys:::", response);

      const data = response.data;
      const listRole = data.map((role, index) => ({
        ...role,
        id: index + 1,
      }));

      setRoleSysPrivis(listRole);

      console.log("sys:::", listRole);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleObjPrivis = async () => {
    try {
      setLoading(true);
      const response = await findAllObjPermissionOfRoleAPI();
      console.log("sys:::", response);

      const data = response.data;
      const listRole = data.map((role, index) => ({
        ...role,
        id: index + 1,
      }));

      setRoleObjPrivis(listRole);

      console.log("sys:::", listRole);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRole = async () => {
    try {
      setLoading(true);
      const response = await findMyRoleAPI();
      console.log("sys:::", response);

      const data = response.data;
      const listRole = data.map((role, index) => ({
        ...role,
        id: index + 1,
      }));

      setMyRoles(listRole);

      console.log("sys:::", listRole);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRoleUser = () => {
    return (
      <DataGrid
        rows={roleUser}
        getRowId={(row) => row.id}
        columns={RoleUserColumns}
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
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
      />
    );
  };

  const renderRoleSysPrivis = () => {
    return (
      <DataGrid
        rows={roleSysPrivis}
        getRowId={(row) => row.id}
        columns={RoleSysPrivisColumns}
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
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
      />
    );
  };

  const renderRoleObjPrivis = () => {
    return (
      <DataGrid
        rows={roleObjPrivis}
        getRowId={(row) => row.id}
        columns={RoleObjPrivisColumns}
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
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
      />
    );
  };

  const renderMyRole = () => {
    return (
      <DataGrid
        rows={myRoles}
        getRowId={(row) => row.id}
        columns={MyRoleColumns}
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
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
      />
    );
  };

  const fetchData = async () => {
    await fetchRoles();
    await fetchRoleUser();
    await fetchRoleSysPrivis();
    await fetchRoleObjPrivis();
    await fetchMyRole();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const createRole = async () => {
    let response;
    try {
      response = await createRoleAPI(roleForm);
      console.log("response", response);

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

  const updateRole = async () => {
    let response;
    try {
      response = await updateRoleAPI(roleForm);
      console.log("response", response);
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

  const deleteRole = async (roleName) => {
    let response;
    try {
      response = await deleteRoleAPI(roleName);
      console.log("response", response);

      setRoles((prevRoles) =>
        prevRoles.filter((role) => role.ROLE !== roleName)
      );

      setMyRoles((prevRoles) =>
        prevRoles.filter((role) => role.GRANTED_ROLE !== roleName)
      );

      toast.success(response?.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log("err:", error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  const handleSave = async () => {
    console.log("Saved role:", roleForm);
    if (isEditing) {
      await updateRole();
    } else {
      await createRole();
    }
    // fetchProfiles();
    handleClose();
  };

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<IoMdAddCircle />}
          onClick={handleAddRole}
        >
          Add Roles
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Role Info" />
          <Tab label="Role & User" />
          <Tab label="Role System Privileges" />
          <Tab label="Role Object Privileges" />
          <Tab label="My Role" />
        </Tabs>
      </Paper>

      <Paper elevation={3} sx={{ height: 400, width: "100%", mb: 2 }}>
        {selectedTab === 0
          ? renderRoleInfo()
          : selectedTab === 1
          ? renderRoleUser()
          : selectedTab === 2
          ? renderRoleSysPrivis()
          : selectedTab === 3
          ? renderRoleObjPrivis()
          : renderMyRole()}
      </Paper>

      <RoleFormDialog
        dialogOpen={dialogOpen}
        handleClose={handleClose}
        isEditing={isEditing}
        roleForm={roleForm}
        setRoleForm={setRoleForm}
        handleSave={handleSave}
      />
    </Box>
  );
}

export default RolesManagement;
