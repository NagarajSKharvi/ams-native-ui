const studentsUrl = "http://192.168.1.102:9999/ams/students";

class StudentsService {
  createStudent() {
    return await fetch("http://192.168.1.102:9999/ams/students", {
      method: "POST",
      body: JSON.stringify({
        rollNumber,
        firstName,
        middleName,
        lastName,
        dob,
        mobileNumber,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  getStudent(id) {
    console.log(id);
    return fetch(`${studentsUrl}/${id}`);
  }

  getStudentsList() {
    return fetch(studentsUrl);
  }

  deleteStudent(id) {
    console.log(id);
    return fetch(`${studentsUrl}/${id}`, {
      method: "DELETE",
    });
  }
}

export default new StudentsService();
