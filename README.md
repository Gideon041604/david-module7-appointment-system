# Appointment Management System — Frontend

## Student Information
- Name: Ruben Puno
- Course and Section: BSCS 3A
- Subject: Software Engineering 1
- Module: Module 7 - Design and Implementation
- Instructor: Patrick Jason L. Torres

## Project Overview
This is a frontend prototype of the Appointment Management System, implementing the presentation and application-logic layers of the three-tier architecture proposed in Module 6. The application allows users to create, view, update, and delete appointment records, using browser localStorage as a temporary data layer.

## Connection to Module 6
This implementation continues the architectural design documented in the Module 6 repository (`surname-module6-architecture`). The mapping from design to implementation is as follows:

| Module 6 Design Element | Module 7 Implementation |
|---|---|
| Presentation layer (Vue.js) | Vue Single-File Components styled with Tailwind CSS |
| Application layer (Node.js/Express) | JavaScript functions in `App.vue` that apply CRUD rules |
| Data layer (MongoDB Atlas) | Browser localStorage (temporary, for this prototype only) |
| Primary record: Appointment | `clientName`, `service`, `appointmentDate`, `appointmentTime`, `status` |

**Note:** localStorage is used only to demonstrate the frontend design-to-code transition. It is not a server database and does not support multiple users. A real API and database remain a future implementation boundary.

## Features Implemented
1. Create a new appointment.
2. View all appointments in a table.
3. Update/reschedule an appointment.
4. Delete an appointment (with confirmation).
5. Mark an appointment as completed.
6. Search/filter appointments by client name or service.

## Technology Stack
- Frontend Framework: Vue.js 3 (Composition API, `<script setup>`)
- Build Tool: Vite
- Styling: Tailwind CSS
- Data Persistence (prototype only): Browser localStorage
- Version Control: Git and GitHub
- Continuous Integration: GitHub Actions (build check on push)

## Project Structure
```text
module7-vue-system/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── AppointmentForm.vue
│   │   ├── AppointmentTable.vue
│   │   ├── SearchBar.vue
│   │   └── StatusMessage.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## How to Run Locally
```bash
npm install
npm run dev
```
Then open the local address shown in the terminal (commonly `http://localhost:5173/`).

## How to Build for Production
```bash
npm run build
```
This generates a `dist/` folder containing the production-ready static files.

## Continuous Integration
A GitHub Actions workflow (`.github/workflows/ci.yml`) automatically runs `npm ci` and `npm run build` on every push to `main`, verifying that the application builds successfully.

## Project Status
This is a frontend prototype demonstrating CRUD operations using localStorage. A backend API, MongoDB Atlas connection, authentication, and deployment are not part of this module and remain future extensions.