CREATE OR REPLACE PROCEDURE create_oracle_user_proc (
    p_user_name IN VARCHAR2,
    p_pass IN VARCHAR2
) IS
    v_sql VARCHAR2(4000);
BEGIN
    -- T?o t�i kho?n Oracle cho nh�n vi�n
    v_sql := 'CREATE USER ' || p_user_name || 
             ' IDENTIFIED BY ' || p_pass;
--             ' DEFAULT TABLESPACE users ' ||  -- Ch? �?nh b?ng kh�ng gian l�u tr?
--             ' QUOTA UNLIMITED ON users';

    -- Th?c thi c�u l?nh SQL �? t?o t�i kho?n Oracle
    EXECUTE IMMEDIATE v_sql;

--    -- C?p quy?n cho t�i kho?n ng�?i d�ng m?i
--    v_sql := 'GRANT CREATE SESSION TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
--
--    -- C?p quy?n thao t�c v?i b?ng
--    v_sql := 'GRANT SELECT, INSERT, UPDATE, DELETE ON managerdb.employees TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
END;

