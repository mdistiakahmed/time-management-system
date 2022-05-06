DROP TABLE IF EXISTS t_user;
DROP TABLE IF EXISTS t_task;
DROP TABLE IF EXISTS t_task_summary;

create table t_user (id serial PRIMARY KEY, email varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL,role VARCHAR(20) NOT NULL, preferred_working_hour DECIMAL(10,2) NOT NULL);
create table t_task (id serial PRIMARY KEY, assignee varchar(255) NOT NULL, description varchar(255) NOT NULL, status varchar(20) NOT NULL, start_time_in_millis BIGINT, completion_date DATE, duration DECIMAL(10,2), version INT);
create table t_task_summary (id serial PRIMARY KEY, assignee varchar(255) NOT NULL, completion_date DATE NOT NULL, total_duration DECIMAL(10,2), task_count INT, current_preferred_working_hour DECIMAL(10,2), version INT);


INSERT INTO t_user (id, email, password, role, preferred_working_hour) VALUES (500, 'admin@gmail.com', '$2a$10$0N92yC/0UrfmVzn8ilH6GO7p/m.6yHYo5/CpdRJnvCt2kimGP.c1G', 'ROLE_ADMIN', 15);
INSERT INTO t_user (id, email, password, role, preferred_working_hour) VALUES (501, 'manager@gmail.com', '$2a$10$0N92yC/0UrfmVzn8ilH6GO7p/m.6yHYo5/CpdRJnvCt2kimGP.c1G', 'ROLE_MANAGER', 10);
INSERT INTO t_user (id, email, password, role, preferred_working_hour) VALUES (502, 'user@gmail.com', '$2a$10$0N92yC/0UrfmVzn8ilH6GO7p/m.6yHYo5/CpdRJnvCt2kimGP.c1G', 'ROLE_USER', 8);
