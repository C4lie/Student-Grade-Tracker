# Project Specification

## Student Grade Tracker

---

# 1. Project Overview

Student Grade Tracker is a simple academic web application that allows users to manage student grades and monitor academic performance.

The system is designed as a beginner-friendly project for educational purposes. It focuses on clean UI, simple workflow, and basic CRUD operations.

Users can:

• Register an account
• Login into the system
• Add student records
• View student grade list
• Track academic performance
• Delete student records

The application should be simple, clean, and easy to understand.

The frontend design should be modern and minimal.

---

# 2. Technology Approach

This project should remain lightweight and simple.

Frontend
React + Vite

Storage
Browser localStorage (no heavy backend required)

Authentication
Simple browser session using localStorage

No database server is required.

---

# 3. Website Layout

The UI layout should follow a centered dashboard design.

Structure:

Top Right
User welcome text and logout button

Main Center
Application title and dashboard

Below
Student management area

Layout structure:

App
│
├── Header
├── Dashboard
└── Student List

---

# 4. Pages

The application should contain the following pages.

## 4.1 Authentication Page

This page includes login and signup functionality.

Sections:

Header
Student Grade Tracker logo and title

Authentication Card
Login / Signup switch tabs

Login form fields

Email
Password

Signup form fields

Full Name
Email
Password

Buttons

Login
Sign Up

Once login is successful the user should be redirected to the dashboard.

---

# 4.2 Dashboard Page

The dashboard is the main page of the system.

Header Section

Logo icon
Title: Student Grade Tracker
Subtitle: Manage your grades and track academic performance

Top Right Section

Welcome message with user name
Logout button

Main Section

Add Student Button

Student List Container

If no students exist show message:

"No students yet. Click Add New Student to get started."

---

# 4.3 Add Student Modal

When clicking "Add New Student" a form modal should appear.

Fields

Student Name
Subject
Grade
Semester

Buttons

Save
Cancel

---

# 4.4 Student List

Student cards should appear inside the dashboard.

Each card shows:

Student Name
Subject
Grade
Semester

Actions

Edit
Delete

---

# 5. Data Model

Student Object

{
id: string
name: string
subject: string
grade: string
semester: string
createdAt: date
}

User Object

{
id: string
name: string
email: string
password: string
}

---

# 6. Data Storage

All data should be stored in browser localStorage.

Keys

users
students
currentUser

Example

localStorage.setItem("students", JSON.stringify(data))

---

# 7. Workflow

User opens website

↓

Login or Signup

↓

User redirected to dashboard

↓

User clicks "Add New Student"

↓

Student form opens

↓

Student data saved to localStorage

↓

Student list updates on dashboard

↓

User can edit or delete records

---

# 8. UI Design

Design should match the screenshots provided.

Color theme

Background
Light gray

Primary
Blue

Cards
White

Buttons
Black

Typography

Large bold title
Medium subtitle
Clean readable body text

Components

Cards with rounded corners
Soft shadows
Centered layout

Animations should be minimal.

---

# 9. Folder Structure

frontend

src
components
pages
utils
styles

components

StudentCard
AddStudentModal
Header

pages

AuthPage
Dashboard

utils

storageHelper.js

styles

theme.css

---

# 10. Required Features

User authentication UI
Add student
Delete student
Edit student
Student list display
LocalStorage persistence

---

# 11. Project Goal

The goal is to create a clean and functional frontend application demonstrating CRUD operations and basic authentication.

The project should remain simple, readable, and easy to maintain.

Avoid unnecessary complexity.

---

# 12. Implementation Instruction

Read this project.md file.

Generate a React + Vite project.

Follow the UI layout described.

Use localStorage for all data persistence.

Ensure the application runs locally with:

npm install
npm run dev
