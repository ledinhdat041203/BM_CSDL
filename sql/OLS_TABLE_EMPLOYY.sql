-- B1. tao va gan quyen cho cac user quan ly
-- CONNECT USER LBACSYS
BEGIN 
    SA_SYSDBA.CREATE_POLICY ( 
        policy_name => 'ACCESS_DEPARTMENT',
        column_name => 'OLS_DEPT'
        ); 
END; 

-- Cap quyen cho user quan ly chinh sach
GRANT ACCESS_DEPARTMENT_DBA TO policy_manager; 
-- --Package dùng ð? t?o ra các thành ph?n c?a nh?n 
GRANT execute ON sa_components TO policy_manager; 
-- --Package dùng ð? t?o các nh?n 
GRANT execute ON sa_label_admin TO policy_manager; 
-- --Package dùng ð? gán chính sách cho các table/schema 
GRANT execute ON sa_policy_admin TO policy_manager; 

--Cap quyen cho user quan li truy cap cua user khac
GRANT ACCESS_DEPARTMENT_DBA TO sec_manager; 
-- --Package dùng ð? gán các label cho user 
GRANT execute ON sa_user_admin TO sec_manager; 
GRANT execute ON sa_label_admin TO sec_manager; 
GRANT execute ON sa_policy_admin TO sec_manager; 
GRANT execute ON sa_components TO sec_manager; 



--b2. tao cac thanh phan cua nhan
-- CONNECT USER SEC_MANAGER
-- --Tao  level
BEGIN sa_components.create_level (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    long_name  	=> 'PUBLIC', 
    short_name  	=> 'PUB', 
    level_num  	=> 1000
); 
END;

BEGIN sa_components.create_level (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    long_name  	=> 'CONFIDENTIAL', 
    short_name  	=> 'CONF', 
    level_num  	=> 2000
); 
END;

BEGIN sa_components.create_level (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    long_name  	=> 'SENSITIVE', 
    short_name  	=> 'SENS', 
    level_num  	=> 3000
); 
END;

-- --- ham xoa 1 level
BEGIN sa_components.drop_level (
    policy_name   => 'ACCESS_DEPARTMENT', 
    short_name  => 'SENS'
); 
END; 

-- Tao cac compartment 
BEGIN sa_components.create_compartment (
    policy_name   => 'ACCESS_DEPARTMENT', 
    long_name      => 'DEVELOPER', 
    short_name     => 'DEV', 
    comp_num       => 100); 
END; 

BEGIN sa_components.create_compartment (
    policy_name   => 'ACCESS_DEPARTMENT', 
    long_name      => 'DEPARTMENT_HEAD', 
    short_name     => 'DEPT_HEAD', 
    comp_num       => 200); 
END;
--Xoa 1 compartment
BEGIN sa_components.drop_compartment 
    (policy_name 	=> 'ACCESS_DEPARTMENT', 
    short_name  	=> 'dev'); 
END;

--B3. Tao nhan that tu cac thanh phan o b2
--nhan vien phong dev
BEGIN sa_label_admin.create_label (
    policy_name => 'ACCESS_DEPARTMENT',
    label_tag 	=> '10100', 
    label_value => 'PUB:DEV'
); 
END;
--truong phong dev
BEGIN sa_label_admin.create_label (
    policy_name => 'ACCESS_DEPARTMENT',
    label_tag 	=> '20100', 
    label_value => 'CONF:DEV'
); 
END;
--giam doc
BEGIN sa_label_admin.create_label (
    policy_name => 'ACCESS_DEPARTMENT',
    label_tag 	=> '30200', 
    label_value => 'SENS:DEPT_HEAD,DEV'
); 
END;

--ap dung chinh sach len bang
BEGIN sa_policy_admin.apply_table_policy (
    policy_name     => 'ACCESS_DEPARTMENT', 
    schema_name      => 'managerdb', 
    table_name       => 'employees', 
    table_options    => 'NO_CONTROL'); 
END; 

--Xoa lable 
BEGIN 	 	 
    sa_label_admin.drop_label 
    (policy_name  	=> 'ACCESS_DEPARTMENT', 
    label_tag 	 	=> 30200); 
END;  


--b4. Gan Nhan cho du lieu
--connect user policy_manager
UPDATE managerdb.employees SET OLS_DEPT = char_to_label 
('ACCESS_DEPARTMENT', 'PUB:dev')
WHERE job_title='Developer'; 
commit;
UPDATE managerdb.employees SET OLS_DEPT = char_to_label 
('ACCESS_DEPARTMENT', 'CONF:dev')
WHERE job_title='Truong phong'; 
commit;
UPDATE managerdb.employees SET OLS_DEPT = char_to_label 
('ACCESS_DEPARTMENT', 'SENS:dept_head,dev')
WHERE job_title='Giam doc'; 
commit;
--b5. gan nhan cho user
--connect user sec_manager
BEGIN sa_user_admin.set_user_labels (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    user_name       => 'leduong', 
    max_read_label => 'CONF:DEV', 
    max_write_label => 'CONF:DEV', 
    min_write_label => 'PUB',  
    row_label  	=> 'CONF:DEV'
); 
END; 
COMMIT;

BEGIN sa_user_admin.set_user_privs (
    policy_name  => 'ACCESS_DEPARTMENT', 
    user_name     => 'ledat', 
    PRIVILEGES    => 'FULL'); 
END;

BEGIN sa_user_admin.set_user_labels (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    user_name       => 'tranvandai', 
    max_read_label => 'PUB:DEV', 
    max_write_label => 'PUB:DEV', 
    min_write_label => 'PUB',  
    row_label  	=> 'PUB:DEV'
); 
END; 
COMMIT;

-- xoa chinh sach cu või option NO CONTROL de tao chinh sach moi
--connect user policy_manager
BEGIN sa_policy_admin.remove_table_policy (
    policy_name   => 'ACCESS_DEPARTMENT', 
    schema_name    => 'managerdb', 
    table_name     => 'employees'
);
END;

BEGIN sa_policy_admin.apply_table_policy (
    policy_name    => 'ACCESS_DEPARTMENT', 
    schema_name     => 'managerdb', 
    table_name      => 'employees', 
    table_options   =>  'LABEL_DEFAULT, READ_CONTROL,WRITE_CONTROL,CHECK_CONTROL'
); 
END;


GRANT MANAGE ANY LABEL TO your_user_name;

