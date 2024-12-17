const { createPoolLogin, closeConnection } = require("../data/dbconect");

async function login(username, password, isAdmin) {
  let connection = null;

  try {
    const pool = await createPoolLogin(username, password, isAdmin);
    connection = await pool.getConnection();

    const result = await connection.execute(
      `SELECT username, account_status FROM dba_users WHERE username = :username`,
      [username]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];
    const accountStatus = user[1];

    if (accountStatus === "LOCKED") {
      throw new Error("Account is locked");
    }

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
