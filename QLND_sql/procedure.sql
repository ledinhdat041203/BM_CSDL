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
    p_idle_time  IN VARCHAR2,
    p_pass_life  IN VARCHAR2,
    p_fail_login  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'CREATE PROFILE ' ||  p_profile_name || ' LIMIT ' ||
                ' SESSIONS_PER_USER ' || p_session_per_user ||
                ' CONNECT_TIME ' || p_connect_time ||
                ' IDLE_TIME ' || p_idle_time ||
                ' PASSWORD_LIFE_TIME ' || p_pass_life ||
                ' FAILED_LOGIN_ATTEMPTS ' || p_fail_login;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON create_profile_proc TO PUBLIC;

--update profile
CREATE OR REPLACE PROCEDURE update_profile_proc (
    p_profile_name  IN VARCHAR2,
    p_session_per_user  IN VARCHAR2,
    p_connect_time  IN VARCHAR2,
    p_idle_time  IN VARCHAR2,
    p_pass_life  IN VARCHAR2,
    p_fail_login  IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN

        v_sql := 'ALTER PROFILE ' ||  p_profile_name || ' LIMIT ' ||
                ' SESSIONS_PER_USER ' || p_session_per_user ||
                ' CONNECT_TIME ' || p_connect_time ||
                ' IDLE_TIME ' || p_idle_time ||
                ' PASSWORD_LIFE_TIME ' || p_pass_life ||
                ' FAILED_LOGIN_ATTEMPTS ' || p_fail_login;
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
        IF p_pass IS NOT NULL THEN
            v_sql := 'ALTER ROLE ' ||  p_role_name || ' IDENTIFIED BY ' || p_pass;
        ELSE
            v_sql := 'ALTER ROLE ' ||  p_role_name || ' NOT IDENTIFIED';
        END IF;
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


--grant object table permessions
CREATE OR REPLACE PROCEDURE grant_obj_permissions_proc (
    p_name  IN VARCHAR2,
    p_permissions IN VARCHAR2,    
    p_table IN VARCHAR2,
    p_grant_option IN BOOLEAN
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'GRANT ' ||  p_permissions || ' ON ' || p_table || ' TO ' || p_name;
        IF p_grant_option THEN
            v_sql := v_sql || ' WITH GRANT OPTION';
        END IF;
        EXECUTE IMMEDIATE v_sql;
END;
GRANT EXECUTE ON grant_obj_permissions_proc TO PUBLIC;

CREATE OR REPLACE PROCEDURE grant_sys_permissions_proc (
    p_name  IN VARCHAR2,
    p_permissions IN VARCHAR2,
    p_grant_option IN BOOLEAN DEFAULT FALSE
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'GRANT ' ||  p_permissions || ' TO ' || p_name;
         IF p_grant_option THEN
            v_sql := v_sql || ' WITH GRANT OPTION';
        END IF;
        EXECUTE IMMEDIATE v_sql;
END;
GRANT EXECUTE ON grant_sys_permissions_proc TO PUBLIC;

--revoke object table permessions
CREATE OR REPLACE PROCEDURE revoke_obj_permissions_proc (
    p_name  IN VARCHAR2,
    p_permissions IN VARCHAR2,    
    p_table IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'REVOKE ' ||  p_permissions || ' ON ' || p_table || ' FROM ' || p_name;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON revoke_obj_permissions_proc TO PUBLIC;

--Revoke sys permission
CREATE OR REPLACE PROCEDURE revoke_sys_permissions_proc (
    p_name  IN VARCHAR2,
    p_permissions IN VARCHAR2
) AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
BEGIN
        v_sql := 'REVOKE ' ||  p_permissions || ' FROM ' || p_name;
        EXECUTE IMMEDIATE v_sql;
END;

GRANT EXECUTE ON revoke_sys_permissions_proc TO PUBLIC;

--select sys permission
CREATE OR REPLACE FUNCTION select_sys_permissions_func (
    p_name IN VARCHAR2
) RETURN SYS_REFCURSOR
AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
    v_check_per BOOLEAN := false;
    v_check NUMBER;
    v_cursor SYS_REFCURSOR;
BEGIN
    BEGIN
        SELECT COUNT(*)
        INTO v_check
        FROM ALL_TAB_PRIVS
        WHERE TABLE_NAME = 'DBA_SYS_PRIVS'
          AND PRIVILEGE = 'SELECT'
          AND UPPER(GRANTEE) = UPPER(p_name);
        v_check_per := (v_check > 0);
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            v_check_per := false;
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM);
    END;

    IF v_check_per THEN
        v_sql := 'SELECT * FROM DBA_SYS_PRIVS';
    ELSE
        v_sql := 'SELECT * FROM USER_SYS_PRIVS';
    END IF;

    OPEN v_cursor FOR v_sql;
    RETURN v_cursor;
END;

GRANT EXECUTE ON select_sys_permissions_func TO PUBLIC;

CREATE OR REPLACE FUNCTION select_obj_permissions_func (
    p_name IN VARCHAR2
) RETURN SYS_REFCURSOR
AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
    v_check_per BOOLEAN := false;
    v_check NUMBER;
    v_cursor SYS_REFCURSOR;
BEGIN
    BEGIN
        SELECT COUNT(*)
        INTO v_check
        FROM ALL_TAB_PRIVS
        WHERE TABLE_NAME = 'DBA_TAB_PRIVS'
          AND PRIVILEGE = 'SELECT'
          AND UPPER(GRANTEE) = UPPER(p_name);
        v_check_per := (v_check > 0);
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            v_check_per := false;
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM);
    END;

    IF v_check_per THEN
        v_sql := 'SELECT * FROM DBA_TAB_PRIVS';
    ELSE
        v_sql := 'SELECT * FROM USER_TAB_PRIVS';
    END IF;

    OPEN v_cursor FOR v_sql;
    RETURN v_cursor;
END;

GRANT EXECUTE ON select_obj_permissions_func TO PUBLIC;

--select role
CREATE OR REPLACE FUNCTION select_role_func (
    p_name IN VARCHAR2
) RETURN SYS_REFCURSOR
AUTHID CURRENT_USER
IS
    v_sql VARCHAR2(4000);
    v_check_per BOOLEAN := false;
    v_check NUMBER;
    v_cursor SYS_REFCURSOR;
BEGIN
    BEGIN
        SELECT COUNT(*)
        INTO v_check
        FROM ALL_TAB_PRIVS
        WHERE TABLE_NAME = 'DBA_ROLE_PRIVS'
          AND PRIVILEGE = 'SELECT'
          AND UPPER(GRANTEE) = UPPER(p_name);
        v_check_per := (v_check > 0);
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            v_check_per := false;
        WHEN OTHERS THEN
            DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM);
    END;

    IF v_check_per THEN
        v_sql := 'SELECT * FROM DBA_ROLE_PRIVS';
    ELSE
        v_sql := 'SELECT * FROM USER_ROLE_PRIVS';
    END IF;

    OPEN v_cursor FOR v_sql;
    RETURN v_cursor;
END;

GRANT EXECUTE ON select_role_func TO PUBLIC;


