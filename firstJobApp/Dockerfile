# Step 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 as builder

WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the built jar file from the previous stage
COPY --from=builder /app/target/*.jar app.jar

# Set environment variables for application
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
