import React, { Component, useState } from "react";
import { isUserLoggedIn } from "./AuthenticationService";
import axios from "axios";

class StudentsService {
  createStudent() {
    return axios.post(`http://localhost:9999/ams/students`);
  }

  getStudent() {
    // return axios.get(`http://localhost:9999/ams/students/${id}`);
    return axios.get(`http://localhost:9999/ams/students/5`);
  }

  getStudentsList() {
    return axios.get("http://localhost:9999/ams/students");
  }

  deleteStudent(id) {
    return axios.delete(`http://localhost:9999/ams/students/${id}`);
  }
}

export default new StudentsService();
