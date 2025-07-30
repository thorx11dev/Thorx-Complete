import React from 'react';
import { Link } from 'wouter';
import { AlertTriangle, MessageCircle, Mail, ArrowLeft, Shield, Clock, User } from 'lucide-react';
import { ThorxLogo } from '../components/ThorxLogo';
import { motion } from 'framer-motion';

interface BannedUserPageProps {
  banReason?: string;
  bannedBy?: string;
  bannedAt?: string;
}

const BannedUserPage: React.FC<BannedUserPageProps> = ({ 
  banReason = "Account suspended for violating platform terms", 
  bannedBy = "Team Administrator",
  bannedAt = new Date().toISOString()
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 blur-xl animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-red-500/30 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 p-8 border-b border-red-500/30">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="mx-auto w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mb-6"
              >
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ThorxLogo size="lg" className="mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-400 mb-2">Account Suspended</h1>
                <p className="text-slate-300 text-lg">Your access to Thorx has been restricted</p>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              {/* Ban Details */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-400" />
                  Suspension Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Reason for Suspension:</h3>
                      <p className="text-slate-300">{banReason}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Suspended by:</h3>
                      <p className="text-slate-300">{bannedBy}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-1">Date of Suspension:</h3>
                      <p className="text-slate-300">{formatDate(bannedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appeal Information */}
              <div className="bg-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                <h2 className="text-xl font-semibold text-white mb-4">Appeal Process</h2>
                <p className="text-slate-300 mb-4">
                  If you believe this suspension was made in error, you can contact our support team to appeal this decision.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Support</span>
                  </motion.a>

                  <motion.a
                    href="mailto:support@thorx.live"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </motion.a>
                </div>
              </div>

              {/* Support Information */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                <h2 className="text-lg font-semibold text-white mb-3">Support Information</h2>
                <div className="space-y-2 text-sm text-slate-300">
                  <p><strong>Email:</strong> support@thorx.live</p>
                  <p><strong>Response Time:</strong> Within 24-48 hours</p>
                  <p><strong>WhatsApp Community:</strong> Available for general questions</p>
                </div>
              </div>

              {/* Return to Login */}
              <div className="text-center pt-6 border-t border-slate-700">
                <Link
                  to="/auth"
                  className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Login</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannedUserPage;