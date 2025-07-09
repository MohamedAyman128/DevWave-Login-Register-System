// Authentication JavaScript for Login and Registration System

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeEventListeners();
});

// Initialize event listeners
function initializeEventListeners() {
    const loginForm = document.getElementById('loginFormElement');
    const registerForm = document.getElementById('registerFormElement');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Check authentication status
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    if (currentUser && window.location.pathname.includes('index.html')) {
        // User is logged in and on login page, redirect to profile
        window.location.href = 'profile.html';
    }
}

// Show/Hide forms
function showLoginForm() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
}

function showRegisterForm() {
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

// Handle user registration
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Check if email already exists
    if (emailExists(email)) {
        showAlert('An account with this email already exists', 'error');
        return;
    }
    
    // Create user object
    const user = {
        name: name,
        email: email,
        password: password, // In production, this should be hashed
        registrationDate: new Date().toLocaleDateString(),
        id: generateUserId()
    };
    
    // Save user to localStorage
    saveUser(user);
    
    // Show success message and switch to login
    showAlert('Registration successful! Please login with your credentials', 'success');
    document.getElementById('registerFormElement').reset();
    
    // Auto-fill login form
    setTimeout(() => {
        document.getElementById('loginEmail').value = email;
        showLoginForm();
    }, 1500);
}

// Handle user login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }
    
    // Get user from localStorage
    const user = getUserByEmail(email);
    
    if (!user) {
        showAlert('No account found with this email address', 'error');
        return;
    }
    
    if (user.password !== password) {
        showAlert('Incorrect password', 'error');
        return;
    }
    
    // Login successful
    setCurrentUser(user);
    showAlert('Login successful! Redirecting to profile...', 'success');
    
    // Redirect to profile page
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

// Utility Functions

// Generate unique user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if email already exists
function emailExists(email) {
    const users = getAllUsers();
    return users.some(user => user.email === email);
}

// Save user to localStorage
function saveUser(user) {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Get all users from localStorage
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Get user by email
function getUserByEmail(email) {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

// Set current logged-in user
function setCurrentUser(user) {
    // Store user session (excluding password for security)
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        registrationDate: user.registrationDate,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));
}

// Get current logged-in user
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    showAlert('You have been logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Alert system
function showAlert(message, type = 'success') {
    const alertElement = document.getElementById('alertMessage');
    const alertText = document.getElementById('alertText');
    
    if (!alertElement || !alertText) return;
    
    // Remove existing type classes
    alertElement.className = 'alert';
    
    // Add new type class
    alertElement.classList.add(type);
    alertElement.classList.remove('hidden');
    
    alertText.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

function hideAlert() {
    const alertElement = document.getElementById('alertMessage');
    if (alertElement) {
        alertElement.classList.add('hidden');
    }
}

// Navigation helper
function goToHome() {
    window.location.href = 'index.html';
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
    initializeEventListeners();
}
