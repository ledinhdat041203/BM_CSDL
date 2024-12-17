-----------------connect user sys---------------

CREATE USER managerdb IDENTIFIED BY ledinhdat;

GRANT CREATE SESSION TO managerdb;

GRANT DBA TO managerdb;
GRANT GRANT ANY PRIVILEGE TO managerdb;

--cap quyen tao user
GRANT CREATE USER TO managerdb;
GRANT ALTER USER TO managerdb;
GRANT GRANT ANY OBJECT PRIVILEGE TO managerdb;
GRANT CREATE SESSION TO managerdb;


GRANT CREATE TABLE, CREATE VIEW, CREATE PROCEDURE, CREATE SEQUENCE TO managerdb;
GRANT SELECT ANY TABLE, INSERT ANY TABLE, UPDATE ANY TABLE, DELETE ANY TABLE TO MANAGERDB;

GRANT EXECUTE ON DBMS_RLS TO managerdb;

GRANT UNLIMITED TABLESPACE TO managerdb;
ALTER USER managerdb QUOTA UNLIMITED ON users;

SELECT * 
FROM DBA_ROLE_PRIVS 
WHERE GRANTEE = 'MANAGERDB';

SELECT * 
FROM DBA_TAB_PRIVS 
WHERE GRANTEE = 'MANAGERDB' AND TABLE_NAME = 'CONFIGURE_OLS';

GRANT LBAC_DBA TO MANAGERDB;
GRANT EXECUTE ON LBACSYS.CONFIGURE_OLS TO MANAGERDB;

-- manager tao database
CREATE USER data_manager IDENTIFIED BY ledinhdat;
ALTER USER data_manager QUOTA UNLIMITED ON USERS;
GRANT CREATE SESSION TO data_manager;
GRANT CREATE TABLE, CREATE VIEW, CREATE PROCEDURE, CREATE SEQUENCE TO data_manager;


--manager gan quyen
CREATE USER sec_manager IDENTIFIED BY ledinhdat;
ALTER USER sec_manager QUOTA UNLIMITED ON USERS;
GRANT CREATE SESSION TO sec_manager;
GRANT CREATE USER TO sec_manager;
GRANT ALTER USER TO sec_manager;
GRANT DROP USER TO sec_manager;
GRANT GRANT ANY PRIVILEGE TO sec_manager;
GRANT CREATE ROLE TO sec_manager;
GRANT ALTER ANY ROLE TO sec_manager;
GRANT CREATE PROCEDURE TO sec_manager;
GRANT SELECT ANY TABLE, INSERT ANY TABLE, UPDATE ANY TABLE, DELETE ANY TABLE TO sec_manager;
GRANT DBA TO sec_manager;
GRANT GRANT ANY OBJECT PRIVILEGE TO sec_manager;
GRANT LBAC_DBA TO sec_manager;



--manager quan ly chinh sach
CREATE USER policy_manager IDENTIFIED BY ledinhdat;
ALTER USER policy_manager QUOTA UNLIMITED ON USERS;

GRANT CREATE SESSION TO policy_manager;
ALTER USER policy_manager QUOTA UNLIMITED ON USERS;
GRANT CREATE PROCEDURE TO policy_manager;
GRANT EXECUTE ON DBMS_MACADM TO policy_manager;
GRANT EXECUTE ON DBMS_RLS TO policy_manager;
GRANT SELECT ANY DICTIONARY TO policy_manager;
GRANT SELECT ANY TABLE, INSERT ANY TABLE, UPDATE ANY TABLE, DELETE ANY TABLE TO policy_manager;


SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'SEC_MANAGER';
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'SEC_MANAGER';
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'POLICY_MANAGER';
GRANT EXECUTE ON DBMS_MACADM TO SEC_MANAGER;

SELECT * 
FROM DBA_POLICY_PRIVS 
WHERE POLICY_NAME = 'ACCESS_DEPARTMENT' 
  AND GRANTEE = 'sec_manager';
  
  
  SELECT * FROM nls_database_parameters WHERE parameter = 'NLS_CHARACTERSET';