import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertCircle 
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getDashboard();
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  const { user, summary, recentActivity } = data;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user.fullName}!</h1>
          <p>Here's your account overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card balance">
          <div className="summary-icon">
            <Wallet size={32} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Balance</span>
            <h2 className="summary-value">${summary.totalBalance.toFixed(2)}</h2>
          </div>
        </div>

        <div className="summary-card transactions">
          <div className="summary-icon">
            <Activity size={32} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Transactions</span>
            <h2 className="summary-value">{summary.totalTransactions}</h2>
            <span className="summary-detail">
              {summary.completedTransactions} completed
            </span>
          </div>
        </div>

        <div className="summary-card credit">
          <div className="summary-icon">
            <TrendingUp size={32} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Credits</span>
            <h2 className="summary-value">${summary.totalCredit}</h2>
          </div>
        </div>

        <div className="summary-card debit">
          <div className="summary-icon">
            <TrendingDown size={32} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Debits</span>
            <h2 className="summary-value">${summary.totalDebit}</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity card">
        <h3>Recent Activity</h3>
        
        {recentActivity.length === 0 ? (
          <p className="no-data">No recent transactions</p>
        ) : (
          <div className="activity-list">
            {recentActivity.map((transaction) => (
              <div key={transaction.id} className="activity-item">
                <div className="activity-info">
                  <div className="activity-main">
                    <span className="activity-desc">{transaction.description}</span>
                    <span className={`badge badge-${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="activity-meta">
                    <span>{transaction.country} - {transaction.city}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className={`activity-amount ${transaction.type}`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  ${parseFloat(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

