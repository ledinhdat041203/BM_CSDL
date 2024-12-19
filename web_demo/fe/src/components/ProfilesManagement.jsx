import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Paper } from "@mui/material";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  createProfileAPI,
  deleteProfileAPI,
  findAllProfile,
  updateProfileAPI,
} from "../API/profileApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBookmarkAdd } from "react-icons/md";
import ProfileFormDialog from "./ProfileDialog";
import { toast } from "react-toastify";

function ProfilesManagement() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [profileForm, setProfileForm] = useState({
    profileName: "",
    sessionPerUser: "",
    connectTime: "",
    idleTime: "",
    passLife: "",
    failLogin: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (selectedProfile) => {
    setIsEditing(true);
    setProfileForm({
      profileName: selectedProfile.PROFILE,
      sessionPerUser: selectedProfile.SESSIONS_PER_USER,
      connectTime: selectedProfile.CONNECT_TIME,
      idleTime: selectedProfile.IDLE_TIME,
    });
    setDialogOpen(true);
  };

  const handleDelete = (selectedProfile) => {
    console.log("delete", selectedProfile.PROFILE);
    deleteProfile(selectedProfile.PROFILE);
    // fetchProfiles();
  };

  const columns = [
    { field: "PROFILE", headerName: "PROFILE", width: 200 },
    { field: "CONNECT_TIME", headerName: "CONNECT_TIME", width: 200 },
    { field: "IDLE_TIME", headerName: "IDLE_TIME", width: 200 },
    { field: "SESSIONS_PER_USER", headerName: "SESSIONS_PER_USER", width: 200 },
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

  const handleAddProfile = () => {
    setIsEditing(false);
    setProfileForm({
      profileName: "",
      sessionPerUser: "UNLIMITED",
      connectTime: "UNLIMITED",
      idleTime: "UNLIMITED",
      passLife: "100",
      failLogin: "10",
    });
    setDialogOpen(true);
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      console.log("fetch");
      const response = await findAllProfile();
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
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

  const createProfile = async () => {
    let response;
    try {
      response = await createProfileAPI(profileForm);
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

  const updateProfile = async () => {
    let response;
    try {
      response = await updateProfileAPI(profileForm);
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

  const deleteProfile = async (profileName) => {
    let response;
    try {
      console.log("perofileName::", profileName);
      response = await deleteProfileAPI(profileName);
      console.log("response", response);

      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.PROFILE !== profileName)
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
    console.log("Saved User:", profileForm);
    if (isEditing) {
      await updateProfile();
    } else {
      await createProfile();
    }
    fetchProfiles();
    handleClose();
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<MdBookmarkAdd />}
          onClick={handleAddProfile}
        >
          Add Profile
        </Button>
      </Box>

      <Paper elevation={3} sx={{ height: 500, width: "100%", mb: 2 }}>
        <DataGrid
          rows={profiles}
          getRowId={(row) => row.PROFILE}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          loading={loading}
        />
      </Paper>

      <ProfileFormDialog
        dialogOpen={dialogOpen}
        handleClose={handleClose}
        isEditing={isEditing}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        profileForm={profileForm}
        setProfileForm={setProfileForm}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSave={handleSave}
      />
    </Box>
  );
}

export default ProfilesManagement;
