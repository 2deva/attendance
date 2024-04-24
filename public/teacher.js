function addStudent() {
  const studentName = document.getElementById('studentName').value;
  if (studentName.trim() === '') {
    alert('Please enter a valid student name.');
    return;
  }

  fetch('http://localhost:3000/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: studentName }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    document.getElementById('studentName').value = '';
    updateAttendanceTable();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function markAttendance(index, isPresent) {
  const student = students[index];
  const attendanceRecord = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    isPresent
  };

  fetch(`http://localhost:3000/student/${student._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attendance: student.attendance.concat([attendanceRecord]) }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    updateAttendanceTable();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateAttendanceTable() {
  fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(data => {
    students = data;
    const tableBody = document.getElementById('attendanceBody');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="txt">${student.name}</td>
        <td class="txt"></td>
        <td class="txt"></td>
        <td ><button  id="btnp" class="btn"  onclick="markAttendance(${index}, true)">Present</button></td>
        <td><button class="btna" onclick="markAttendance(${index}, false)">Absent</button></td>
        <td class="txt"></td>
      `;
      tableBody.appendChild(row);

      const lastRecord = student.attendance[student.attendance.length - 1];

      if (lastRecord) {
        row.children[1].innerText = lastRecord.date;
        row.children[2].innerText = lastRecord.time;
        row.children[5].innerText = lastRecord.isPresent;
      }
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

updateAttendanceTable();