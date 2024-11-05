# Student Management Project - Backend

## Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Architecture](#architecture)
4. [How to Run the Project](#how-to-run-the-project)
5. [Prerequisites](#prerequisites)
6. [Installation Instructions](#installation-instructions)
7. [Running the Backend](#running-the-backend)
8. [Running the Frontend](#running-the-frontend)
9. [API Documentation](#api-documentation)
10. [Testing](#testing)
11. [Contributing](#contributing)
12. [License](#license)

### Project Description

This project is a challenge involving the development of a backend API for student management. The API allows performing CRUD (Create, Read, Update, Delete) operations to manage student information, including fields such as name, email, RA (Academic Record) and CPF. Additionally, the API implements user authentication using JWT (JSON Web Token) to ensure secure access to resources.

## Code Quality Tools

- ESLint: Static code analyzer to identify and fix style and quality issues.
- Prettier: Code formatter that ensures consistent styling.
- Husky: Git hook manager to ensure code is formatted and tested before committing.
- Lint-staged: Runs linters only on files about to be committed.

## Libraries

- Express: Framework for building the REST API.
- PostgreSQL (pg): Client for interacting with the PostgreSQL database.
- Bcrypt: Library for password hashing.
- JSON Web Token (jsonwebtoken): Library for authentication using JWT tokens.
- CORS: Middleware to enable CORS on API routes.
- TypeORM: ORM for managing the database with TypeScript.
- Swagger JSDoc and Swagger UI Express: Tools for generating and presenting API documentation.

## Frameworks

- TypeScript: Superset of JavaScript that adds static typing to the language.
- Jest: Framework for unit tests and integration tests.
- ts-jest: Utility for using Jest with TypeScript.

### Architecture

The project is structured using the MVC (Model-View-Controller) architecture, which separates the application logic into three main components:

- Model: Defines the data structure and database access logic, allowing manipulation and validation of student data.
- View: Although there is no visualization layer in the backend, this part can be interpreted as the API response, which returns data in formats such as JSON.
- Controller: Manages the application's business logic, processing user requests, interacting with models, and returning appropriate responses.

Additionally, the project adopts good coding practices, such as:

- Dependency Injection: Facilitates code management and maintenance, promoting modularity and testability.
- DRY (Don't Repeat Yourself) Principle: Minimizes code duplication, making it cleaner and easier to maintain.

### How to Run the Project

#### Prerequisites

- Docker installed

#### Installation Instructions

Clone the project repository:

```bash
git clone https://github.com/Zezinhojun/educa.git
```

### Running the Backend

Navigate to the backend directory:

```bash
cd educa/educa_student_backend
```

The .env.example file is already configured in the repository, so you need to rename it to .env:

```bash
mv .env.example .env
```

Install the dependencies

```bash
npm install
```

Build and start Docker containers:

```bash
docker-compose up --build
```

The API will be available at:

- http://localhost:3000/api/students for student CRUD operations.
- http://localhost:3000/api/users for user authentication.

### Running the Frontend

Instructions for starting the frontend [README frontend](../educa_student_frontend/README.md)

### API Documentation

API documentation was generated using Swagger. You can access it at http://localhost:3000/api-docs after starting the server.

### Testing

The project includes unit and integration tests, written using Jest.
