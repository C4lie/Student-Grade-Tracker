/**
 * LocalStorage helper functions for Student Grade Tracker
 */

// Keys
export const USERS_KEY = "users";
export const STUDENTS_KEY = "students";
export const CURRENT_USER_KEY = "currentUser";

// --- Users ---

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function createUser(user) {
  const users = getUsers();
  const newUser = {
    ...user,
    id: Date.now().toString()
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function getCurrentUser() {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// --- Students ---

export function getStudents() {
  const students = localStorage.getItem(STUDENTS_KEY);
  return students ? JSON.parse(students) : [];
}

export function addStudent(studentData) {
  const students = getStudents();
  const newStudent = {
    ...studentData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  students.push(newStudent);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  return newStudent;
}

export function updateStudent(id, updatedData) {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedData };
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    return students[index];
  }
  return null;
}

export function deleteStudent(id) {
  let students = getStudents();
  students = students.filter(s => s.id !== id);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}
