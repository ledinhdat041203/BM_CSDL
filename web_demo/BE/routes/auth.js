const express = require("express");
const router = express.Router();
const { login } = require("../business/authService");

router.post("/login", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const result = await login(username, password, isAdmin);
    res.status(200).send(result.message);
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(400).send(err.message);
  }
});

module.exports = router;
