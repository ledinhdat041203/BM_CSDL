-- ham tao user va cap quyen
CREATE OR REPLACE PROCEDURE create_oracle_user_proc (
    p_user_name IN VARCHAR2,
    p_pass IN VARCHAR2,
    p_role IN VARCHAR2,
    p_department IN VARCHAR2
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
    
    --gan nhan user
    assign_labels_to_user(p_user_name, p_role, p_department);
END;

---- ham gan nhan cho user moi
CREATE OR REPLACE PROCEDURE assign_labels_to_user (
    p_username IN VARCHAR2,
    p_role IN VARCHAR2,
    p_department IN VARCHAR2
) IS
    v_label VARCHAR2(50);
    v_compartment VARCHAR2(50);
    v_level VARCHAR2(50);
BEGIN
    -- Kiểm tra role và gán nhãn và compartment phù hợp
    IF p_role = 'Nhân viên' THEN
        v_level := 'PUB'; 
    ELSIF p_role = 'Trưởng phòng' THEN
        v_level := 'CONF';
    ELSIF p_role = 'Giám đốc' OR  p_role = 'Kế toán' THEN
        v_level := 'SENS';
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'Invalid role specified');
    END IF;
    
    IF p_department = 'pb01' THEN
        v_compartment := 'TECH'; 
    ELSIF p_department = 'pb02' THEN
        v_compartment := 'FIN';
    ELSIF p_department = 'pb03' THEN
        v_compartment := 'BUS';
    ELSIF p_department = 'pb04' THEN
        v_compartment := 'MAR';
    ELSIF p_department = 'pb05' THEN
        v_compartment := 'TECH,FIN,BUS,MAR,HR';
        v_level := 'CONF';
    ELSIF p_department = 'pb06' THEN
        v_compartment := 'TECH,FIN,BUS,MAR,HR,DIR';
        v_level := 'SENS';
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'Invalid role specified');
    END IF;
    
    IF p_role='Kế toán 'THEN
        v_compartment := 'TECH,FIN,BUS,MAR,HR,DIR';
        v_level := 'SENS';
    END IF;
    
    v_label := v_level || ':' || v_compartment;
    -- Gán nhãn cho user
    BEGIN
         sa_user_admin.set_user_labels (
            policy_name 	=> 'ACCESS_DEPARTMENT', 
            user_name       => p_username, 
            max_read_label => v_label, 
            max_write_label => v_label, 
            min_write_label => 'PUB',  
            row_label  	=> v_label
        ); 
        COMMIT;

    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END;
END;


