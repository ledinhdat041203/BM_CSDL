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
    if (role.pass) {
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
    } else {
      const result = await connection.execute(
        `BEGIN
      managerdb.update_role_proc(
        p_role_name => :roleName
      );
    END;`,
        {
          roleName: role.roleName,
        }
      );

      return result;
    }
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

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllRoleAndUserRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      "SELECT * \
        FROM DBA_ROLE_PRIVS "
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}
async function findAllRoleNameRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `SELECT GRANTED_ROLE
        FROM USER_ROLE_PRIVS
        WHERE GRANTED_ROLE NOT IN (
          'CONNECT',
          'RESOURCE',
          'DBA',
          'EXP_FULL_DATABASE',
          'IMP_FULL_DATABASE',
          'LBAC_DBA',
          'ABSC'
        )
        ORDER BY GRANTED_ROLE`
    );
    return result.rows;
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
  findAllRoleNameRepo,
  findAllRoleAndUserRepo,
};
