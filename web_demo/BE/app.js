// app.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const roleRouter = require("./routes/roleRouter");
const permissionRouter = require("./routes/permissionRouter");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRouter);
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000/");
});
