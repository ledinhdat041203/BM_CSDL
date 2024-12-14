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
BEGIN 
    sa_components.create_level (policy_name  => 'ACCESS_DEPARTMENT', long_name => 'PUBLIC',       short_name => 'PUB',  level_num => 1000); 
    sa_components.create_level (policy_name  => 'ACCESS_DEPARTMENT', long_name => 'CONFIDENTIAL', short_name => 'CONF', level_num  	=> 2000);
    sa_components.create_level (policy_name  => 'ACCESS_DEPARTMENT', long_name => 'SENSITIVE',    short_name => 'SENS', level_num  	=> 3000); 
END;

-- --- ham xoa 1 level
BEGIN 
    sa_components.drop_level (policy_name => 'ACCESS_DEPARTMENT',short_name  => 'SENS'); 
END; 

-- Tao cac compartment 

BEGIN 
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'TECHNICAL', short_name => 'TECH', comp_num => 100); 
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'BUSINESS',  short_name => 'BUS', comp_num => 400);
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'FINANCE',   short_name => 'FIN', comp_num => 500); 
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'MARKETING', short_name => 'MAR', comp_num => 600);
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'HUMAN_RESOURCES', short_name => 'HR', comp_num  => 700);
    sa_components.create_compartment (policy_name => 'ACCESS_DEPARTMENT', long_name => 'DIRECTOR', short_name => 'DIR', comp_num  => 800); 
END;
--Xoa 1 compartment
BEGIN 
    sa_components.drop_compartment (policy_name => 'ACCESS_DEPARTMENT', short_name => 'HR'); 
END;

--B3. Tao nhan that tu cac thanh phan o b2

BEGIN 
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '10100', label_value => 'PUB:TECH'); --nhan vien phong ki thuat
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '10200', label_value => 'PUB:FIN'); --nhan vien phong Tai Chinh
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '10300', label_value => 'PUB:BUS'); --nhan vien phong Kinh doanh
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '10400', label_value => 'PUB:MAR'); --nhan vien phong marketing
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '10500', label_value => 'PUB:HR'); --nhan vien phong nhan su
    
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '20100', label_value => 'CONF:TECH'); --truong phong ki thuat
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '20200', label_value => 'CONF:FIN'); --truong phong Tai Chinh
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '20300', label_value => 'CONF:BUS'); --truong phong Kinh doanh
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '20400', label_value => 'CONF:MAR'); --truong phong marketing
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '20500', label_value => 'CONF:HR'); --truong phong+ nhan vien phong Nhan su
    
    sa_label_admin.create_label (policy_name => 'ACCESS_DEPARTMENT', label_tag 	=> '31100', label_value => 'SENS:TECH,FIN,BUS,MAR,HR,DIR'); --Ban giam doc, Ke toan
END;

--ap dung chinh sach len bang
BEGIN 
    sa_policy_admin.apply_table_policy (policy_name => 'ACCESS_DEPARTMENT',schema_name => 'managerdb',table_name => 'employees', table_options => 'NO_CONTROL'); 
END; 

--Xoa lable 
BEGIN 	 	 
    sa_label_admin.drop_label (policy_name => 'ACCESS_DEPARTMENT', label_tag =>  20100); 
END;  


--b4. Gan Nhan cho du lieu
--connect user policy_manager
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'PUB:TECH')WHERE job_title='Nhân viên' AND DEPARTMENT_ID = 'pb01'; 
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'PUB:FIN')WHERE job_title='Nhân viên' AND DEPARTMENT_ID = 'pb02';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'PUB:BUS')WHERE job_title='Nhân viên' AND DEPARTMENT_ID = 'pb03';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'PUB:MAR')WHERE job_title='Nhân viên' AND DEPARTMENT_ID = 'pb04';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'PUB:HR')WHERE job_title='Nhân viên' AND DEPARTMENT_ID = 'pb05';

UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'CONF:TECH')WHERE job_title='Trý?ng ph?ng' AND DEPARTMENT_ID = 'pb01'; 
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'CONF:FIN')WHERE job_title='Trý?ng ph?ng' AND DEPARTMENT_ID = 'pb02';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'CONF:BUS')WHERE job_title='Trý?ng ph?ng' AND DEPARTMENT_ID = 'pb03';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'CONF:MAR')WHERE job_title='Trý?ng ph?ng' AND DEPARTMENT_ID = 'pb04';
UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'CONF:HR') WHERE job_title='Trý?ng ph?ng' AND DEPARTMENT_ID = 'pb05';

UPDATE managerdb.employees SET OLS_DEPT = char_to_label('ACCESS_DEPARTMENT', 'SENS:TECH,FIN,BUS,MAR,HR,DIR')WHERE DEPARTMENT_ID = 'pb06';
commit;

--b5. gan nhan cho user
--connect user sec_manager
BEGIN sa_user_admin.set_user_labels (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    user_name       => 'leduong', 
    max_read_label => 'CONF:TECH', 
    max_write_label => 'CONF:TECH', 
    min_write_label => 'PUB',  
    row_label  	=> 'CONF:TECH'
); 
END; 
COMMIT;

BEGIN sa_user_admin.set_user_labels (
    policy_name 	=> 'ACCESS_DEPARTMENT', 
    user_name       => 'ledat', 
    max_read_label => 'SENS:TECH,FIN,BUS,MAR,HR,DIR', 
    max_write_label => 'SENS:TECH,FIN,BUS,MAR,HR,DIR', 
    min_write_label => 'PUB',  
    row_label  	=> 'SENS:TECH,FIN,BUS,MAR,HR,DIR'
); 
END;  

--cap full quyen
BEGIN sa_user_admin.set_user_privs (
    policy_name  => 'ACCESS_DEPARTMENT', 
    user_name     => 'policy_manager', 
    PRIVILEGES    => 'Full'); 
END;
--xoa full quyen
BEGIN sa_user_admin.set_user_privs (
    policy_name  => 'ACCESS_DEPARTMENT', 
    user_name     => 'ledat', 
    PRIVILEGES    => null); 
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

--xoa chinh sach
BEGIN 
    sa_policy_admin.remove_table_policy (policy_name => 'ACCESS_DEPARTMENT', schema_name => 'managerdb',table_name => 'employees');
END;
--ap dung chinh sach
BEGIN 
    sa_policy_admin.apply_table_policy (policy_name => 'ACCESS_DEPARTMENT',schema_name => 'managerdb',table_name => 'employees',
                                        table_options   =>  'LABEL_DEFAULT, READ_CONTROL,WRITE_CONTROL,CHECK_CONTROL'); 
END;

