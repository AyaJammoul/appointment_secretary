CREATE TABLE new (
  id int NOT NULL PRIMARY KEY,
  name varchar(100) DEFAULT NULL,
  mobile varchar(15) DEFAULT NULL,
  city varchar(50) DEFAULT NULL,
  age int DEFAULT NULL,
  is_first_time tinyint DEFAULT NULL,
  gender varchar(10) DEFAULT NULL CHECK (gender IN ('Male', 'Female')),
  appointment_date date DEFAULT NULL,
  appointment_time time DEFAULT NULL,
  narration text DEFAULT NULL,
  status varchar(50) DEFAULT 'pending'
);
