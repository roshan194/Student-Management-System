// Import student data (assuming the JSON file is in the same directory)
let students = [];
let tableBody = document.getElementById('tableBody'); // Declare globally

// Fetch student data from JSON file
fetch('./students.json')
    .then(response => response.json())
    .then(data => {
        students = data;
        displayStudents(students);
    })
    .catch(error => console.error('Error loading student data:', error));

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortAZ = document.getElementById('sortAZ');
const sortZA = document.getElementById('sortZA');
const sortMarks = document.getElementById('sortMarks');
const sortPassing = document.getElementById('sortPassing');
const sortClass = document.getElementById('sortClass');
const sortGender = document.getElementById('sortGender');
const tableContainer = document.getElementById('tableContainer');

// Display students in the table
function displayStudents(studentArray) {
    if (!tableBody) {
        tableBody = document.getElementById('tableBody');
        if (!tableBody) return;
    }
    
    tableBody.innerHTML = '';
    
    studentArray.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>
                <div class="student-name">
                    <img src="${student.img_src}" alt="${student.first_name}" class="student-avatar">
                    <span>${student.first_name} ${student.last_name}</span>
                </div>
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td class="${student.passing ? 'passing' : 'failed'}">${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Display students by gender (two tables)
function displayByGender(studentArray) {
    tableContainer.innerHTML = '';
    
    // Female students
    const femaleStudents = studentArray.filter(student => student.gender.toLowerCase() === 'female');
    if (femaleStudents.length > 0) {
        const femaleHeader = document.createElement('h2');
        femaleHeader.className = 'gender-header';
        femaleHeader.textContent = 'Female Students';
        tableContainer.appendChild(femaleHeader);
        
        const femaleTable = createGenderTable(femaleStudents);
        tableContainer.appendChild(femaleTable);
    }
    
    // Male students
    const maleStudents = studentArray.filter(student => student.gender.toLowerCase() === 'male');
    if (maleStudents.length > 0) {
        const maleHeader = document.createElement('h2');
        maleHeader.className = 'gender-header';
        maleHeader.textContent = 'Male Students';
        tableContainer.appendChild(maleHeader);
        
        const maleTable = createGenderTable(maleStudents);
        tableContainer.appendChild(maleTable);
    }
}

// Create a table for gender-specific display (now matches main table exactly)
function createGenderTable(studentArray) {
    const table = document.createElement('table');
    table.id = 'studentTable';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Passing</th>
            <th>Email</th>
        </tr>
    `;
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    studentArray.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>
                <div class="student-name">
                    <img src="${student.img_src}" alt="${student.first_name}" class="student-avatar">
                    <span>${student.first_name} ${student.last_name}</span>
                </div>
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td class="${student.passing ? 'passing' : 'failed'}">${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    return table;
}

// Search functionality
function searchStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        resetTableContainer();
        displayStudents(students);
        return;
    }
    
    const filteredStudents = students.filter(student => 
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    
    displayStudents(filteredStudents);
}

// Event listeners
searchInput.addEventListener('input', searchStudents);
searchButton.addEventListener('click', searchStudents);

sortAZ.addEventListener('click', () => {
    const sorted = [...students].sort((a, b) => 
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    );
    resetTableContainer();
    displayStudents(sorted);
});

sortZA.addEventListener('click', () => {
    const sorted = [...students].sort((a, b) => 
        `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
    );
    resetTableContainer();
    displayStudents(sorted);
});

sortMarks.addEventListener('click', () => {
    const sorted = [...students].sort((a, b) => a.marks - b.marks);
    resetTableContainer();
    displayStudents(sorted);
});

sortPassing.addEventListener('click', () => {
    const passingStudents = students.filter(student => student.passing);
    resetTableContainer();
    displayStudents(passingStudents);
});

sortClass.addEventListener('click', () => {
    const sorted = [...students].sort((a, b) => a.class - b.class);
    resetTableContainer();
    displayStudents(sorted);
});

sortGender.addEventListener('click', () => {
    displayByGender(students);
});

// Reset table container to default state
function resetTableContainer() {
    tableContainer.innerHTML = `
        <table id="studentTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;
    tableBody = document.getElementById('tableBody');
}

// Initialize the table on load
window.addEventListener('DOMContentLoaded', () => {
    resetTableContainer();
});