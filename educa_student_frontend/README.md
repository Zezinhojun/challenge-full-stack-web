# Student Management Project - Frontend

## Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Architecture](#architecture)
4. [How to Run the Project](#how-to-run-the-project)
5. [Prerequisites](#prerequisites)
6. [Running the Backend](#running-the-backend)
7. [Installation Instructions](#installation-instructions)

## Project Description

This is the frontend of the student management system, built with Vue 3 and Vuetify. The application provides a user-friendly interface for users to view and manage student information, integrating with the backend for CRUD operations and user authentication.

## Technologies Used

- Vue 3: Progressive JavaScript framework.
- Vuetify: UI library based on Material Design for Vue.js.
- Vuex: State management for Vue.js.
- Axios: HTTP client for communication with the API.
- Vee-Validate: For form validation.
- Yup: Data validation library.

## Architecture

The project structure follows best practices in Vue 3 development:

- Components: Components are organized by functionalities and reused throughout the application.
- Vuex for State Management: Manages global data, including user authentication status.
- Modularity: The application is divided into modules that facilitate maintenance and scalability.

## How to Run the Project

### Prerequisites

### Running the backend

backend [README backend](../educa_student_backend/README.md)

Node.js and npm installed on your machine.

### Installation Instructions

```bash
cd educa/educa_student_frontend
```

Install the dependencies

```bash
npm install
```

Start the project:

```bash
npm run dev
```

The API will be available at:

- http://localhost:8080
