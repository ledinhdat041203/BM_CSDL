const { closeConnection, getPool } = require("./dbconect");

async function grantSysPermissionRepo(name, permissions) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.grant_sys_permissions_proc(
        p_name => :name,
        p_permissions => :permissions
      );
    END;`,
      {
        name,
        permissions,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function grantObjectPermissionRepo(name, permissions, table) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.grant_obj_permissions_proc(
        p_name => :name,
        p_permissions => :permissions,
        p_table => :table
      );
    END;`,
      {
        name,
        permissions,
        table,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = { grantSysPermissionRepo, grantObjectPermissionRepo };
