// Country-City mapping
export const countryCityMap = {
  Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
  Singapore: ['Singapore City', 'Jurong', 'Woodlands', 'Tampines'],
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
  China: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  Malaysia: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Malacca', 'Ipoh']
};

// Mock users database (passwords stored in plain text for demo - client-side only)
export const users = [
  {
    id: '1',
    email: 'demo@smbank.com',
    username: 'demo',
    password: 'demo123',
    fullName: 'Demo User',
    balance: 125450.75,
    role: 'admin'
  },
  {
    id: '2',
    email: 'john@smbank.com',
    username: 'john',
    password: 'demo123',
    fullName: 'John Doe',
    balance: 85230.50,
    role: 'admin'
  },
  {
    id: '3',
    email: 'smadmin@smbank.com',
    username: 'smadmin',
    password: 'Smbank@1234',
    fullName: 'SM Bank Admin',
    balance: 500000.00,
    role: 'admin'
  },
  {
    id: '4',
    email: 'smcust@smbank.com',
    username: 'smcust',
    password: 'Smbank@1234',
    fullName: 'SM Bank Customer',
    balance: 50000.00,
    role: 'customer'
  }
];

// Generate mock transactions
const generateTransactions = () => {
  const transactions = [];
  const countries = Object.keys(countryCityMap);
  const statuses = ['completed', 'pending', 'failed'];
  const descriptions = [
    'Online Purchase',
    'Transfer',
    'ATM Withdrawal',
    'Salary Deposit',
    'Bill Payment',
    'Refund',
    'International Transfer',
    'Subscription Payment'
  ];

  // All user IDs that should have transactions
  const userIds = ['1', '2', '3', '4'];
  
  // Generate 125 transactions per user (500 total)
  let transactionCounter = 1;
  
  userIds.forEach(userId => {
    for (let i = 0; i < 125; i++) {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const cities = countryCityMap[country];
      const city = cities[Math.floor(Math.random() * cities.length)];
      
      // Generate dates from last 6 months
      const daysAgo = Math.floor(Math.random() * 180);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      transactions.push({
        id: `TXN${String(transactionCounter).padStart(6, '0')}`,
        userId: userId,
        date: date.toISOString().split('T')[0],
        country: country,
        city: city,
        amount: (Math.random() * 10000 + 100).toFixed(2),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        type: Math.random() > 0.3 ? 'debit' : 'credit'
      });
      
      transactionCounter++;
    }
  });

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const transactions = generateTransactions();

// Generate statements for all users
const generateStatements = () => {
  const allStatements = [];
  const userIds = ['1', '2', '3', '4'];
  
  userIds.forEach(userId => {
    // Get user's transactions
    const userTransactions = transactions.filter(t => t.userId === userId);
    
    // Generate statements for last 6 months
    for (let monthsAgo = 0; monthsAgo < 6; monthsAgo++) {
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const monthKey = `${year}-${month}`;
      
      // Get transactions for this month
      const monthTransactions = userTransactions.filter(t => t.date.startsWith(monthKey));
      
      const credits = monthTransactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      const debits = monthTransactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      const startingBalance = 100000 + Math.random() * 50000;
      const endingBalance = startingBalance + credits - debits;
      
      allStatements.push({
        id: `STMT-${userId}-${monthKey}`,
        userId: userId,
        period: `${date.toLocaleString('default', { month: 'long' })} ${year}`,
        month: monthKey,
        startDate: `${monthKey}-01`,
        endDate: `${monthKey}-${new Date(year, parseInt(month), 0).getDate()}`,
        startingBalance: parseFloat(startingBalance.toFixed(2)),
        credits: parseFloat(credits.toFixed(2)),
        debits: parseFloat(debits.toFixed(2)),
        endingBalance: parseFloat(endingBalance.toFixed(2)),
        totalDebit: parseFloat(debits.toFixed(2)),
        totalCredit: parseFloat(credits.toFixed(2)),
        openingBalance: parseFloat(startingBalance.toFixed(2)),
        closingBalance: parseFloat(endingBalance.toFixed(2)),
        transactions: monthTransactions
      });
    }
  });
  
  return allStatements;
};

export const statements = generateStatements();

// Mock business info for all users
export const businessInfo = {
  '1': {
    registered_name: 'SOUM Retail Holdings Pte Ltd',
    uen: '202220990N',
    industry: 'Cross-border eCommerce Enablement',
    operating_hq: 'Singapore',
    finance_lead: 'Som An',
    operations_lead: 'Hideo Nakamura',
    compliance: '',
    support: 'smb@sombank.com',
    daily_payment_limit: 'USD 1.5M',
    refund_sla: '2 business days',
    compliance_status: 'Green (Apr 2024 audit)',
    license_scope: 'APAC digital payments'
  },
  '2': {
    registered_name: 'SOUM Retail Holdings Pte Ltd',
    uen: '202220990N',
    industry: 'Cross-border eCommerce Enablement',
    operating_hq: 'Singapore',
    finance_lead: 'John Doe',
    operations_lead: 'Hideo Nakamura',
    compliance: '',
    support: 'smb@sombank.com',
    daily_payment_limit: 'USD 1.5M',
    refund_sla: '2 business days',
    compliance_status: 'Green (Apr 2024 audit)',
    license_scope: 'APAC digital payments'
  },
  '3': {
    registered_name: 'SOUM Retail Holdings Pte Ltd',
    uen: '202220990N',
    industry: 'Cross-border eCommerce Enablement',
    operating_hq: 'Singapore',
    finance_lead: 'Som An',
    operations_lead: 'Hideo Nakamura',
    compliance: '',
    support: 'smb@sombank.com',
    daily_payment_limit: 'USD 1.5M',
    refund_sla: '2 business days',
    compliance_status: 'Green (Apr 2024 audit)',
    license_scope: 'APAC digital payments'
  },
  '4': {
    registered_name: 'SOUM Retail Holdings Pte Ltd',
    uen: '202220990N',
    industry: 'Cross-border eCommerce Enablement',
    operating_hq: 'Singapore',
    finance_lead: 'SM Customer',
    operations_lead: 'Hideo Nakamura',
    compliance: '',
    support: 'smb@sombank.com',
    daily_payment_limit: 'USD 500K',
    refund_sla: '2 business days',
    compliance_status: 'Green (Apr 2024 audit)',
    license_scope: 'APAC digital payments'
  }
};

