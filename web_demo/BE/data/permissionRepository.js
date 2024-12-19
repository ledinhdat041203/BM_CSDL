const oracledb = require("oracledb");
const { closeConnection, getPool } = require("./dbconect");

async function grantSysPermissionRepo(name, permissions, grantOption) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    console.log("connect", user);
    if (user !== "SYS") {
      const result = await connection.execute(
        `BEGIN
      managerdb.grant_sys_permissions_proc(
        p_name => :name,
        p_permissions => :permissions,
        p_grant_option => :grantOption
      );
    END;`,
        {
          name,
          permissions,
          grantOption,
        }
      );

      return result;
    } else {
      const result = await connection.execute(
        `
        DECLARE
          v_sql VARCHAR2(4000);
        BEGIN
          v_sql := 'GRANT ' || :permissions || ' TO ' || :name;
      
          IF :grantOption  THEN
            v_sql := v_sql || ' WITH GRANT OPTION';
          END IF;

          EXECUTE IMMEDIATE v_sql;
        END; `,
        {
          name,
          permissions,
          grantOption,
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

async function grantObjectPermissionRepo(
  name,
  permissions,
  table,
  grantOption
) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    if (user !== "SYS") {
      const result = await connection.execute(
        `BEGIN
      managerdb.grant_obj_permissions_proc(
        p_name => :name,
        p_permissions => :permissions,
        p_table => :table,
        p_grant_option => :grantOption
      );
    END;`,
        {
          name,
          permissions,
          table,
          grantOption,
        }
      );

      return result;
    } else {
      const result = await connection.execute(
        `
        DECLARE
          v_sql VARCHAR2(4000);
        BEGIN
          v_sql := 'GRANT ' ||  :permissions || ' ON ' || :table || ' TO ' || :name;
      
          IF :grantOption  THEN
            v_sql := v_sql || ' WITH GRANT OPTION';
          END IF;

          EXECUTE IMMEDIATE v_sql;
        END; `,
        {
          name,
          permissions,
          grantOption,
          table,
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

async function revokeSysPermissionRepo(name, permissions) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    if (user !== "SYS") {
      const result = await connection.execute(
        `BEGIN
      managerdb.revoke_sys_permissions_proc(
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
    } else {
      const result = await connection.execute(
        `
        DECLARE
          v_sql VARCHAR2(4000);
        BEGIN
          v_sql := 'REVOKE ' ||  :permissions || ' FROM ' || :name;
          EXECUTE IMMEDIATE v_sql;
        END; `,
        {
          name,
          permissions,
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

async function revokeObjectPermissionRepo(name, permissions, table) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    if (user !== "SYS") {
      const result = await connection.execute(
        `BEGIN
      managerdb.revoke_obj_permissions_proc(
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
    } else {
      const result = await connection.execute(
        `
        DECLARE
          v_sql VARCHAR2(4000);
        BEGIN
          v_sql := 'REVOKE ' ||  :permissions || ' ON ' || :table || ' FROM ' || :name;
          EXECUTE IMMEDIATE v_sql;
        END; `,
        {
          name,
          permissions,
          table,
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

async function findAllSysPermissionRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    if (user === "SYS") {
      const result = await connection.execute("SELECT * FROM DBA_SYS_PRIVS");
      const rows = result.rows;
      const listPer = rows.map((array) => ({
        GRANTEE: array[0],
        PRIVILEGE: array[1],
        ADMIN_OPTION: array[2],
        COMMON: array[3],
        INHERITED: array[4],
      }));
      return listPer;
    } else {
      const result = await connection.execute(
        `
        BEGIN
            :rc := managerdb.select_sys_permissions_func(:username); 
        END;
        `,
        {
          rc: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
          username: user,
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const resultSet = result.outBinds.rc;
      const rows = [];
      let row;
      while ((row = await resultSet.getRow())) {
        rows.push(row);
      }
      await resultSet.close();

      return rows;
    }
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllObjPermissionRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    if (user === "SYS") {
      const result = await connection.execute("SELECT * FROM DBA_TAB_PRIVS");
      const rows = result.rows;
      const listPer = rows.map((array) => ({
        GRANTEE: array[0],
        OWNER: array[1],
        TABLE_NAME: array[2],
        GRANTOR: array[3],
        PRIVILEGE: array[4],
        GRANTABLE: array[5],
        HIERARCHY: array[6],
        COMMON: array[7],
        TYPE: array[8],
        INHERITED: array[9],
      }));
      return listPer;
    } else {
      const result = await connection.execute(
        `
        BEGIN
            :rc := managerdb.select_obj_permissions_func(:username); 
        END;
        `,
        {
          rc: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
          username: user,
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const resultSet = result.outBinds.rc;
      const rows = [];
      let row;
      while ((row = await resultSet.getRow())) {
        rows.push(row);
      }
      await resultSet.close();

      return rows;
    }
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllSysPermissionOfRoleRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    const result = await connection.execute(
      `
        SELECT *
        FROM ROLE_SYS_PRIVS
        `
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllObjPermissionOfRoleRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    const result = await connection.execute(
      `
        SELECT *
        FROM ROLE_TAB_PRIVS
        `
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findMyRoleRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const user = connection._pool._impl._user;
    const result = await connection.execute(
      `
        SELECT *
        FROM USER_ROLE_PRIVS
        `
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = {
  grantSysPermissionRepo,
  grantObjectPermissionRepo,
  revokeSysPermissionRepo,
  revokeObjectPermissionRepo,
  findAllSysPermissionRepo,
  findAllObjPermissionRepo,
  findAllSysPermissionOfRoleRepo,
  findAllObjPermissionOfRoleRepo,
  findMyRoleRepo,
};
