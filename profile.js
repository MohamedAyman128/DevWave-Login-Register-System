// Profile Page JavaScript

// Check authentication and load user data on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthenticationAndLoadProfile();
});

// Check if user is authenticated and load profile data
function checkAuthenticationAndLoadProfile() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        // User not logged in, redirect to login page
        showAlert('Please login to access your profile', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    // Load user profile data
    loadUserProfile(currentUser);
}

// Load and display user profile information
function loadUserProfile(user) {
    // Update profile information
    document.getElementById('userName').textContent = user.name || 'N/A';
    document.getElementById('userEmail').textContent = user.email || 'N/A';
    document.getElementById('registrationDate').textContent = user.registrationDate || 'N/A';
    
    // Show welcome message
    showAlert(`Welcome back, ${user.name}!`, 'success');
}

// Get current logged-in user from localStorage
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout function
function logout() {
    // Show confirmation dialog
    const confirmLogout = confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
        // Clear user session
        localStorage.removeItem('currentUser');
        
        // Show logout message
        showAlert('You have been logged out successfully', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Navigate back to home/login page
function goToHome() {
    // Check if user wants to stay logged in
    const stayLoggedIn = confirm('Do you want to stay logged in? Click OK to stay logged in, or Cancel to logout.');
    
    if (stayLoggedIn) {
        window.location.href = 'index.html';
    } else {
        logout();
    }
}

// Update profile information (future enhancement)
function updateProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // This could be expanded to allow users to update their profile
    showAlert('Profile update feature coming soon!', 'warning');
}

// Delete account (future enhancement)
function deleteAccount() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmDelete) {
        const finalConfirm = confirm('This will permanently delete all your data. Are you absolutely sure?');
        
        if (finalConfirm) {
            // Remove user from users list
            const users = getAllUsers();
            const updatedUsers = users.filter(user => user.email !== currentUser.email);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            // Clear current session
            localStorage.removeItem('currentUser');
            
            showAlert('Account deleted successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

// Get all users from localStorage
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Alert system (reused from auth.js)
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

// Session management - check if session is still valid
function checkSessionValidity() {
    const currentUser = getCurrentUser();
    
    if (currentUser && currentUser.loginTime) {
        const loginTime = new Date(currentUser.loginTime);
        const now = new Date();
        const sessionDuration = now - loginTime;
        
        // Session expires after 24 hours (24 * 60 * 60 * 1000 ms)
        const sessionTimeout = 24 * 60 * 60 * 1000;
        
        if (sessionDuration > sessionTimeout) {
            // Session expired
            localStorage.removeItem('currentUser');
            showAlert('Your session has expired. Please login again.', 'warning');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return false;
        }
    }
    
    return true;
}

// Check session validity every 5 minutes
setInterval(checkSessionValidity, 5 * 60 * 1000);
