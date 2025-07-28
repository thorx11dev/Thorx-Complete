import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Shield, Key, User, Eye, EyeOff, CheckCircle, AlertCircle, Save, RefreshCw } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const TeamHubPage = () => {
  const { teamMember } = useTeamAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (teamMember?.role === 'ceo') {
      loadTeamMembers();
    }
  }, [teamMember]);

  const loadTeamMembers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/members', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const memberData = await response.json();
        // Filter out current user from the list
        const otherMembers = memberData.filter((member: TeamMember) => member.id !== teamMember?.id);
        setMembers(otherMembers);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!selectedMember || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }

    setUpdating(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/members/${selectedMember.id}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `Password updated successfully for ${selectedMember.name}` });
        setNewPassword('');
        setConfirmPassword('');
        setSelectedMember(null);
        
        // Auto-clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to update password' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setUpdating(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-500';
      case 'marketing': return 'bg-green-500';
      case 'social_media': return 'bg-pink-500';
      case 'admin': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Chief Executive Officer';
      case 'marketing': return 'Marketing Specialist';
      case 'social_media': return 'Social Media Manager';
      case 'admin': return 'Administrator';
      default: return 'Team Member';
    }
  };

  // Only allow access to CEO
  if (teamMember?.role !== 'ceo') {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Access Denied</h3>
            <p className="text-slate-400">This area is restricted to CEO/Founder only.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen cosmic-parallax-container" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <div className="flex-1 p-6 relative">
        {/* Advanced Cosmic Background with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cosmic-parallax-layer cosmic-parallax-slow">
            <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-[#EF4B4C]/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-[#3D619B]/5 rounded-full blur-lg"></div>
          </div>
        </div>
        <CosmicParticles count={30} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Team Hub</h3>
          <p className="text-slate-400 text-sm">Manage team member passwords and security settings</p>
        </div>
        <button
          onClick={loadTeamMembers}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-900/20 border-green-500/20 text-green-400' 
            : 'bg-red-900/20 border-red-500/20 text-red-400'
        }`}>
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members List */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h4 className="text-md font-medium text-slate-200 mb-4">Team Members</h4>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedMember?.id === member.id
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${getRoleColor(member.role)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="text-sm font-medium text-slate-200">{member.name}</h5>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{member.email}</p>
                    <p className="text-xs text-slate-400">{getRoleTitle(member.role)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Password Update Panel */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h4 className="text-md font-medium text-slate-200 mb-4">Update Password</h4>
          
          {selectedMember ? (
            <div className="space-y-4">
              {/* Selected Member Info */}
              <div className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${getRoleColor(selectedMember.role)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-200">{selectedMember.name}</h5>
                    <p className="text-xs text-slate-400">{selectedMember.email}</p>
                    <p className="text-xs text-slate-400">{getRoleTitle(selectedMember.role)}</p>
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-slate-700 rounded-lg p-3">
                <h6 className="text-xs font-medium text-slate-300 mb-2">Password Requirements:</h6>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Must contain both letters and numbers</li>
                  <li>• Should include special characters</li>
                  <li>• Must be different from current password</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdatePassword}
                  disabled={updating || !newPassword || !confirmPassword}
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  {updating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Update Password</span>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectedMember(null);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">Select a team member</p>
              <p className="text-slate-500 text-sm">Choose a team member from the list to update their password</p>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h6 className="text-sm font-medium text-yellow-400 mb-1">Security Notice</h6>
            <p className="text-sm text-yellow-300">
              Password changes are logged for security purposes. Team members will be notified of password updates via email.
              Use this feature responsibly and only when necessary.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TeamHubPage;