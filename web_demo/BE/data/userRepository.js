const { closeConnection, getPool } = require("./dbconect");

async function createUserRepo(user) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.create_oracle_user_proc(
        p_user_name => :username,
        p_pass => :password,
        p_default_tablespace => :defaultTablespace,
        p_temp_tablespace => :tempTablespace,
        p_quota => :quota,
        p_status => :accountStatus,
        p_profile => :profile,
        p_role => :role
      );
    END;`,
      {
        username: user.username,
        password: user.password,
        defaultTablespace: user.defaultTablespace,
        tempTablespace: user.tempTablespace,
        quota: user.quota,
        accountStatus: user.accountStatus,
        profile: user.profile,
        role: user.role,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllRepo() {
  let connection = null;
  try {
    const pool = getPool();
    connection = await pool.getConnection();

    const result = await connection.execute(
      "SELECT USERNAME, ACCOUNT_STATUS, LOCK_DATE, CREATED, TEMPORARY_TABLESPACE, DEFAULT_TABLESPACE, PROFILE \
                                                FROM DBA_USERS"
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function updateUserRepo(user) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
        managerdb.update_oracle_user_proc(
          p_user_name => :username,
          p_default_tablespace => :defaultTablespace,
          p_temp_tablespace => :tempTablespace,
          p_quota => :quota,
          p_status => :accountStatus,
          p_profile => :profile,
          p_role => :role
        );
      END;`,
      {
        username: user.username,
        defaultTablespace: user.defaultTablespace,
        tempTablespace: user.tempTablespace,
        quota: user.quota,
        accountStatus: user.accountStatus,
        profile: user.profile,
        role: user.role,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function deleteUserRepo(username) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
          managerdb.delete_oracle_user_proc(p_user_name => :username);
        END;`,
      {
        username: username,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllTableSpaceRepo(username) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const defaultTablespace = await connection.execute(
      `
      SELECT TABLESPACE_NAME
        FROM managerdb.tablespace_name
        WHERE CONTENTS = 'PERMANENT'
      `
    );

    const tempTablespace = await connection.execute(
      `
        SELECT TABLESPACE_NAME
        FROM managerdb.tablespace_name
        WHERE CONTENTS = 'TEMPORARY'
      `
    );

    return {
      defaultTablespace: defaultTablespace.rows,
      tempTablespace: tempTablespace.rows,
    };
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = {
  createUserRepo,
  findAllRepo,
  updateUserRepo,
  deleteUserRepo,
  findAllTableSpaceRepo,
};
