import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { FileText, Download, AlertCircle } from 'lucide-react';
import './Statements.css';

const Statements = () => {
  const [statements, setStatements] = useState([]);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    try {
      setLoading(true);
      const response = await dataService.getStatements();
      if (response.success) {
        setStatements(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load statements');
    } finally {
      setLoading(false);
    }
  };

  const handleViewStatement = async (id) => {
    try {
      setLoading(true);
      const response = await dataService.getStatement(id);
      if (response.success) {
        setSelectedStatement(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load statement details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const statement = selectedStatement;
    if (!statement) return;

    const csvContent = generateCSV(statement);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `statement_${statement.startDate}_${statement.endDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const generateCSV = (statement) => {
    let csv = 'Transaction ID,Date,Description,Country,City,Amount,Type,Status\n';
    statement.transactions.forEach(t => {
      csv += `${t.id},${t.date},${t.description},${t.country},${t.city},${t.amount},${t.type},${t.status}\n`;
    });
    return csv;
  };

  const displayStatement = selectedStatement;

  if (loading && statements.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading statements...</p>
      </div>
    );
  }

  return (
    <div className="statements">
      <div className="statements-header">
        <div>
          <h1>Statements</h1>
          <p>View and download your account statements</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="statements-grid">
        {/* Statements List */}
        <div className="statements-list card">
          <h3>Monthly Statements</h3>
          
          {statements.length === 0 ? (
            <p className="no-data">No statements available</p>
          ) : (
            <div className="statements-items">
              {statements.map((stmt) => (
                <div
                  key={stmt.id}
                  className={`statement-item ${selectedStatement?.id === stmt.id ? 'active' : ''}`}
                  onClick={() => handleViewStatement(stmt.id)}
                >
                  <div className="statement-icon">
                    <FileText size={24} />
                  </div>
                  <div className="statement-info">
                    <h4>{stmt.month}</h4>
                    <p>{stmt.startDate} to {stmt.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Statement Details */}
        <div className="statement-details card">
          {displayStatement ? (
            <>
              <div className="statement-header">
                <h3>Statement Details</h3>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  <Download size={18} />
                  Download CSV
                </button>
              </div>

              <div className="statement-summary">
                <div className="summary-row">
                  <span>Account:</span>
                  <strong>SM Bank Account</strong>
                </div>
                <div className="summary-row">
                  <span>Period:</span>
                  <strong>{displayStatement.startDate} to {displayStatement.endDate}</strong>
                </div>
                {displayStatement.openingBalance !== undefined && (
                  <>
                    <div className="summary-row highlight">
                      <span>Starting Balance:</span>
                      <strong>${displayStatement.openingBalance.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Credits:</span>
                      <strong className="credit">+${displayStatement.totalCredit.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Debits:</span>
                      <strong className="debit">-${displayStatement.totalDebit.toFixed(2)}</strong>
                    </div>
                    <div className="summary-row highlight">
                      <span>Ending Balance:</span>
                      <strong>${displayStatement.closingBalance.toFixed(2)}</strong>
                    </div>
                  </>
                )}
                {displayStatement.totalTransactions !== undefined && (
                  <>
                    <div className="summary-row highlight">
                      <span>Starting Balance:</span>
                      <strong>$0.00</strong>
                    </div>
                    <div className="summary-row">
                      <span>Credits:</span>
                      <strong className="credit">+${displayStatement.totalCredit}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Debits:</span>
                      <strong className="debit">-${displayStatement.totalDebit}</strong>
                    </div>
                    <div className="summary-row highlight">
                      <span>Ending Balance:</span>
                      <strong>${displayStatement.netAmount}</strong>
                    </div>
                  </>
                )}
              </div>

              <div className="statement-transactions">
                <h4>Transactions ({displayStatement.transactions?.length || 0})</h4>
                {displayStatement.transactions && displayStatement.transactions.length > 0 ? (
                  <div className="transactions-list-compact">
                    {displayStatement.transactions.map((transaction) => (
                      <div key={transaction.id} className="transaction-row">
                        <div className="transaction-left">
                          <span className="transaction-date">{transaction.date}</span>
                          <span className="transaction-desc">{transaction.description}</span>
                        </div>
                        <div className="transaction-right">
                          <span className={`transaction-amount ${transaction.type}`}>
                            {transaction.type === 'credit' ? '+' : '-'}
                            ${parseFloat(transaction.amount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No transactions in this period</p>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <FileText size={64} />
              <h3>No Statement Selected</h3>
              <p>Select a monthly statement or generate a custom one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statements;

