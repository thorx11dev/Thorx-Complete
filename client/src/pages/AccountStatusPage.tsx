import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AlertTriangle, MessageCircle, Mail } from 'lucide-react';
import { CosmicModule } from '../components/CosmicAdvancedLayout';
import { ThorxLogo } from '../components/ThorxLogo';

export default function AccountStatusPage() {
  const location = useLocation();
  const { status, message, reason, contactAllowed } = location.state || {};

  if (!status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <CosmicModule effect="glass" className="max-w-md w-full bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Account Status Alert</h1>
            <p className="text-white/70 text-sm">There's an issue with your account</p>
          </div>
          <div className="text-center">
            <p className="text-white">Invalid access</p>
            <Link to="/auth" className="text-blue-400 hover:text-blue-300">Return to Login</Link>
          </div>
        </CosmicModule>
      </div>
    );
  }

  const isBanned = status === 'banned';
  const statusColor = isBanned ? 'text-red-400' : 'text-yellow-400';
  const bgColor = isBanned ? 'bg-red-500/20' : 'bg-yellow-500/20';
  const borderColor = isBanned ? 'border-red-500/30' : 'border-yellow-500/30';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <CosmicModule effect="glass" className="max-w-md w-full bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Account Status Alert</h1>
          <p className="text-white/70 text-sm">There's an issue with your account</p>
        </div>
        <div className={`max-w-md w-full ${bgColor} ${borderColor} border rounded-xl p-8 text-center`}>
          {/* Logo */}
          <div className="mb-6">
            <ThorxLogo className="w-16 h-16 mx-auto" />
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            <AlertTriangle className={`w-16 h-16 mx-auto ${statusColor}`} />
          </div>

          {/* Status Message */}
          <h1 className={`text-2xl font-bold ${statusColor} mb-4`}>
            Account {status === 'banned' ? 'Banned' : 'Deactivated'}
          </h1>

          <p className="text-white/80 mb-4">
            {message}
          </p>

          {reason && (
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-white mb-2">Reason:</h3>
              <p className="text-white/70 text-sm">{reason}</p>
            </div>
          )}

          {/* Contact Options */}
          {contactAllowed && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                If you believe this is an error, you can contact us:
              </p>

              <div className="flex flex-col space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send us a Message</span>
                </Link>

                <a
                  href="mailto:support@thorx.com"
                  className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </a>
              </div>
            </div>
          )}

          {/* Return to Login */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <Link
              to="/auth"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              ← Return to Login
            </Link>
          </div>
        </div>
      </CosmicModule>
    </div>
  );
}