FROM openjdk:17-jdk-alpine
COPY target/admin-service-0.0.1-SNAPSHOT.jar .
EXPOSE 8083
ENV EUREKA_HOST=service-registry
ENTRYPOINT ["java", "-jar", "admin-service-0.0.1-SNAPSHOT.jar"]