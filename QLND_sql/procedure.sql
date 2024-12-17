--create user
create or replace PROCEDURE create_oracle_user_proc (
    p_user_name IN VARCHAR2,
    p_pass IN VARCHAR2,
    p_default_tablespace IN VARCHAR2,
    p_temp_tablespace IN VARCHAR2,
    p_quota IN VARCHAR2,
    p_status IN VARCHAR2,
    p_profile IN VARCHAR2,
    p_role IN VARCHAR2
) 
AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
    v_sql := 'CREATE USER ' || p_user_name || 
             ' IDENTIFIED BY ' || p_pass ||
             ' TEMPORARY TABLESPACE ' || p_temp_tablespace ||
             ' DEFAULT TABLESPACE ' || p_default_tablespace ||  
             ' QUOTA ' || p_quota || ' ON ' || p_default_tablespace;

    EXECUTE IMMEDIATE v_sql;

    -- Xử lý trạng thái tài khoản
    IF UPPER(p_status) = 'LOCK' THEN
        v_sql := 'ALTER USER ' || p_user_name || ' ACCOUNT LOCK';
    ELSE
        v_sql := 'ALTER USER ' || p_user_name || ' ACCOUNT UNLOCK';
    END IF;
    EXECUTE IMMEDIATE v_sql;

--    v_sql := 'GRANT CREATE SESSION TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
--
--    v_sql := 'GRANT SELECT, INSERT, UPDATE, DELETE ON managerdb.employees TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON create_oracle_user_proc TO PUBLIC;

--update user
CREATE OR REPLACE PROCEDURE update_oracle_user_proc (
    p_user_name          IN VARCHAR2,
    p_temp_tablespace    IN VARCHAR2 DEFAULT NULL,
    p_default_tablespace IN VARCHAR2 DEFAULT NULL,
    p_quota              IN VARCHAR2 DEFAULT NULL,
    p_status             IN VARCHAR2 DEFAULT NULL,
    p_profile            IN VARCHAR2 DEFAULT NULL,
    p_role               IN VARCHAR2 DEFAULT NULL
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
    IF p_temp_tablespace IS NOT NULL THEN
        v_sql := 'ALTER USER ' || p_user_name || 
                 ' TEMPORARY TABLESPACE ' || p_temp_tablespace;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    IF p_default_tablespace IS NOT NULL THEN
        v_sql := 'ALTER USER ' || p_user_name || 
                 ' DEFAULT TABLESPACE ' || p_default_tablespace;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    IF p_quota IS NOT NULL THEN
        v_sql := 'ALTER USER ' || p_user_name || 
                 ' QUOTA ' || p_quota || ' ON ' || p_default_tablespace;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    IF p_status IS NOT NULL THEN
        IF UPPER(p_status) = 'LOCK' THEN
            v_sql := 'ALTER USER ' || p_user_name || ' ACCOUNT LOCK';
        ELSE
            v_sql := 'ALTER USER ' || p_user_name || ' ACCOUNT UNLOCK';
        END IF;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    IF p_profile IS NOT NULL THEN
        v_sql := 'ALTER USER ' || p_user_name || 
                 ' PROFILE ' || p_profile;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    IF p_role IS NOT NULL THEN
        v_sql := 'GRANT ' || p_role || ' TO ' || p_user_name;
        EXECUTE IMMEDIATE v_sql;
    END IF;

    DBMS_OUTPUT.PUT_LINE('User ' || p_user_name || ' updated successfully.');
END;
/

GRANT EXECUTE ON update_oracle_user_proc TO PUBLIC;

-- Delete user
CREATE OR REPLACE PROCEDURE delete_oracle_user_proc (
    p_user_name  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'DROP USER ' || p_user_name;
        EXECUTE IMMEDIATE v_sql;
END;
/

GRANT EXECUTE ON delete_oracle_user_proc TO PUBLIC;

--create profile
CREATE OR REPLACE PROCEDURE create_profile_proc (
    p_profile_name  IN VARCHAR2,
    p_session_per_user  IN VARCHAR2,
    p_connect_time  IN VARCHAR2,
    p_idle_time  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'CREATE PROFILE ' ||  p_profile_name || ' LIMIT ' ||
                ' SESSIONS_PER_USER ' || p_session_per_user ||
                ' CONNECT_TIME ' || p_connect_time ||
                ' IDLE_TIME ' || p_idle_time;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON create_profile_proc TO PUBLIC;

--update profile
CREATE OR REPLACE PROCEDURE update_profile_proc (
    p_profile_name  IN VARCHAR2,
    p_session_per_user  IN VARCHAR2,
    p_connect_time  IN VARCHAR2,
    p_idle_time  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'ALTER PROFILE ' ||  p_profile_name || ' LIMIT ' ||
                ' SESSIONS_PER_USER ' || p_session_per_user ||
                ' CONNECT_TIME ' || p_connect_time ||
                ' IDLE_TIME ' || p_idle_time;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON update_profile_proc TO PUBLIC;


--delete profile
CREATE OR REPLACE PROCEDURE delete_profile_proc (
    p_profile_name  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'DROP PROFILE ' ||  p_profile_name || ' CASCADE';
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON delete_profile_proc TO PUBLIC;

--create role
CREATE OR REPLACE PROCEDURE create_role_proc (
    p_role_name  IN VARCHAR2,
    p_pass IN VARCHAR2 DEFAULT NULL
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        IF p_pass IS NOT NULL THEN
            v_sql := 'CREATE ROLE ' ||  p_role_name || ' IDENTIFIED BY ' ||  p_pass;
        ELSE
            v_sql := 'CREATE ROLE ' ||  p_role_name;
        END IF;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON create_role_proc TO PUBLIC;

--update role
CREATE OR REPLACE PROCEDURE update_role_proc (
    p_role_name  IN VARCHAR2,
    p_pass IN VARCHAR2 DEFAULT NULL
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'ALTER ROLE ' ||  p_role_name || ' IDENTIFIED BY ' || p_pass;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON update_role_proc TO PUBLIC;

--delete role
CREATE OR REPLACE PROCEDURE delete_role_proc (
    p_role_name  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'DROP ROLE ' ||  p_role_name;
        EXECUTE IMMEDIATE v_sql;
END;
GRANT EXECUTE ON delete_role_proc TO PUBLIC;


--grant system permessions
CREATE OR REPLACE PROCEDURE grant_sys_permissions_proc (
    p_name  IN VARCHAR2,
    p_permissions IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'GRANT ' ||  p_permissions || ' TO ' || p_name;
        EXECUTE IMMEDIATE v_sql;
END;
GRANT EXECUTE ON grant_sys_permissions_proc TO PUBLIC;

