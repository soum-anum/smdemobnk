import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/authService';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Statements from './pages/Statements';
import PayNow from './pages/PayNow';
import BusinessInfo from './pages/BusinessInfo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.verifySession();
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token, userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // ✅ RETURN MUST BE INSIDE App()
  return (
    <BrowserRouter basename="/smbank">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={user?.role === 'customer' ? '/paynow' : '/dashboard'}
                replace
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Layout user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <Navigate
                to={user?.role === 'customer' ? '/paynow' : '/dashboard'}
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={
              user?.role === 'customer'
                ? <Navigate to="/paynow" replace />
                : <Dashboard />
            }
          />

          <Route
            path="transactions"
            element={
              user?.role === 'customer'
                ? <Navigate to="/paynow" replace />
                : <Transactions />
            }
          />

          <Route
            path="statements"
            element={
              user?.role === 'customer'
                ? <Navigate to="/paynow" replace />
                : <Statements />
            }
          />

          <Route path="paynow" element={<PayNow />} />

          <Route
            path="business"
            element={
              user?.role === 'customer'
                ? <Navigate to="/paynow" replace />
                : <BusinessInfo />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
