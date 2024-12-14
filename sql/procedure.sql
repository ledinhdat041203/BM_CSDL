CREATE OR REPLACE PROCEDURE create_oracle_user_proc (
    p_user_name IN VARCHAR2,
    p_pass IN VARCHAR2
) IS
    v_sql VARCHAR2(4000);
BEGIN
    v_sql := 'CREATE USER ' || p_user_name || 
             ' IDENTIFIED BY ' || p_pass ||
             ' DEFAULT TABLESPACE users ' ||  
             ' QUOTA UNLIMITED ON users';

    EXECUTE IMMEDIATE v_sql;

    v_sql := 'GRANT CREATE SESSION TO ' || p_user_name;
    EXECUTE IMMEDIATE v_sql;

    v_sql := 'GRANT SELECT, INSERT, UPDATE, DELETE ON managerdb.employees TO ' || p_user_name;
    EXECUTE IMMEDIATE v_sql;
END;

----

