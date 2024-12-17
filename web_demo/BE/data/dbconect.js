const oracledb = require("oracledb");

const defaultDbConfig = {
  connectString: "localhost:1521/ORCLPDB",
};

let pool = null;

function getPool() {
  return pool;
}

async function createPoolLogin(user, password, isAdmin) {
  const dbConfig = {
    user: user,
    password: password,
    connectString: defaultDbConfig.connectString,
  };

  if (isAdmin) {
    dbConfig.privilege = oracledb.SYSDBA;
  }

  console.log("db:::", dbConfig);

  try {
    // await closeAllPools();
    console.log("khokng");
    pool = await oracledb.createPool(dbConfig);
  } catch (err) {
    throw new Error(`Error creating pool: ${err.message}`);
  }

  return pool;
}

async function closeConnection(connection) {
  if (connection) {
    await connection.close();
  }
}
async function closeAllPools() {
  const poolKeys = Object.keys(oracledb.poolCache);
  console.log("=========");
  for (const key of poolKeys) {
    const pool = oracledb.poolCache[key];
    if (pool) {
      console.log(`Closing pool: ${key}`);
      await pool.close(10); // Đóng pool với timeout 10 giây
    }
  }
}
module.exports = {
  createPoolLogin,
  getPool,
  closeConnection,
};
