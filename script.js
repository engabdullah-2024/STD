// Function to load students from localStorage
function loadStudents() {
    let students = localStorage.getItem('students');
    if (students) {
      return JSON.parse(students);
    }
    return [];
  }
  
  // Function to save students to localStorage
  function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
  }
  
  // Function to render the students in the table
  function renderTable(students) {
    const tableBody = document.querySelector('#student-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows
  
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.parent}</td>
        <td>${student.tell}</td>
        <td>${student.grade}</td>
        <td>${student.situation}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Handle form submission to add or update a student
  document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const parent = document.getElementById('parent').value;
    const tell = document.getElementById('tell').value;
    const grade = document.getElementById('grade').value;
    const situation = document.getElementById('situation').value;
  
    const newStudent = {
      name,
      parent,
      tell,
      grade,
      situation
    };
  
    let students = loadStudents();
    
    // Check if we're editing an existing student or adding a new one
    if (this.dataset.editIndex !== undefined) {
      // Update the student at the edit index
      students[this.dataset.editIndex] = newStudent;
      delete this.dataset.editIndex;  // Clear the edit mode
      document.querySelector('button[type="submit"]').textContent = "Add Student";
    } else {
      // Add the new student
      students.push(newStudent);
    }
  
    saveStudents(students);
  
    // Clear form fields
    document.getElementById('student-form').reset();
  
    // Re-render the table with the updated student list
    renderTable(students);
  });
  
  // Edit student functionality
  function editStudent(index) {
    let students = loadStudents();
    const student = students[index];
  
    // Populate the form with the student's data
    document.getElementById('name').value = student.name;
    document.getElementById('parent').value = student.parent;
    document.getElementById('tell').value = student.tell;
    document.getElementById('grade').value = student.grade;
    document.getElementById('situation').value = student.situation;
  
    // Set the form to edit mode
    document.querySelector('button[type="submit"]').textContent = "Update Student";
    document.getElementById('student-form').dataset.editIndex = index;
  }
  
  // Delete student functionality
  function deleteStudent(index) {
    let students = loadStudents();
    
    // Remove the student from the list
    students.splice(index, 1);
  
    saveStudents(students);
  
    // Re-render the table with the updated student list
    renderTable(students);
  }
  
  // Load and display students when the page is loaded
  window.onload = function() {
    const students = loadStudents();
    renderTable(students);
  };