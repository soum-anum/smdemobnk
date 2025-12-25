import React, { useState } from 'react';
import dataService from '../services/dataService';
import { Send, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import './PayNow.css';

const PayNow = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [recipientValid, setRecipientValid] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setError('');
    setSuccess('');

    // Clear recipient validation when changed
    if (name === 'recipient') {
      setRecipientValid(null);
    }
  };

  const validateRecipient = async () => {
    if (!formData.recipient.trim()) {
      setRecipientValid(null);
      return;
    }

    try {
      setValidating(true);
      const response = await dataService.validateRecipient({ 
        recipient: formData.recipient 
      });
      
      if (response.success && response.data.valid) {
        setRecipientValid(response.data);
      }
    } catch (err) {
      setRecipientValid({ valid: false, message: 'Invalid recipient' });
    } finally {
      setValidating(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (!recipientValid?.valid) {
      setError('Please validate the recipient first');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await dataService.processPayment({
        recipient: formData.recipient,
        amount: parseFloat(formData.amount),
        description: formData.description
      });

      if (response.success) {
        setSuccess(`Payment of $${formData.amount} sent successfully!`);
        // Reset form
        setFormData({
          recipient: '',
          amount: '',
          description: ''
        });
        setRecipientValid(null);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paynow">
      <div className="paynow-header">
        <div>
          <h1>Pay Now</h1>
          <p>Send money instantly to any recipient</p>
        </div>
      </div>

      <div className="paynow-grid">
        {/* Payment Form */}
        <div className="payment-form card">
          <div className="form-icon">
            <Send size={32} />
          </div>
          <h3>Send Payment</h3>

          {success && (
            <div className="alert alert-success">
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="recipient">Recipient</label>
              <div className="input-with-validation">
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  onBlur={validateRecipient}
                  className={errors.recipient ? 'input-error' : ''}
                  placeholder="Enter recipient email or username"
                />
                {validating && (
                  <Loader className="validation-icon spinning" size={20} />
                )}
                {recipientValid?.valid && (
                  <CheckCircle className="validation-icon success" size={20} />
                )}
                {recipientValid?.valid === false && (
                  <AlertCircle className="validation-icon error" size={20} />
                )}
              </div>
              {errors.recipient && (
                <span className="error-message">{errors.recipient}</span>
              )}
              {recipientValid?.valid && recipientValid.recipientName && (
                <span className="success-message">
                  ✓ Recipient: {recipientValid.recipientName}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={errors.amount ? 'input-error' : ''}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.amount && (
                <span className="error-message">{errors.amount}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'input-error' : ''}
                placeholder="What's this payment for?"
                rows="3"
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={loading || !recipientValid?.valid}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Payment</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Payment Info */}
        <div className="payment-info card">
          <h3>Payment Information</h3>
          
          <div className="info-section">
            <h4>How it works</h4>
            <ol className="info-list">
              <li>Enter the recipient's email or username</li>
              <li>The system will validate the recipient</li>
              <li>Enter the amount you want to send</li>
              <li>Add a description for your records</li>
              <li>Click "Send Payment" to complete</li>
            </ol>
          </div>

          <div className="info-section">
            <h4>Important Notes</h4>
            <ul className="info-list">
              <li>Payments are processed instantly</li>
              <li>Minimum amount: $0.01</li>
              <li>Ensure sufficient balance before sending</li>
              <li>All transactions are encrypted and secure</li>
              <li>You'll receive a confirmation after payment</li>
            </ul>
          </div>

          <div className="info-section security">
            <h4>🔒 Security</h4>
            <p>Your payments are protected with bank-level encryption and authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayNow;

