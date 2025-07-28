import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Wallet,
  Shield,
  Zap,
  Calculator,
  Info
} from 'lucide-react';
import TransactionError from '../components/TransactionError';
const PayoutSystem = memo(() => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feeAcknowledged, setFeeAcknowledged] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState<'insufficient_balance' | 'invalid_amount' | 'invalid_characters' | 'minimum_amount' | 'maximum_amount'>('invalid_amount');



  const balance = 1247.50;
  const minimumPayout = 10.00;
  const platformFeeRate = 0.13; // 13% platform fee

  // Calculate fee breakdown
  const transactionAmount = parseFloat(amount) || 0;
  const platformFee = transactionAmount * platformFeeRate;
  const finalAmount = transactionAmount - platformFee;

  // Only JazzCash payment method available
  const payoutMethod = {
    id: 'jazzcash',
    name: 'JazzCash',
    icon: Smartphone,
    fee: '13%',
    processingTime: 'Instant',
    description: 'Direct transfer to your JazzCash mobile wallet',
    bgColor: 'bg-soft-pink',
    features: [
      'Instant transfers',
      'Secure & encrypted',
      'Available 24/7',
      'Mobile wallet integration'
    ]
  };

  const recentPayouts = [
    {
      id: 1,
      amount: 125.50,
      platformFee: 16.32,
      finalAmount: 109.18,
      method: 'JazzCash',
      status: 'completed',
      date: '2024-01-07',
      reference: 'JC123456789',
      phoneNumber: '+92 300 1234567'
    },
    {
      id: 2,
      amount: 87.25,
      platformFee: 11.34,
      finalAmount: 75.91,
      method: 'JazzCash',
      status: 'completed',
      date: '2024-01-05',
      reference: 'JC987654321',
      phoneNumber: '+92 300 1234567'
    },
    {
      id: 3,
      amount: 200.00,
      platformFee: 26.00,
      finalAmount: 174.00,
      method: 'JazzCash',
      status: 'pending',
      date: '2024-01-07',
      reference: 'JC456789123',
      phoneNumber: '+92 300 1234567'
    },
    {
      id: 4,
      amount: 65.75,
      platformFee: 8.55,
      finalAmount: 57.20,
      method: 'JazzCash',
      status: 'completed',
      date: '2024-01-04',
      reference: 'JC789123456',
      phoneNumber: '+92 300 1234567'
    },
    {
      id: 5,
      amount: 150.00,
      platformFee: 19.50,
      finalAmount: 130.50,
      method: 'JazzCash',
      status: 'completed',
      date: '2024-01-03',
      reference: 'JC321654987',
      phoneNumber: '+92 300 1234567'
    }
  ];

  // Validate amount and show appropriate error
  const validateAmount = (value: string) => {
    setAmount(value);
    setShowError(false);

    if (!value) {
      return;
    }

    // Check for invalid characters
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrorType('invalid_characters');
      setShowError(true);
      return;
    }

    const numValue = parseFloat(value);

    // Check if it's a valid number
    if (isNaN(numValue) || numValue <= 0) {
      setErrorType('invalid_amount');
      setShowError(true);
      return;
    }

    // Check minimum amount
    if (numValue < minimumPayout) {
      setErrorType('minimum_amount');
      setShowError(true);
      return;
    }

    // Check maximum amount (available balance)
    if (numValue > balance) {
      setErrorType('insufficient_balance');
      setShowError(true);
      return;
    }
  };

  const handlePayout = () => {
    if (parseFloat(amount) < minimumPayout) {
      setErrorType('minimum_amount');
      setShowError(true);
      return;
    }
    if (parseFloat(amount) > balance) {
      setErrorType('insufficient_balance');
      setShowError(true);
      return;
    }
    if (!phoneNumber) {
      alert('Please enter your JazzCash phone number');
      return;
    }
    if (!feeAcknowledged) {
      alert('Please acknowledge the platform fee to proceed');
      return;
    }
    
    // Validate Pakistani phone number format
    const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      alert('Please enter a valid Pakistani mobile number (e.g., 03001234567)');
      return;
    }
    
    // Process JazzCash payout logic here
    alert(`JazzCash payout request submitted successfully! You will receive $${finalAmount.toFixed(2)} instantly after the $${platformFee.toFixed(2)} platform fee.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display
    return phone.replace(/(\+92|0)?(\d{3})(\d{7})/, '+92 $2 $3');
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">JazzCash Payout System</h1>
          <p className="text-secondary">Withdraw your earnings instantly to your JazzCash mobile wallet</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance and Payout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
              }}
              className="bg-soft-pink rounded-xl p-8 text-deep-navy border border-soft-pink/20 transition-all duration-300 shadow-primary"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-deep-navy">Available Balance</h2>
                  <div className="text-4xl font-bold mb-2 text-deep-navy">${balance.toFixed(2)}</div>
                  <div className="flex items-center space-x-2 text-deep-navy/80">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">+$87.25 this week</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-white/30 rounded-full">
                  <Wallet className="w-8 h-8 text-[#2D2D2D]" />
                </div>
              </div>
            </motion.div>

            {/* JazzCash Method Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
              }}
              className="bg-secondary rounded-xl p-6 border border-primary transition-all duration-300 shadow-primary"
            >
              <h3 className="text-xl font-bold text-primary mb-6">JazzCash - Your Trusted Payment Partner</h3>
              
              {/* JazzCash Method Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border-2 border-soft-pink bg-soft-pink/20 text-primary mb-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${payoutMethod.bgColor}`}>
                    <payoutMethod.icon className="w-6 h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary text-lg">{payoutMethod.name}</h4>
                    <p className="text-sm text-secondary">{payoutMethod.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-orange-600">Platform Fee: {payoutMethod.fee}</div>
                    <div className="text-sm text-secondary">{payoutMethod.processingTime}</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {payoutMethod.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-primary font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Payout Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Payout Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => validateAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-tertiary font-medium"
                    />
                  </div>
                  <p className="text-sm text-secondary mt-1 font-medium">
                    Minimum: ${minimumPayout} • Available: ${balance.toFixed(2)}
                  </p>
                </div>

                {/* Transaction Error Component */}
                <TransactionError
                  isVisible={showError}
                  onClose={() => setShowError(false)}
                  errorType={errorType}
                  currentAmount={transactionAmount}
                  availableBalance={balance}
                  minimumAmount={minimumPayout}
                  maximumAmount={balance}
                />

                {/* Fee Calculation Display */}
                {transactionAmount >= minimumPayout && !showError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="bg-tertiary rounded-lg p-6 border border-primary"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Calculator className="w-5 h-5 text-soft-pink" />
                      <h4 className="font-bold text-primary">Transaction Fee Breakdown</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary font-medium">Transaction Amount:</span>
                        <span className="font-bold text-primary text-lg">${transactionAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-secondary font-medium">Platform Fee (13%):</span>
                        <span className="font-bold text-orange-600 text-lg">-${platformFee.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-secondary font-medium">Total Fee:</span>
                        <span className="font-bold text-orange-600 text-lg">${platformFee.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-primary pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-bold">Final Amount to Receive:</span>
                          <span className="font-bold text-green-600 text-xl">${finalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fee Information */}
                    <div className="mt-4 p-3 bg-secondary rounded-lg border border-secondary">
                      <div className="flex items-start space-x-3">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-secondary">
                          <strong>Note:</strong> A 13% platform fee applies to all JazzCash transactions. 
                          This fee helps maintain our secure payment infrastructure and ensures reliable, 
                          instant transfers to your mobile wallet.
                        </p>
                      </div>
                    </div>

                    {/* Fee Acknowledgment Checkbox */}
                    <div className="mt-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={feeAcknowledged}
                          onChange={(e) => setFeeAcknowledged(e.target.checked)}
                          className="mt-1 w-4 h-4 text-soft-pink bg-tertiary border-primary rounded focus:ring-soft-pink/50 focus:ring-2"
                        />
                        <span className="text-sm text-primary font-medium">
                          I understand and agree to the 13% platform fee for this transaction. 
                          I acknowledge that ${platformFee.toFixed(2)} will be deducted from my 
                          ${transactionAmount.toFixed(2)} payout, and I will receive ${finalAmount.toFixed(2)}.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    JazzCash Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="03001234567"
                      className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink/50 text-primary bg-tertiary font-medium"
                    />
                  </div>
                  <p className="text-sm text-secondary mt-1 font-medium">
                    Enter your registered JazzCash mobile number
                  </p>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-tertiary rounded-lg border border-secondary">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <h5 className="font-medium text-primary">Secure & Instant</h5>
                      <p className="text-sm text-secondary">Your payout will be processed instantly and securely through JazzCash's encrypted network.</p>
                    </div>
                  </div>
                </div>

                {/* Updated Request Payout Button with Wallet Icon and Muted Black Text */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayout}
                  disabled={!amount || parseFloat(amount) < minimumPayout || !phoneNumber || !feeAcknowledged || showError}
                  className="w-full bg-soft-pink hover:bg-soft-pink/90 font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed border border-soft-pink/20"
                  style={{
                    color: '#4A4A4A' // Muted black text color as specified
                  }}
                >
                  {/* Wallet Icon positioned to the left */}
                  <Wallet className="w-5 h-5" style={{ color: '#4A4A4A' }} />
                  
                  {/* Button Text */}
                  <span className="font-bold">
                    Request Payout
                  </span>
                  
                  {/* Optional: Show amount if valid */}
                  {transactionAmount >= minimumPayout && !showError && (
                    <span className="text-sm opacity-80">
                      (${finalAmount.toFixed(2)})
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Recent Payouts - FIXED TABLE ANIMATIONS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
            }}
            className="bg-secondary rounded-xl p-6 border border-primary transition-all duration-300 shadow-primary"
          >
            <h3 className="text-xl font-bold text-primary mb-6">Recent JazzCash Payouts</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentPayouts.map((payout, index) => {
                const StatusIcon = getStatusIcon(payout.status);
                return (
                  <motion.div
                    key={payout.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.01,
                      y: -2
                    }}
                    className="payout-row p-4 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-left">
                        <div className="font-bold text-primary text-lg">
                          ${payout.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-orange-600 font-medium">
                          Fee: ${payout.platformFee.toFixed(2)}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(payout.status)}`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {payout.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-medium">Received:</span>
                        <span className="font-bold text-green-600">${payout.finalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-medium">Method:</span>
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-3 h-3 text-soft-pink" />
                          <span className="font-medium text-primary">{payout.method}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-medium">Phone:</span>
                        <span className="font-medium text-primary">{formatPhoneNumber(payout.phoneNumber)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-medium">Date:</span>
                        <span className="font-medium text-primary">{new Date(payout.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-tertiary font-medium">
                        Ref: {payout.reference}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
            }}
            className="bg-secondary rounded-xl p-6 border border-primary text-center transition-all duration-300 shadow-primary"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-soft-pink mb-4 mx-auto">
              <DollarSign className="w-6 h-6 text-[#2D2D2D]" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              ${recentPayouts.reduce((sum, p) => sum + p.finalAmount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-secondary font-medium">Total Received</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
            }}
            className="bg-secondary rounded-xl p-6 border border-primary text-center transition-all duration-300 shadow-primary"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pale-blue mb-4 mx-auto">
              <TrendingUp className="w-6 h-6 text-[#2D2D2D]" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              ${recentPayouts.reduce((sum, p) => sum + p.platformFee, 0).toFixed(2)}
            </div>
            <div className="text-sm text-secondary font-medium">Total Fees Paid</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
            }}
            className="bg-secondary rounded-xl p-6 border border-primary text-center transition-all duration-300 shadow-primary"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-light-teal mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-[#2D2D2D]" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {recentPayouts.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-secondary font-medium">Successful Payouts</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
            }}
            className="bg-secondary rounded-xl p-6 border border-primary text-center transition-all duration-300 shadow-primary"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted-yellow mb-4 mx-auto">
              <Shield className="w-6 h-6 text-[#2D2D2D]" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {((recentPayouts.filter(p => p.status === 'completed').length / recentPayouts.length) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-secondary font-medium">Success Rate</div>
          </motion.div>
        </motion.div>

        {/* JazzCash Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-secondary rounded-xl p-6 border border-primary shadow-primary"
        >
          <h3 className="text-xl font-bold text-primary mb-4">Why JazzCash?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-soft-pink rounded-lg mb-3">
                <Zap className="w-6 h-6 text-[#2D2D2D]" />
              </div>
              <h4 className="font-bold text-primary mb-2">Instant Transfers</h4>
              <p className="text-sm text-secondary">Receive your earnings instantly, 24/7</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-pale-blue rounded-lg mb-3">
                <Shield className="w-6 h-6 text-[#2D2D2D]" />
              </div>
              <h4 className="font-bold text-primary mb-2">Secure & Reliable</h4>
              <p className="text-sm text-secondary">Bank-grade security with encrypted transactions</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-light-teal rounded-lg mb-3">
                <Smartphone className="w-6 h-6 text-[#2D2D2D]" />
              </div>
              <h4 className="font-bold text-primary mb-2">Mobile Convenience</h4>
              <p className="text-sm text-secondary">Direct to your mobile wallet for easy access</p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
  );
});

export default PayoutSystem;