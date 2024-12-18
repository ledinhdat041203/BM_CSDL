import React, { useState } from "react";
import { Box, Button, Paper, Tabs, Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaUserPlus } from "react-icons/fa";
import UserDialog from "./UserDialog";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
];

function UserManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);
  const handleAddUser = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

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
      {selectedTab === 0 ? (
        <Typography>User Info Content</Typography>
      ) : (
        <Typography>System Info Content</Typography>
      )}
      <UserDialog open={dialogOpen} onClose={handleCloseDialog} />
    </Box>
  );
}

export default UserManagement;
