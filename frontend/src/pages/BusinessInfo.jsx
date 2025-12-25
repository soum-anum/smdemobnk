import React, { useState, useEffect } from 'react';
import { businessAPI } from '../services/api';
import { Building, AlertCircle, CheckCircle } from 'lucide-react';
import './BusinessInfo.css';

const BusinessInfo = () => {
  const [formData, setFormData] = useState({
    // Entity
    registeredName: '',
    uen: '',
    industry: '',
    operatingHq: '',
    // Team & Contacts
    financeLead: '',
    operationsLead: '',
    compliance: '',
    support: '',
    // Limits & Licenses
    dailyPaymentLimit: '',
    refundSla: '',
    complianceStatus: '',
    licenseScope: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  const fetchBusinessInfo = async () => {
    try {
      setLoading(true);
      const response = await businessAPI.getBusinessInfo();
      
      if (response.data.success) {
        const info = response.data.data;
        const data = {
          registeredName: info.registered_name || '',
          uen: info.uen || '',
          industry: info.industry || '',
          operatingHq: info.operating_hq || '',
          financeLead: info.finance_lead || '',
          operationsLead: info.operations_lead || '',
          compliance: info.compliance || '',
          support: info.support || '',
          dailyPaymentLimit: info.daily_payment_limit || '',
          refundSla: info.refund_sla || '',
          complianceStatus: info.compliance_status || '',
          licenseScope: info.license_scope || ''
        };
        setFormData(data);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to load business information');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading business information...</p>
      </div>
    );
  }

  return (
    <div className="business-info">
      <div className="business-header">
        <div>
          <h1>Business Profile</h1>
          <p>Snapshot of SOM Retail Holdings' treasury setup.</p>
        </div>
        <div className="business-icon">
          <Building size={40} />
        </div>
      </div>

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

      <div className="business-profile-grid">
        {/* Entity Section */}
        <div className="profile-card">
          <h3>Entity</h3>
          <div className="profile-items">
            <div className="profile-item">
              <label>Registered Name:</label>
              <span>{formData.registeredName || 'SOUM Retail Holdings Pte Ltd'}</span>
            </div>
            <div className="profile-item">
              <label>UEN:</label>
              <span>{formData.uen || '202220990N'}</span>
            </div>
            <div className="profile-item">
              <label>Industry:</label>
              <span>{formData.industry || 'Cross-border eCommerce Enablement'}</span>
            </div>
            <div className="profile-item">
              <label>Operating HQ:</label>
              <span>{formData.operatingHq || 'Singapore'}</span>
            </div>
          </div>
        </div>

        {/* Team & Contacts Section */}
        <div className="profile-card">
          <h3>Team & Contacts</h3>
          <div className="profile-items">
            <div className="profile-item">
              <label>Finance Lead:</label>
              <span>{formData.financeLead || 'Som An'}</span>
            </div>
            <div className="profile-item">
              <label>Operations Lead:</label>
              <span>{formData.operationsLead || 'Hideo Nakamura'}</span>
            </div>
            <div className="profile-item">
              <label>Compliance:</label>
              <span>{formData.compliance || '-'}</span>
            </div>
            <div className="profile-item">
              <label>Support:</label>
              <span>{formData.support || 'smb@sombank.com'}</span>
            </div>
          </div>
        </div>

        {/* Limits & Licenses Section */}
        <div className="profile-card">
          <h3>Limits & Licenses</h3>
          <div className="profile-items">
            <div className="profile-item">
              <label>Daily Payment Limit:</label>
              <span>{formData.dailyPaymentLimit || 'USD 1.5M'}</span>
            </div>
            <div className="profile-item">
              <label>Refund SLA:</label>
              <span>{formData.refundSla || '2 business days'}</span>
            </div>
            <div className="profile-item">
              <label>Compliance Status:</label>
              <span>{formData.complianceStatus || 'Green (Apr 2024 audit)'}</span>
            </div>
            <div className="profile-item">
              <label>License Scope:</label>
              <span>{formData.licenseScope || 'APAC digital payments'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
