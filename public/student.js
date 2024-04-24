function getStudents() {
  fetch('http://localhost:3000/students')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('studentBody');
    tableBody.innerHTML = '';
    data.forEach(student => {
      const attendancePercentage = calculateAttendancePercentage(student.attendance);
      const row = document.createElement('tr');
    const serialNumber = data.indexOf(student) + 1;
    row.innerHTML = `
      <td>${serialNumber}</td>
      <td>${student.name}</td>
      <td>${attendancePercentage}%</td>
    `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function calculateAttendancePercentage(attendanceRecords) {
  if (attendanceRecords.length === 0) {
    return 0;
  }
  const presentCount = attendanceRecords.filter(record => record.isPresent).length;
  return Math.round((presentCount / attendanceRecords.length) * 100);
}

getStudents();