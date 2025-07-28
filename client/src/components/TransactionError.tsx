import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface TransactionErrorProps {
  isVisible: boolean;
  onClose?: () => void;
  errorType: 'insufficient_balance' | 'invalid_amount' | 'invalid_characters' | 'minimum_amount' | 'maximum_amount';
  currentAmount?: number;
  availableBalance?: number;
  minimumAmount?: number;
  maximumAmount?: number;
}

const TransactionError: React.FC<TransactionErrorProps> = ({
  isVisible,
  onClose,
  errorType,
  currentAmount,
  availableBalance,
  minimumAmount,
  maximumAmount
}) => {
  // Cosmic orbital icon component
  const CosmicOrbitIcon = () => (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-error-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {/* Central star/core */}
      <motion.circle
        cx="24"
        cy="24"
        r="3"
        fill="currentColor"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Inner orbital ring */}
      <motion.ellipse
        cx="24"
        cy="24"
        rx="12"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
        opacity="0.7"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Outer orbital ring */}
      <motion.ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeDasharray="6 3"
        opacity="0.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Orbiting particles */}
      <motion.circle
        cx="36"
        cy="24"
        r="1.5"
        fill="currentColor"
        opacity="0.8"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      />
      
      <motion.circle
        cx="12"
        cy="24"
        r="1"
        fill="currentColor"
        opacity="0.6"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "24px 24px" }}
      />
      
      {/* Constellation points */}
      <motion.g
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="30" cy="18" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="30" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="30" cy="30" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="18" r="0.8" fill="currentColor" opacity="0.6" />
      </motion.g>
    </motion.svg>
  );

  const getErrorContent = () => {
    switch (errorType) {
      case 'insufficient_balance':
        return {
          heading: 'Insufficient Balance',
          message: `The requested amount of $${currentAmount?.toFixed(2)} exceeds your available balance of $${availableBalance?.toFixed(2)}.`,
          helperText: `Please enter an amount up to $${availableBalance?.toFixed(2)} or add funds to your account.`
        };
      
      case 'invalid_amount':
        return {
          heading: 'Invalid Amount',
          message: 'The entered amount is not valid. Please enter a positive number.',
          helperText: 'Use only numbers and decimal points (e.g., 25.50).'
        };
      
      case 'invalid_characters':
        return {
          heading: 'Invalid Characters',
          message: 'The amount contains invalid characters. Only numbers and decimal points are allowed.',
          helperText: 'Remove any letters, symbols, or special characters and try again.'
        };
      
      case 'minimum_amount':
        return {
          heading: 'Amount Too Low',
          message: `The minimum transaction amount is $${minimumAmount?.toFixed(2)}. You entered $${currentAmount?.toFixed(2)}.`,
          helperText: `Please enter an amount of at least $${minimumAmount?.toFixed(2)} to proceed.`
        };
      
      case 'maximum_amount':
        return {
          heading: 'Amount Too High',
          message: `The maximum transaction amount is $${maximumAmount?.toFixed(2)}. You entered $${currentAmount?.toFixed(2)}.`,
          helperText: `Please enter an amount up to $${maximumAmount?.toFixed(2)} or contact support for larger transactions.`
        };
      
      default:
        return {
          heading: 'Transaction Cannot Proceed',
          message: 'There was an issue with your transaction amount.',
          helperText: 'Please check your input and try again.'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1],
            exit: { duration: 0.2 }
          }}
          className="transaction-error-container"
          role="alert"
          aria-live="polite"
          aria-labelledby="error-heading"
          aria-describedby="error-message error-helper"
        >
          <div className="transaction-error-content">
            {/* Close Button */}
            {onClose && (
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="transaction-error-close"
                aria-label="Close error message"
                tabIndex={0}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}

            {/* Icon with Pulse Animation */}
            <motion.div 
              className="transaction-error-icon"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 1
              }}
            >
              <CosmicOrbitIcon />
            </motion.div>

            {/* Content */}
            <div className="transaction-error-text">
              <h3 
                id="error-heading"
                className="transaction-error-heading"
              >
                Transaction Cannot Proceed
              </h3>
              
              <p 
                id="error-message"
                className="transaction-error-message"
              >
                {errorContent.message}
              </p>
              
              <p 
                id="error-helper"
                className="transaction-error-helper"
              >
                <strong>Suggested Action:</strong> {errorContent.helperText}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionError;