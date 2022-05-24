-- set AUTOCOMMIT on;
drop database if exists pizzas; create database pizzas; create user myuser with password 'password'; grant all privileges on database pizzas to myuser;