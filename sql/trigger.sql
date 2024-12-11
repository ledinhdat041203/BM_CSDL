BEGIN
   DBMS_SCHEDULER.create_job (
      job_name        => 'CREATE_USER_JOB',
      job_type        => 'PLSQL_BLOCK',
      job_action      => 'BEGIN create_oracle_user_proc(:user_name, :pass); END;',
      start_date      => SYSTIMESTAMP,
      enabled         => FALSE
   );
END;

CREATE OR REPLACE TRIGGER create_oracle_user_trigger
    AFTER INSERT ON managerdb.employees
    FOR EACH ROW
BEGIN
    -- K�ch ho?t job �? t?o t�i kho?n Oracle cho nh�n vi�n m?i
    DBMS_SCHEDULER.set_job_argument_value(
        job_name      => 'CREATE_USER_JOB',
        argument_position => 1,
        argument_value => :NEW.user_name
    );

    DBMS_SCHEDULER.set_job_argument_value(
        job_name      => 'CREATE_USER_JOB',
        argument_position => 2,
        argument_value => :NEW.pass
    );

    -- K�ch ho?t job
    DBMS_SCHEDULER.enable( 'CREATE_USER_JOB' );
END;