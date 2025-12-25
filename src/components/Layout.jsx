import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  FileText, 
  Send, 
  Building, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import './Layout.css';

const Layout = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show only PayNow for customer role
  const allNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin'] },
    { path: '/transactions', icon: Receipt, label: 'Transactions', roles: ['admin'] },
    { path: '/statements', icon: FileText, label: 'Statements', roles: ['admin'] },
    { path: '/paynow', icon: Send, label: 'Pay Now', roles: ['admin', 'customer'] },
    { path: '/business', icon: Building, label: 'Business Info', roles: ['admin'] }
  ];

  // Filter nav items based on user role
  const navItems = allNavItems.filter(item => 
    item.roles.includes(user?.role || 'admin')
  );

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">SM Bank</h1>
          <button 
            className="sidebar-close" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="header">
          <button 
            className="menu-btn" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="header-content">
            <h2 className="header-title">SM Bank</h2>
            {user && (
              <div className="user-info">
                <div className="user-details">
                  <span className="user-name">{user.fullName}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <div className="user-avatar">
                  {user.fullName?.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;

