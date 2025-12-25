import { users } from '../data/mockData';

class AuthService {
  // Login user
  login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password } = credentials;
        
        // Find user by username or email
        const user = users.find(
          u => (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
          // Create user session
          const userSession = {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            balance: user.balance,
            role: user.role
          };

          // Store in localStorage
          localStorage.setItem('user', JSON.stringify(userSession));
          localStorage.setItem('isAuthenticated', 'true');

          resolve({
            success: true,
            data: userSession,
            message: 'Login successful'
          });
        } else {
          reject({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }, 500); // Simulate network delay
    });
  }

  // Logout user
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Verify session
  verifySession() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.getCurrentUser();
        if (user && this.isAuthenticated()) {
          resolve({ success: true, data: user });
        } else {
          resolve({ success: false });
        }
      }, 200);
    });
  }
}

export default new AuthService();

