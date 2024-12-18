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

async function findAllRoleRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      "SELECT * \
        FROM DBA_ROLES "
    );

    const rows = result.rows;
    const listRole = rows.map((role) => ({
      ROLE: role[0],
      ROLE_ID: role[1],
      PASSWORD_REQUIRED: role[2],
      AUTHENCATION_TYPE: role[3],
    }));
    return listRole;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = {
  createRoleRepo,
  updateRoleRepo,
  deleteRoleRepo,
  findAllRoleRepo,
};
