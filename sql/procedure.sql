CREATE OR REPLACE PROCEDURE create_oracle_user_proc (
    p_user_name IN VARCHAR2,
    p_pass IN VARCHAR2
) IS
    v_sql VARCHAR2(4000);
BEGIN
    -- T?o tài kho?n Oracle cho nhân viên
    v_sql := 'CREATE USER ' || p_user_name || 
             ' IDENTIFIED BY ' || p_pass;
--             ' DEFAULT TABLESPACE users ' ||  -- Ch? ð?nh b?ng không gian lýu tr?
--             ' QUOTA UNLIMITED ON users';

    -- Th?c thi câu l?nh SQL ð? t?o tài kho?n Oracle
    EXECUTE IMMEDIATE v_sql;

--    -- C?p quy?n cho tài kho?n ngý?i dùng m?i
--    v_sql := 'GRANT CREATE SESSION TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
--
--    -- C?p quy?n thao tác v?i b?ng
--    v_sql := 'GRANT SELECT, INSERT, UPDATE, DELETE ON managerdb.employees TO ' || p_user_name;
--    EXECUTE IMMEDIATE v_sql;
END;

