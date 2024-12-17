CREATE OR REPLACE FUNCTION policy_salary_emp 
( 
    p_schema  IN  VARCHAR2 DEFAULT NULL, 
    p_object  IN  VARCHAR2 DEFAULT NULL
) 
RETURN VARCHAR2 AS
    v_username VARCHAR2(60);
    v_role VARCHAR2(50);
    v_department VARCHAR2(50);
BEGIN 
    v_username := SYS_CONTEXT('USERENV', 'SESSION_USER');
    v_username := LOWER(v_username);

--    RETURN p_schema; 
--    v_username := 'leduong';
    SELECT job_title INTO v_role
    FROM managerdb.employees 
    WHERE USER_NAME = v_username;
    
    SELECT department_id INTO v_department
    FROM managerdb.employees 
    WHERE USER_NAME = v_username;
    
    if v_role = 'Nhân viên' THEN
        RETURN 'USER_NAME = ''' || v_username || '''';
    ELSIF v_role = 'Trưởng phòng' THEN
        RETURN 'DEPARTMENT_ID = ''' || v_department || '''';
    ELSIF v_role = 'Kế toán' THEN
        RETURN 'DEPARTMENT_ID != ''' || 'pb06' || '''';
    ELSIF v_role = 'Giám đốc' THEN
        RETURN '1=1';
    END IF;
--    RETURN '1=1'; 
END; 


BEGIN
    DBMS_RLS.ADD_POLICY(
        object_schema   => 'managerdb',  
        object_name     => 'employees', 
        policy_name     => 'salary_emp ',  
        function_schema => 'policy_manager',  
        policy_function => 'policy_salary_emp',  
        statement_types => 'SELECT',
        sec_relevant_cols => 'salary',
        sec_relevant_cols_opt => DBMS_RLS.all_rows
    );
END;

SELECT * FROM managerdb.employees


col predicate format a50; 
SELECT policy_manager.policy_salary_emp predicate FROM DUAL;
