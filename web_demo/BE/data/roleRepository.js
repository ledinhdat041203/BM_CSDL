const { closeConnection, getPool } = require("./dbconect");

async function createRoleRepo(role) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.create_role_proc(
        p_role_name => :roleName,
        p_pass => :pass
      );
    END;`,
      {
        roleName: role.roleName,
        pass: role.pass,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function updateRoleRepo(role) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.update_role_proc(
        p_role_name => :roleName,
        p_pass => :pass
      );
    END;`,
      {
        roleName: role.roleName,
        pass: role.pass,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function deleteRoleRepo(roleName) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
          managerdb.delete_role_proc(p_role_name => :roleName);
        END;`,
      {
        roleName,
      }
    );
    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllProfileNameRepo(profileName) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      "SELECT DISTINCT PROFILE \
        FROM DBA_PROFILES "
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = { createRoleRepo, updateRoleRepo, deleteRoleRepo };
