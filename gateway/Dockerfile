FROM openjdk:17-jdk
COPY target/api-gateway.jar .
EXPOSE 8765
ENV EUREKA_HOST=service-registry
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]