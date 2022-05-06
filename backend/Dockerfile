
#
# Build stage
#
FROM maven:3.8.4-openjdk-8-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

#
# Deploy stage
#
FROM openjdk:8-jdk-slim
RUN mkdir ~/workdir
COPY --from=build /home/app/target/backend.jar ~/workdir/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","~/workdir/app.jar"]
