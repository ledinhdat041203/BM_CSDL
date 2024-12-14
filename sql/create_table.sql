--connect user managerdb

CREATE TABLE data_manager.employees (
    employee_id VARCHAR2(50) PRIMARY KEY,
    user_name VARCHAR2(50),
    pass VARCHAR2(50),
    first_name VARCHAR2(50),
    last_name VARCHAR2(50),
    phone_number VARCHAR2(50),
    department_id VARCHAR2(50),
    salary NUMBER,
    job_title VARCHAR2(50)
);

CREATE TABLE data_manager.departments (
    department_id VARCHAR2(50) PRIMARY KEY,
    department_name VARCHAR2(100)
);

CREATE TABLE data_manager.salaries (
    employee_id VARCHAR2(50) PRIMARY KEY,
    salary_amount NUMBER,
    start_date DATE,
    end_date DATE
);


INSERT ALL
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv01', 'ledat', 'ledinhdat', 'dat', 'lee', '123-456-7890', 'pb03', 50000, 'Giam doc')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv02', 'leduong', 'ledinhdat', 'duong', 'lee', '123-456-7890', 'pb01', 50000, 'Truong phong')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv03', 'tranvandai', 'ledinhdat', 'dai', 'tran van', '123-456-7890', 'pb01', 50000, 'Developer')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv04', 'lehung', 'ledinhdat', 'hung', 'lee', '123-456-7890', 'pb02', 50000, 'Truong phong')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv05', 'lehy', 'ledinhdat', 'hy', 'lee', '123-456-7890', 'pb02', 50000, 'Developer')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv06', 'chihung', 'ledinhdat', 'hung', 'chi', '123-456-7890', 'pb02', 50000, 'Developer')
SELECT * FROM dual;
COMMIT;


SELECT * FROM managerdb.employees

DELETE FROM managerdb.employees

BEGIN
    managerdb.create_oracle_user_proc('leduong', 'ledinhdat');
END;


DROP USER leduong

ALTER TABLE managerdb.employees DROP (OLS_DEPT);


SELECT * FROM V$OPTION WHERE PARAMETER = 'Oracle Label Security';

