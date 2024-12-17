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

module.exports = {
  createProfileRepo,
  updateProfileRepo,
  deleteProfileRepo,
  findAllProfileNameRepo,
};
