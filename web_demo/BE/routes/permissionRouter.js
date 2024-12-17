const express = require("express");
const {
  grantSysPermission,
  grantObjectPermission,
} = require("../business/permissionService");

const router = express.Router();

router.post("/grant-sys-permission", async (req, res) => {
  try {
    const { name, permission } = req.body;

    if (!name | !permission) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await grantSysPermission(name, permission);

    res.status(200).json({
      success: true,
      message: "granted successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

router.post("/grant-obj-permission", async (req, res) => {
  try {
    const { name, permission, table } = req.body;

    if (!name | !permission | !table) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await grantObjectPermission(name, permission, table);

    res.status(200).json({
      success: true,
      message: "granted successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

module.exports = router;
