const { createPoolLogin, closeConnection } = require("../data/dbconect");

async function login(username, password, isAdmin) {
  let connection = null;

  try {
    const pool = await createPoolLogin(username, password, isAdmin);
    connection = await pool.getConnection();

    return {
      success: true,
      message: "Login successful",
    };
  } catch (err) {
    throw new Error(err.message || "Error during login");
  } finally {
    closeConnection(connection);
  }
}

module.exports = {
  login,
};
