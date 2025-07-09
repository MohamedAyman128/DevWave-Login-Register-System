# Login & Register System

A simple login and registration system built with vanilla JavaScript, HTML, and CSS. This application allows users to register new accounts, login with their credentials, and view their profile information - all without requiring a backend server.

## Features

### 🔐 Authentication System
- **User Registration**: Create new accounts with name, email, and password
- **User Login**: Authenticate with email and password
- **Session Management**: Maintain user sessions using localStorage
- **Automatic Redirects**: Smart navigation based on authentication status

### 🛡️ Security Features
- **Email Uniqueness**: Prevents duplicate account registration
- **Password Validation**: Minimum 6 characters required
- **Email Validation**: Proper email format checking
- **Session Timeout**: Automatic logout after 24 hours
- **Secure Navigation**: Protected routes for authenticated users

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with gradient backgrounds
- **Mobile Responsive**: Works seamlessly on all device sizes
- **Interactive Alerts**: Real-time feedback for user actions
- **Smooth Animations**: Enhanced user experience with CSS animations

### 📱 Pages Included
1. **Login/Register Page** (`index.html`)
   - Toggle between login and registration forms
   - Form validation and error handling
   - Auto-fill login form after successful registration

2. **Profile Page** (`profile.html`)
   - Display user information
   - Logout functionality
   - Session management

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Register a new account or login with existing credentials

### Registration Process
1. Click on "Register here" link
2. Fill in your full name, email, and password
3. Confirm your password
4. Click "Register" button
5. You'll be automatically redirected to login

### Login Process
1. Enter your email and password
2. Click "Login" button
3. You'll be redirected to your profile page

### Profile Features
- View your account information
- Logout from your account
- Navigate back to home page

## Technical Implementation

### Data Storage
- Uses **localStorage** to store user data and session information
- No backend server required
- Data persists between browser sessions

### File Structure
```
DevWave-Login-Register-System/
├── index.html          # Main login/register page
├── profile.html        # User profile page
├── styles.css          # All styling and responsive design
├── auth.js            # Authentication logic and user management
├── profile.js         # Profile page functionality
└── README.md          # This documentation file
```

### Key JavaScript Functions

#### Authentication (`auth.js`)
- `handleRegister()`: Process new user registration
- `handleLogin()`: Authenticate user credentials
- `emailExists()`: Check for duplicate emails
- `setCurrentUser()`: Manage user sessions

#### Profile Management (`profile.js`)
- `loadUserProfile()`: Display user information
- `logout()`: Clear session and redirect
- `checkSessionValidity()`: Automatic session timeout

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support required

## Security Considerations

⚠️ **Important Note**: This is a demonstration project for learning purposes. In a production environment, you should:

- Use proper password hashing (bcrypt, etc.)
- Implement server-side validation
- Use secure authentication tokens (JWT)
- Store sensitive data on secure servers
- Implement HTTPS encryption
- Add rate limiting for login attempts

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- Uses CSS custom properties for easy theme customization
- Responsive design works on all screen sizes

### Functionality
- Add password reset functionality
- Implement profile editing features
- Add user roles and permissions
- Extend with additional user fields

## Browser Requirements
- Modern browser with JavaScript enabled
- localStorage support
- CSS3 support for styling

## License
This project is open source and available under the MIT License.

---

**Created for educational purposes to demonstrate frontend authentication concepts.**
