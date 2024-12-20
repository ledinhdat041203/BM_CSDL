import React, { Fragment, useState } from "react";
import LoginImage from "./ImageLogin";
import { Box } from "@mui/system";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { loginAPI } from "../API/authAPI";
import { toast } from "react-toastify";

export default function LoginPage({ setLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isAdmin: e.target.checked,
    }));
  };

  const login = async () => {
    let response;
    try {
      response = await loginAPI(formData);

      toast.success(response?.message, {
        position: "top-right",
      });
      setLogin(true);
    } catch (error) {
      console.log("err:", error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };
  const handleLogin = () => {
    console.log("Login with:", formData);
    login();
  };

  return (
    <Box>
      <div
        className="flex h-screen"
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <div
          style={{
            flex: 2,
            backgroundColor: "#f0f4ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginImage />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "350px",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Hiệu ứng đổ bóng
              border: "1px solid #ddd", // Viền nhạt xung quanh
              backgroundColor: "white", // Màu nền form
              margin: "auto", // Căn giữa form trong container
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "primary.main",
              }}
            >
              Login
            </Typography>

            {/* Ô nhập Username */}
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            />

            {/* Ô nhập Password */}
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              fullWidth
              required
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
              }}
            />

            {/* Checkbox Admin */}
            <FormControlLabel
              control={
                <Checkbox
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleCheckboxChange}
                />
              }
              label="Login as Admin"
              sx={{
                color: "text.secondary",
              }}
            />

            {/* Nút Submit */}
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                padding: "10px",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </Box>
        </div>
      </div>
    </Box>
  );
}
