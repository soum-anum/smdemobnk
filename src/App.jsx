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
            user?.role === 'customer' ? (
              <Navigate to="/paynow" replace />
            ) : (
              <Dashboard />
            )
          }
        />

        <Route
          path="transactions"
          element={
            user?.role === 'customer' ? (
              <Navigate to="/paynow" replace />
            ) : (
              <Transactions />
            )
          }
        />

        <Route
          path="statements"
          element={
            user?.role === 'customer' ? (
              <Navigate to="/paynow" replace />
            ) : (
              <Statements />
            )
          }
        />

        <Route path="paynow" element={<PayNow />} />

        <Route
          path="business"
          element={
            user?.role === 'customer' ? (
              <Navigate to="/paynow" replace />
            ) : (
              <BusinessInfo />
            )
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
);
