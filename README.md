# Job Application Tracker

A full-stack web application for managing and tracking job applications in one place. Built with **React, Tailwind CSS, Java Spring Boot, and PostgreSQL**, this project demonstrates frontend development, REST API design, database integration, request validation, and exception handling.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Environment and Versions](#environment-and-versions)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## About the Project

Keeping track of multiple job applications can become difficult when information is scattered across spreadsheets, emails, and job portals.

The Job Application Tracker provides a centralized application through which users can record job applications, review their current status, and maintain details about their job search.

The project is being developed incrementally as a learning project to understand how a React frontend communicates with a Java Spring Boot backend and how application data is persisted in a relational database.

## Features

### Backend

- Create job applications.
- Retrieve all job applications.
- Retrieve a single application by ID.
- Update existing applications.
- Delete applications.
- Store application data in PostgreSQL.
- Validate required fields and field lengths.
- Return structured error responses for invalid requests.
- Handle requests for nonexistent application IDs with HTTP 404 responses.

### Frontend

- Dashboard layout with a sidebar.
- Statistics cards for application tracking.
- Applications table.
- Fetch real application data from the Spring Boot REST API.
- Display loading and error states.
- Application form UI for entering job details (integration and testing in progress).

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend framework | React | Build the user interface |
| Frontend build tool | Vite | Development server and build tooling |
| CSS framework | Tailwind CSS | Responsive styling |
| Backend framework | Spring Boot | Develop REST APIs |
| Programming language | Java | Backend development |
| ORM | Spring Data JPA / Hibernate | Database persistence |
| Database | PostgreSQL | Store job applications |
| Database container | Docker | Run PostgreSQL locally |
| API testing | Postman | Test REST endpoints |
| Development environment | Windows + VS Code | Write and run the application |

## Architecture

The application follows a three-layer architecture:

1. **Frontend:** React renders the dashboard and sends HTTP requests using the Fetch API.
2. **Backend:** Spring Boot controllers receive requests, services implement application logic, and repositories access the database.
3. **Database:** PostgreSQL stores job application records.

```text
React + Tailwind CSS
        |
        | HTTP / JSON
        v
Spring Boot REST API
        |
        v
Controller
        |
        v
Service Layer
        |
        v
Spring Data JPA Repository
        |
        v
PostgreSQL
```

## Prerequisites

Install the following software before running the project:

- **Java JDK 25** or the JDK version configured by your Spring Boot project.
- **Node.js and npm** compatible with the installed Vite version.
- **Docker Desktop** for Windows.
- **Visual Studio Code**.
- **Postman** for API testing.
- Git, if you want to version-control the project and push it to GitHub.

Verify your installations using PowerShell or the VS Code terminal:

```powershell
java -version
javac -version
node --version
npm --version
docker --version
git --version
```

Check that Docker Desktop is running:

```powershell
docker info
```

## Environment and Versions

The following versions and settings reflect the development environment used or recorded during development. Verify locally installed versions before publishing this README as a definitive environment specification.

| Software | Version / Configuration |
|---|---|
| Operating system | Windows |
| Java | JDK 25 |
| Spring Boot | 4.1.1 |
| PostgreSQL | 16.15 |
| PostgreSQL Docker image | `postgres:16-alpine` |
| React | Verify using `npm list react` |
| Vite | Verify using `npm list vite` |
| Tailwind CSS | Version 4.x setup |
| Node.js | Verify using `node --version` |
| npm | Verify using `npm --version` |
| Backend port | `8081` |
| Frontend development port | `5173` |
| PostgreSQL port | `5432` |

To check the exact frontend dependency versions, run this command inside the frontend directory:

```powershell
npm list react react-dom vite tailwindcss @tailwindcss/vite
```

For the Spring Boot version, check `pom.xml` or run:

```powershell
.\mvnw.cmd --version
```

The last command also reports the Java version used by Maven.

## Project Structure

The frontend and backend can be maintained in separate directories or repositories.

### Backend

```text
job-tracker-backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/jobtracker/
│       │       ├── config/
│       │       │   └── CorsConfig.java
│       │       ├── controller/
│       │       │   └── JobApplicationController.java
│       │       ├── entity/
│       │       │   └── JobApplication.java
│       │       ├── exception/
│       │       │   ├── ApplicationNotFoundException.java
│       │       │   └── GlobalExceptionHandler.java
│       │       ├── repository/
│       │       │   └── JobApplicationRepository.java
│       │       ├── service/
│       │       │   └── JobApplicationService.java
│       │       └── DemoApplication.java
│       └── resources/
│           └── application.properties
└── pom.xml
```

### Frontend

```text
job-tracker-frontend/
├── src/
│   ├── api/
│   │   └── applications.js
│   ├── components/
│   │   ├── ApplicationForm.jsx
│   │   ├── ApplicationTable.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

The structure above documents the intended layout. Keep the files and names aligned with your actual project.

## Database Setup

PostgreSQL is run locally using Docker.

### 1. Start PostgreSQL

Run the following command in PowerShell:

```powershell
docker run -d `
  --name jobtracker-postgres `
  -e POSTGRES_DB=jobtracker `
  -e POSTGRES_USER=jobtracker_user `
  -e POSTGRES_PASSWORD=local_dev_password `
  -p 5432:5432 `
  -v jobtracker_data:/var/lib/postgresql/data `
  postgres:16-alpine
```

This creates a PostgreSQL container and a persistent Docker volume so database records survive container restarts.

If the container already exists, start it instead of creating another one:

```powershell
docker start jobtracker-postgres
```

Verify the container:

```powershell
docker ps
```

### 2. Configure the database connection

In the backend's `src/main/resources/application.properties`, configure:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobtracker
spring.datasource.username=jobtracker_user
spring.datasource.password=local_dev_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
```

These are local development credentials. Do not use hardcoded passwords or commit real production credentials to GitHub.

For production, configure credentials through environment variables or a secrets manager.

The `ddl-auto=update` setting allows Hibernate to update the database schema based on entity changes during development. For production, use a managed migration tool such as Flyway or Liquibase.

## Backend Setup

### 1. Open the backend project

Open the directory containing `pom.xml` in VS Code.

### 2. Configure the port

Make sure `application.properties` contains:

```properties
server.port=8081
```

### 3. Run Spring Boot

If the project includes the Maven wrapper, execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Alternatively, use Maven if it is installed:

```powershell
mvn spring-boot:run
```

Wait until the application starts successfully and connects to PostgreSQL.

The backend base URL is:

```text
http://localhost:8081
```

## Frontend Setup

### 1. Open the frontend directory

Open a second VS Code terminal and navigate to the directory containing the frontend's `package.json`.

```powershell
cd path\to\job-tracker-frontend
```

Replace the example path with the actual directory on your computer.

### 2. Install dependencies

```powershell
npm install
```

### 3. Configure Tailwind CSS

The project uses the Tailwind CSS v4 Vite integration.

Install the dependencies if needed:

```powershell
npm install tailwindcss @tailwindcss/vite
```

The `vite.config.js` file should include the React and Tailwind plugins:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In `src/index.css`, use:

```css
@import "tailwindcss";
```

Make sure `src/main.jsx` imports the stylesheet:

```javascript
import './index.css'
```

### 4. Configure frontend-to-backend communication

The frontend API module uses this development URL:

```javascript
const API_URL = 'http://localhost:8081/api/applications'
```

Spring Boot must allow requests from the Vite development origin:

```text
http://localhost:5173
```

The backend's CORS configuration should permit the required API methods, including GET, POST, PUT, DELETE, and OPTIONS.

### 5. Start the frontend

```powershell
npm run dev
```

Open the URL displayed by Vite, typically:

```text
http://localhost:5173
```

Keep the backend, database, and frontend running while testing the application.

## API Endpoints

The REST API uses the base path `/api/applications`.

| Method | Endpoint | Description | Expected success |
|---|---|---|---|
| POST | `/api/applications` | Create an application | `201 Created` |
| GET | `/api/applications` | Retrieve all applications | `200 OK` |
| GET | `/api/applications/{id}` | Retrieve an application by ID | `200 OK` |
| PUT | `/api/applications/{id}` | Update an application | `200 OK` |
| DELETE | `/api/applications/{id}` | Delete an application | `204 No Content` |

### Example request body

Use this JSON when creating an application:

```json
{
  "companyName": "Microsoft",
  "jobTitle": "Software Engineer",
  "status": "APPLIED",
  "appliedDate": "2026-10-24",
  "notes": "Applied through the company careers page"
}
```

`companyName` and `jobTitle` are required. The application also supports statuses such as `APPLIED`, `INTERVIEW`, `OFFER`, and `REJECTED`.

### Example validation response

Invalid requests return HTTP `400 Bad Request`. The validation handler returns field-specific messages, for example:

```json
{
  "status": 400,
  "error": "Bad Request",
  "messages": {
    "companyName": "Company name is required",
    "jobTitle": "Job title is required"
  }
}
```

### Example not-found response

When an application ID does not exist, the API returns HTTP `404 Not Found`.

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Job application not found with ID: 999"
}
```

## Testing the Application

### Test the backend with Postman

1. Start PostgreSQL and Spring Boot.
2. Send a GET request to `http://localhost:8081/api/applications`.
3. Create a record with a POST request and the JSON body above.
4. Retrieve the created record using its ID.
5. Update it using PUT.
6. Delete it using DELETE.
7. Try an invalid request and a nonexistent ID to verify error handling.

### Test the frontend

1. Start the backend and database.
2. Start Vite.
3. Open `http://localhost:5173`.
4. Confirm that the applications table displays records from PostgreSQL.
5. Verify the browser console for errors if data fails to load.

## Troubleshooting

### Frontend cannot fetch applications

- Verify that Spring Boot is running on port `8081`.
- Confirm that PostgreSQL is running.
- Test `GET http://localhost:8081/api/applications` directly in Postman.
- Check the browser console for CORS or network errors.
- Confirm that the frontend API URL matches the backend URL.

### PostgreSQL connection failure

Check the container status:

```powershell
docker ps
```

Inspect the logs:

```powershell
docker logs jobtracker-postgres
```

Verify the database name, username, password, and port in `application.properties`.

### Tailwind styles are not applied

- Confirm that `@tailwindcss/vite` is installed.
- Verify the Tailwind plugin is configured in `vite.config.js`.
- Confirm `src/index.css` contains `@import "tailwindcss";`.
- Restart the Vite development server after configuration changes.

### Frontend becomes blank

- Open browser Developer Tools using F12.
- Inspect the Console tab for the first runtime error.
- Check the VS Code terminal running Vite for compilation errors.
- Verify component import paths and default exports.

## Future Improvements

Planned improvements include:

- Complete and test the create-application frontend workflow.
- Implement edit and delete actions in the UI.
- Calculate dashboard statistics from actual application data.
- Add search by company name and job title.
- Add status filtering, pagination, and sorting.
- Improve responsive design and user feedback.
- Add automated backend and frontend tests.
- Add authentication and user-specific application data.
- Use database migrations and environment-based configuration.
- Deploy the application and document the production setup.

## Learning Outcomes

This project provides practical experience with:

- Java and Spring Boot application development.
- REST API design and HTTP status codes.
- Controller-service-repository architecture.
- Spring Data JPA and Hibernate.
- PostgreSQL and Docker.
- Request validation and centralized exception handling.
- React components, props, and state.
- Fetch API integration between frontend and backend.
- Tailwind CSS and Vite.
- Debugging and API testing with Postman.

---

**Status:** Development in progress.
