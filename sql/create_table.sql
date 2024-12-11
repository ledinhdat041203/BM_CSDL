--connect user managerdb

CREATE TABLE managerdb.employees (
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

CREATE TABLE managerdb.departments (
    department_id VARCHAR2(50) PRIMARY KEY,
    department_name VARCHAR2(100)
);

CREATE TABLE managerdb.salaries (
    employee_id VARCHAR2(50) PRIMARY KEY,
    salary_amount NUMBER,
    start_date DATE,
    end_date DATE
);


INSERT INTO managerdb.employees (
    employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title
) VALUES (
    'nv01', 'ledat', 'ledinhdat', 'dat', 'lee', '123-456-7890', 'pb01', 50000, 'Developer'
);
SELECT * FROM employees


---- create user
--CREATE USER ledat IDENTIFIED BY ledinhdat 
--DEFAULT TABLESPACE users 
--QUOTA UNLIMITED ON users;
--GRANT CREATE SESSION TO ledat;
--GRANT SELECT, INSERT, UPDATE, DELETE ON managerdb.employees TO ledat;
