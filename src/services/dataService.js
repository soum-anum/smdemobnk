import { transactions, statements, businessInfo, countryCityMap } from '../data/mockData';
import authService from './authService';

class DataService {
  // Dashboard
  getDashboard() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        const userTransactions = transactions.filter(t => t.userId === user.id);
        const recentTransactions = userTransactions.slice(0, 5);
        
        const totalTransactions = userTransactions.length;
        const completedTransactions = userTransactions.filter(t => t.status === 'completed').length;
        
        // Calculate total credits and debits
        const totalCredit = userTransactions
          .filter(t => t.type === 'credit')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        
        const totalDebit = userTransactions
          .filter(t => t.type === 'debit')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        resolve({
          success: true,
          data: {
            user: {
              fullName: user.fullName,
              balance: user.balance
            },
            summary: {
              totalBalance: user.balance,
              totalTransactions,
              completedTransactions,
              totalCredit: totalCredit.toFixed(2),
              totalDebit: totalDebit.toFixed(2)
            },
            recentActivity: recentTransactions
          }
        });
      }, 300);
    });
  }

  // Transactions
  getTransactions(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        let userTransactions = transactions.filter(t => t.userId === user.id);

        // Apply filters
        if (filters.country && filters.country !== 'all') {
          userTransactions = userTransactions.filter(t => t.country === filters.country);
        }

        if (filters.cities && filters.cities.length > 0) {
          userTransactions = userTransactions.filter(t => filters.cities.includes(t.city));
        }

        if (filters.fromDate) {
          userTransactions = userTransactions.filter(t => t.date >= filters.fromDate);
        }

        if (filters.toDate) {
          userTransactions = userTransactions.filter(t => t.date <= filters.toDate);
        }

        resolve({
          success: true,
          data: {
            transactions: userTransactions,
            total: userTransactions.length
          }
        });
      }, 300);
    });
  }

  getLocations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: countryCityMap
        });
      }, 100);
    });
  }

  // Statements
  getStatements() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        const userStatements = statements.filter(s => s.userId === user.id);

        resolve({
          success: true,
          data: userStatements
        });
      }, 300);
    });
  }

  getStatement(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        const statement = statements.find(s => s.id === id && s.userId === user.id);

        if (statement) {
          resolve({
            success: true,
            data: statement
          });
        } else {
          resolve({
            success: false,
            message: 'Statement not found'
          });
        }
      }, 200);
    });
  }

  // Payment
  processPayment(paymentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        // Simulate payment processing
        const newTransaction = {
          id: `TXN${String(transactions.length + 1).padStart(6, '0')}`,
          userId: user.id,
          date: new Date().toISOString().split('T')[0],
          country: 'Singapore',
          city: 'Singapore City',
          amount: paymentData.amount,
          status: 'pending',
          description: `Payment to ${paymentData.recipient}`,
          type: 'debit'
        };

        // In a real app, you'd add this to the transactions array
        // For demo purposes, we'll just return success
        resolve({
          success: true,
          data: {
            transactionId: newTransaction.id,
            status: 'pending',
            message: 'Payment submitted successfully'
          }
        });
      }, 1000);
    });
  }

  validateRecipient(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - just check if recipient is not empty
        if (data.recipient && data.recipient.length > 0) {
          resolve({
            success: true,
            data: {
              valid: true,
              recipientName: data.recipient
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid recipient'
          });
        }
      }, 300);
    });
  }

  // Business Info
  getBusinessInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        const userBusinessInfo = businessInfo[user.id];

        if (userBusinessInfo) {
          resolve({
            success: true,
            data: userBusinessInfo
          });
        } else {
          resolve({
            success: false,
            message: 'Business information not found'
          });
        }
      }, 300);
    });
  }

  updateBusinessInfo(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        if (!user) {
          resolve({ success: false, message: 'Not authenticated' });
          return;
        }

        // In a real app, you'd update the businessInfo object
        // For demo purposes, we'll just return success
        resolve({
          success: true,
          data: data,
          message: 'Business information updated successfully'
        });
      }, 500);
    });
  }
}

export default new DataService();

