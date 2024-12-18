const { closeConnection, getPool } = require("./dbconect");

async function createProfileRepo(profile) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.create_profile_proc(
        p_profile_name => :profileName,
        p_session_per_user => :sessionPerUser,
        p_connect_time => :connectTime,
        p_idle_time => :idleTime
      );
    END;`,
      {
        profileName: profile.profileName,
        sessionPerUser: profile.sessionPerUser,
        connectTime: profile.connectTime,
        idleTime: profile.idleTime,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function updateProfileRepo(profile) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN
      managerdb.update_profile_proc(
        p_profile_name => :profileName,
        p_session_per_user => :sessionPerUser,
        p_connect_time => :connectTime,
        p_idle_time => :idleTime
      );
    END;`,
      {
        profileName: profile.profileName,
        sessionPerUser: profile.sessionPerUser,
        connectTime: profile.connectTime,
        idleTime: profile.idleTime,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function deleteProfileRepo(profileName) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `BEGIN 
        managerdb.delete_profile_proc (p_profile_name => :profileName);
      END;`,
      {
        profileName,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function findAllProfileNameRepo() {
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

async function findAllProfileRepo() {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      "SELECT PROFILE, \
         MAX(CASE WHEN RESOURCE_NAME = 'CONNECT_TIME' THEN LIMIT END) AS CONNECT_TIME, \
         MAX(CASE WHEN RESOURCE_NAME = 'IDLE_TIME' THEN LIMIT END) AS IDLE_TIME, \
         MAX(CASE WHEN RESOURCE_NAME = 'SESSIONS_PER_USER' THEN LIMIT END) AS SESSIONS_PER_USER \
      FROM DBA_PROFILES \
      GROUP BY PROFILE"
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

async function profileDetailRepo(profileName) {
  let connection = null;

  try {
    connection = await getPool().getConnection();
    const result = await connection.execute(
      `SELECT * \
      FROM ( \
        SELECT PROFILE, RESOURCE_NAME, LIMIT \
        FROM DBA_PROFILES \
      ) \
      PIVOT ( \
        MAX(LIMIT) \
        FOR RESOURCE_NAME IN ( \
          'CONNECT_TIME' AS CONNECT_TIME, \
          'IDLE_TIME' AS IDLE_TIME, \
          'SESSIONS_PER_USER' AS SESSIONS_PER_USER, \
          'PASSWORD_LIFE_TIME' AS PASSWORD_LIFE_TIME, \
          'FAILED_LOGIN_ATTEMPTS' AS FAILED_LOGIN_ATTEMPTS, \
          'PASSWORD_REUSE_MAX' AS PASSWORD_REUSE_MAX, \
          'PASSWORD_VERIFY_FUNCTION' AS PASSWORD_VERIFY_FUNCTION \
        ) \
      ) \
       WHERE UPPER(PROFILE) = UPPER(:profileName)`,
      { profileName }
    );

    return result.rows;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    closeConnection(connection);
  }
}

module.exports = {
  createProfileRepo,
  updateProfileRepo,
  deleteProfileRepo,
  findAllProfileNameRepo,
  findAllProfileRepo,
  profileDetailRepo,
};
