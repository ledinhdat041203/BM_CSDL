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
        VALUES ('nv01', 'ledat', 'ledinhdat', 'dat', 'lee', '123-456-7890', 'pb06', 50000, 'Giám đốc')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv02', 'leduong', 'ledinhdat', 'duong', 'lee', '123-456-7890', 'pb01', 50000, 'Trưởng phòng')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv03', 'tranvandai', 'ledinhdat', 'dai', 'tran van', '123-456-7890', 'pb01', 50000, 'Nhân viên')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv04', 'lehung', 'ledinhdat', 'hung', 'lee', '123-456-7890', 'pb02', 50000, 'Trưởng phòng')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv05', 'lehy', 'ledinhdat', 'hy', 'lee', '123-456-7890', 'pb02', 50000, 'Nhân viên')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv06', 'chihung', 'ledinhdat', 'hung', 'chi', '123-456-7890', 'pb02', 50000, 'Nhân viên')
    -- Phòng Kỹ thuật - pb01
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv07', 'kithuat01', 'ledinhdat', 'An', 'Nguyen', '123-456-7891', 'pb01', 60000, 'Nhân viên')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv08', 'kithuat02', 'ledinhdat', 'Duy', 'Tran', '123-456-7892', 'pb01', 55000, 'Nhân viên')
nv09
    -- Phòng Tài chính - pb02
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('', 'taichinh01', 'ledinhdat', 'Dung', 'Pham', '123-456-7893', 'pb02', 70000, 'Nhân viên')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv10', 'taichinh02', 'ledinhdat', 'Accounting', 'Le', '123-456-7894', 'pb02', 65000, 'Nhân viên')

    -- Phòng Kinh doanh - pb03
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv11', 'kinhdoanh01', 'ledinhdat', 'Thao', 'Hoang', '123-456-7895', 'pb03', 60000, 'Trưởng phòng')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv12', 'kinhdoanh02', 'ledinhdat', 'Hung', 'Do', '123-456-7896', 'pb03', 58000, 'Nhân viên')

    -- Phòng Marketing - pb04
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv13', 'marketing01', 'ledinhdat', 'Jun', 'Vu', '123-456-7897', 'pb04', 60000, 'Trưởng phòng')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv14', 'marketing02', 'ledinhdat', 'Nam', 'Nguyen', '123-456-7898', 'pb04', 58000, 'Nhân viên')

    -- Phòng Nhân sự - pb05
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv15', 'nhansu01', 'ledinhdat', 'Long', 'Nguyen', '123-456-7899', 'pb05', 62000, 'Trưởng phòng')
    INTO managerdb.employees (employee_id, user_name, pass, first_name, last_name, phone_number, department_id, salary, job_title)
        VALUES ('nv16', 'nhansu02', 'ledinhdat', 'Dat', 'Pham', '123-456-7810', 'pb05', 60000, 'Nhân viên')
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

