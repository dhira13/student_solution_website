// Function to check if a username already exists
function usernameExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users.hasOwnProperty(username);
}

// Function to create a new account
function createAccount() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        if (usernameExists(newUsername)) {
            document.getElementById('accountMessage').innerText = 'Username already exists. Please choose another.';
        } else {
            // Store user data in local storage
            const users = JSON.parse(localStorage.getItem('users')) || {};
            users[newUsername] = newPassword; // Save username and password
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('accountMessage').innerText = 'Account created successfully! You can now log in.';
        }
    } else {
        document.getElementById('accountMessage').innerText = 'Please enter valid credentials.';
    }
}

// Function for logging in
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem('currentUser', username); // Store current user
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        document.getElementById('loginMessage').innerText = 'Invalid username or password.';
    }
}

// Check if user is logged in when loading the main page
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    } else {
        document.getElementById('mainContent').style.display = 'block'; // Show main content
        // Load user-specific data here if needed
    }
}

// Logout function
function logout() {
   localStorage.removeItem('currentUser'); // Remove current user from local storage
   window.location.href = 'login.html'; // Redirect to login page
}

// Function to toggle between login and registration forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}


// Load user-specific data from local storage
function loadUserData(username) {
    const userData = JSON.parse(localStorage.getItem(username));
    
    if (userData) {
        // Load notes
        const savedNotesDiv = document.getElementById('savedNotes');
        savedNotesDiv.innerHTML = ''; // Clear existing notes
        
        userData.notes.forEach(note => {
            const noteElement = document.createElement('p');
            noteElement.textContent = note;
            savedNotesDiv.appendChild(noteElement);
        });

        // Load materials
        const materialsList = document.getElementById('materialsList');
        materialsList.innerHTML = ''; // Clear existing materials
        
        userData.materials.forEach(material => {
            const listItem = document.createElement('li');
            listItem.textContent = material;
            materialsList.appendChild(listItem);
        });
        
        // Load quizzes (if applicable)
        // You can customize this section based on how you want to manage quizzes.
    }
}

// Save notes for the current user
function saveNotes() {
    const currentUser = localStorage.getItem('currentUser');
    const notesInput = document.getElementById('notesInput').value;

    if (notesInput) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        
        if (userData) {
            userData.notes.push(notesInput); // Add new note to user's notes array
            localStorage.setItem(currentUser, JSON.stringify(userData)); // Save updated user data
            
            loadUserData(currentUser); // Reload user data to display updated notes
            document.getElementById('notesInput').value = ''; // Clear input field
        }
    } else {
        alert('Please enter some notes.');
    }
}

// Add study material for the current user
function addMaterial() {
    const currentUser = localStorage.getItem('currentUser');
    const materialUrl = document.getElementById('materialInput').value;

    if (materialUrl) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        
        if (userData) {
            userData.materials.push(materialUrl); // Add new material URL to user's materials array
            localStorage.setItem(currentUser, JSON.stringify(userData)); // Save updated user data
            
            loadUserData(currentUser); // Reload user data to display updated materials
            document.getElementById('materialInput').value = ''; // Clear input field
        }
    } else {
        alert('Please enter a study material URL.');
    }
}

// Example function for starting a quiz (you can expand this as needed)
function startQuiz() {
   alert("This is where you would start a quiz.");
}