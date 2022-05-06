# Overview

This is a web application to keep track of time.  
User can create an account , keep track of their ongoing and completed tasks.  
This also let user set up their preferred working time, and display summary of their works.  
Additionally, the system supports manager and admin role, Where manager can modify users and admin can modify user as well as their records.  

# Technical Specification
1. UI is built with ReactJS.  
2. Backend created with Java Spring boot microservice (On OpenJdk 8) on top of PostgreSql database.  
3. For deploying docker & docker-compose is used.  
4. Front-end unit testing done with jest and react testing library, with 54% line coverage and 43% branch coverage.

# How to Setup
## Setup using docker
First, get [Docker](https://docs.docker.com/get-docker/) in your machine. 

1. from command line, run `docker compose up` from root folder. [The same folder this ReadMe is located.]

This will start front-end, backend and postgresql server. Front end will run on port 3000, backend will run in port 8080 
and postgresql will run on port 5432 by default.

2. After that you should be able to access the app using this url: http://localhost:3000

3. To stop servers just run  `docker compose down` 

TroubleShooting: 
-> Check whether port 8080, 3000 and 5432 is used by any other application and stop them. 
Or, you can configure ports in `.env` file. [.env file is present with the same root directory this readme is located]

-> If postgres fails to start, check `application.properties` file 
and replace `spring.datasource.url=jdbc:postgresql://localhost:5432/postgres` with 
`spring.datasource.url=jdbc:postgresql://postgres_db:5432/postgres` 

## Manual Setup

For windows: 

Front-end setup:
Pre requisite: Download and Install Node >= v16.x.x 
1. From frontend folder, run `npm install`
2. Then run `npm start`. This will start front end project at port 3000

Back-end setup:

1. Download and Install [Java 8](https://www.oracle.com/java/technologies/downloads/#java8-windows)
 You might need to create an Oracle account if haven't already
2. Go to Environment Variables.
 On User Variables section, add JAVA_HOME and set value to the url of JDK installation directory.
   eg. JAVA_HOME ='C:\Program Files\Java\jdk1.8.0_331'
 On System Variables section-> edit Path-> add new -> Add url of JDK/bin directory.
   eg. C:\Program Files\Java\jdk-13.0.2\bin

3. Download [Maven](https://maven.apache.org/download.cgi) , download the zip file. Extract it in `C:\Program Files`.
4. Again, go to Environment Variables. 
 On, User Variables section, add MAVEN_HOME and set value to the url of maven directory.
   Eg, `MAVEN_HOME = C:\Program Files\apache-maven-3.8.1-bin\apache-maven-3.8.1`
 On System Variables section -> edit Path -> add new -> Add url of maven/bin directory.
   Eg, `C:\Program Files\apache-maven-3.8.1-bin\apache-maven-3.8.1\bin`

5. Download and install [postgresql](https://www.postgresql.org/download/windows/) version 14.2
 When prompet  during installation, use username = 'postgres' and password = '1234'.
 Alternatively, use any username/password of your choice, then go to backend-> src->main->resources
 Edit the application.properties file and change the following values with your username/password:
 ```
 spring.datasource.username=postgres
 spring.datasource.password=1234
 ```
6. from command prompt,  run `mvn clean package` from /backend folder.
7. then run `java -jar backend.jar` from /backend/target folder.
 
 This should start the back-end project at port 8080.
 
 TroubleShooting: 
 In case of server not starting properly, 
 -> Check if postgresql is running. Do restart postgresql if needed. See online for more resources.
 -> Check if port 8080 is using by another service, if necessary kill this port and do step 7.
 
 
 For Mac and Linux Users:
 
 Steps mentioned for Windows will be slightly different for Mac/Linux. Kindly check online resource
 to complete the above mentioned steps for Windows.

## Testing Data
For Testing purpose, i have added following users  
Role Admin :  [email: admin@gmail.com, passowrd: 123456]  
Role Manager: [email: manager@gmail.com, password: 123456]  
Role User:    [email: user@gmail.com, passowrd: 123456]  

## API Documentation

API documentation is done using <b> Swagger </b>. Can be accessed using this
url `http://{domain:port}/swagger-ui.html` <br/>

For localhost using default settings, you can access documentation via this: `http://localhost:8080/swagger-ui.html`


## Currently supported operations
1. Login
2. SignUp
3. Create,update,delete and view completed task list
4. Create, update, delete and view ongoing task list
5. HTML report for viewing and sharing task summary
6. Account settings for preferred working hour 
7. Manager role to do operations on user
8. Admin role to do operations on both user and user data


## Operations for future considerations
1. User email verfication
2. Search filter on basis of user
3. Increase test coverage
 