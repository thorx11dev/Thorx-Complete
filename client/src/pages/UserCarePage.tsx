import { useState, useEffect, useRef } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  MoreVertical, 
  Ban, 
  UserCheck, 
  FileText, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  X,
  Edit3,
  Save,
  Trash2,
  Eye,
  Calendar,
  Mail,
  User,
  Shield,
  Activity,
  Clock,
  Settings,
  ExternalLink,
  FileSpreadsheet,
  Link as LinkIcon,
  Unlink,
  Check
} from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  totalEarnings: string;
  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedBy?: number;
  bannedAt?: string;
  createdAt: string;
  lastSeen?: string;
  actions?: number;
}

interface BulkOperation {
  operation: string;
  userIds: number[];
  reason?: string;
}

interface GoogleSheetsAuth {
  isLinked: boolean;
  email?: string;
  sheetId?: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

const UserCarePage = () => {
  const { teamMember } = useTeamAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'banned' | 'inactive'>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showBulkOps, setShowBulkOps] = useState(false);
  const [bulkOperation, setBulkOperation] = useState<string>('');
  const [bulkReason, setBulkReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<BulkOperation | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [googleSheetsAuth, setGoogleSheetsAuth] = useState<GoogleSheetsAuth>({ isLinked: false });
  const [showGoogleSheetsModal, setShowGoogleSheetsModal] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [importedData, setImportedData] = useState<User[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Floating Card Feature State
  const [showFloatingCard, setShowFloatingCard] = useState(false);
  const [floatingCardPosition, setFloatingCardPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Floating Card Functions
  const toggleFloatingCard = () => {
    setShowFloatingCard(!showFloatingCard);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - floatingCardPosition.x,
      y: e.clientY - floatingCardPosition.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setFloatingCardPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  useEffect(() => {
    loadUsers();
    loadGoogleSheetsAuth();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        // Add mock data for demonstration
        const enhancedUsers = userData.map((user: User) => ({
          ...user,
          lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          actions: Math.floor(Math.random() * 100) + 10
        }));
        setUsers(enhancedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      addNotification('error', 'Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadGoogleSheetsAuth = () => {
    const authData = localStorage.getItem('thorx_google_sheets_auth');
    if (authData) {
      setGoogleSheetsAuth(JSON.parse(authData));
    }
  };

  const addNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    const notification = { id, type, title, message };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleBulkOperation = (operation: string) => {
    if (selectedUsers.length === 0) {
      addNotification('error', 'No Selection', 'Please select users first');
      return;
    }

    if (operation === 'ban' || operation === 'unban') {
      setPendingOperation({ operation, userIds: selectedUsers });
      setShowReasonModal(true);
    } else if (operation === 'export') {
      setShowExportOptions(true);
    }
  };

  const executeBulkOperation = async () => {
    if (!pendingOperation) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          operation: pendingOperation.operation,
          userIds: pendingOperation.userIds,
          reason: bulkReason
        })
      });

      if (response.ok) {
        const result = await response.json();
        addNotification('success', 'Success', `${pendingOperation.operation} operation completed for ${pendingOperation.userIds.length} users`);
        await loadUsers(); // Ensure users are reloaded
        setSelectedUsers([]);
      } else {
        const error = await response.json();
        addNotification('error', 'Error', error.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Bulk operation error:', error);
      addNotification('error', 'Error', 'Network error occurred');
    } finally {
      setLoading(false);
      setShowReasonModal(false);
      setPendingOperation(null);
      setBulkReason('');
    }
  };

  const handleExportToDevice = () => {
    const selectedUserData = users.filter(user => selectedUsers.includes(user.id));
    const csvContent = [
      ['ID', 'Username', 'Email', 'First Name', 'Last Name', 'Total Earnings', 'Status', 'Last Seen', 'Actions', 'Created At'],
      ...selectedUserData.map(user => [
        user.id,
        user.username,
        user.email,
        user.firstName,
        user.lastName,
        user.totalEarnings,
        user.isBanned ? 'Banned' : user.isActive ? 'Active' : 'Inactive',
        user.lastSeen ? new Date(user.lastSeen).toLocaleDateString() : 'Never',
        user.actions || 0,
        new Date(user.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thorx_users_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    addNotification('success', 'Export Complete', `Exported ${selectedUserData.length} users to CSV`);
    setShowExportOptions(false);
  };

  const handleExportToGoogleSheets = () => {
    if (!googleSheetsAuth.isLinked) {
      setShowGoogleSheetsModal(true);
    } else {
      exportToGoogleSheetsWithData();
    }
    setShowExportOptions(false);
  };

  const linkGoogleSheetsAccount = async () => {
    // Simulate Google OAuth flow
    const mockAuth = {
      isLinked: true,
      email: 'team@thorx.live',
      sheetId: '1T8HjIwxkmmBDH2p25LeosZUtMM6oy9ocIY5pdfyV2Sw'
    };
    
    setGoogleSheetsAuth(mockAuth);
    localStorage.setItem('thorx_google_sheets_auth', JSON.stringify(mockAuth));
    setShowGoogleSheetsModal(false);
    
    addNotification('success', 'Account Linked', 'Google Sheets account linked successfully');
    await exportToGoogleSheetsWithData();
  };

  const exportToGoogleSheetsWithData = async () => {
    try {
      setLoading(true);
      const selectedUserData = users.filter(user => selectedUsers.includes(user.id));
      
      if (selectedUserData.length === 0) {
        addNotification('error', 'No Data', 'No users selected for export');
        return;
      }

      // Prepare structured data for Google Sheets
      const exportData = {
        headers: ['ID', 'Name', 'Email', 'Username', 'Total Earnings', 'Status', 'Last Seen', 'Actions', 'Created At', 'Ban Reason'],
        data: selectedUserData.map(user => [
          user.id,
          `${user.firstName} ${user.lastName}`,
          user.email,
          user.username,
          user.totalEarnings,
          user.isBanned ? 'Banned' : user.isActive ? 'Active' : 'Inactive',
          formatLastSeen(user.lastSeen),
          user.actions || 0,
          new Date(user.createdAt).toLocaleDateString(),
          user.banReason || 'N/A'
        ])
      };

      // Send data to backend for Google Sheets export
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/export-google-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          sheetId: googleSheetsAuth.sheetId,
          exportData
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Open Google Sheets with the exported data
        const sheetUrl = result.sheetUrl || `https://docs.google.com/spreadsheets/d/${googleSheetsAuth.sheetId}/edit`;
        window.open(sheetUrl, '_blank');
        
        addNotification('success', 'Export Successful', `Exported ${selectedUserData.length} users to Google Sheets`);
        setSelectedUsers([]);
      } else {
        const error = await response.json();
        addNotification('error', 'Export Failed', error.message || 'Failed to export to Google Sheets');
      }
    } catch (error) {
      console.error('Google Sheets export error:', error);
      addNotification('error', 'Export Error', 'Network error occurred during export');
    } finally {
      setLoading(false);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const importedUsers: User[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= headers.length) {
          const user: User = {
            id: parseInt(values[0]) || Date.now() + i,
            username: values[1] || '',
            email: values[2] || '',
            firstName: values[3] || '',
            lastName: values[4] || '',
            totalEarnings: values[5] || '0.00',
            isActive: values[6] !== 'Inactive' && values[6] !== 'Banned',
            isBanned: values[6] === 'Banned',
            lastSeen: values[7] || new Date().toISOString(),
            actions: parseInt(values[8]) || 0,
            createdAt: values[9] || new Date().toISOString()
          };
          importedUsers.push(user);
        }
      }
      
      setImportedData(importedUsers);
      setShowImportModal(true);
    };
    
    reader.readAsText(file);
  };

  const saveImportedData = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      
      for (const user of importedData) {
        await fetch('/api/team/users/import-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(user)
        });
      }
      
      addNotification('success', 'Import Complete', `Imported ${importedData.length} users successfully`);
      setShowImportModal(false);
      setImportedData([]);
      loadUsers();
    } catch (error) {
      console.error('Import error:', error);
      addNotification('error', 'Import Failed', 'Failed to import users');
    }
  };

  const handleUserAction = async (userId: number, action: string) => {
    setLoading(true);
    try {
      if (action === 'ban' || action === 'unban') {
        setPendingOperation({ operation: action, userIds: [userId] });
        setShowReasonModal(true);
      } else if (action === 'export') {
        setSelectedUsers([userId]);
        setShowExportOptions(true);
      }
    } catch (error) {
      console.error('User action error:', error);
      addNotification('error', 'Action Failed', 'Failed to perform user action');
    } finally {
      setLoading(false);
      setShowDropdown(null);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const saveUserEdit = async () => {
    if (!editingUser) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      await fetch(`/api/team/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingUser)
      });

      addNotification('success', 'User Updated', 'User information updated successfully');
      setShowEditModal(false);
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error('Edit error:', error);
      addNotification('error', 'Update Failed', 'Failed to update user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'active' && user.isActive && !user.isBanned) ||
      (filterType === 'banned' && user.isBanned) ||
      (filterType === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const formatLastSeen = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
        <TeamSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF4B4C]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen cosmic-parallax-container" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <div className="flex-1 p-6 relative">
        {/* Advanced Cosmic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cosmic-parallax-layer cosmic-parallax-slow">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#EF4B4C]/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#3D619B]/5 rounded-full blur-lg"></div>
          </div>
        </div>
        <CosmicParticles count={30} />

        {/* Notifications */}
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -50, x: 300 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -50, x: 300 }}
              className="fixed top-4 right-4 z-50 max-w-md"
            >
              <div className={`p-4 rounded-xl border backdrop-blur-sm ${
                notification.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                  : notification.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
              }`}>
                <div className="flex items-center space-x-3">
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : notification.type === 'error' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Activity className="w-5 h-5 text-blue-400" />
                  )}
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm opacity-90">{notification.message}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Header */}
        <CosmicEntrance type="stellar" delay={0.1}>
          <CosmicModule effect="glass" className="border border-[#3D619B]/20 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#3D619B] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#E9E9EB]">Cosmic Database</h1>
                  <p className="text-sm text-[#E9E9EB]/60">User Management & Analytics Hub</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={loadUsers}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#3D619B] hover:bg-[#3D619B]/80 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={toggleFloatingCard}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#EF4B4C] hover:bg-[#EF4B4C]/80 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showFloatingCard ? 'Hide' : 'Show'} Quick View</span>
                </button>
                <div className="text-right">
                  <div className="text-sm text-[#E9E9EB]/60">Total Users</div>
                  <div className="text-lg font-semibold text-[#E9E9EB]">{users.length}</div>
                </div>
              </div>
            </div>
          </CosmicModule>
        </CosmicEntrance>

        {/* Enhanced Bulk Operations Section */}
        <CosmicEntrance type="orbital" delay={0.2}>
          <CosmicModule effect="glass" className="border border-[#EF4B4C]/20 p-6 mb-6">
            <div className="space-y-6">
              {/* Bulk Operations Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#EF4B4C] rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#E9E9EB]">Cosmic Bulk Operations</h2>
                    <p className="text-sm text-[#E9E9EB]/60">
                      {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>
                
                {/* Google Sheets Status */}
                <div className="flex items-center space-x-3">
                  {googleSheetsAuth.isLinked ? (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <LinkIcon className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-300">Google Sheets Linked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-500/20 border border-gray-500/30 rounded-lg">
                      <Unlink className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Not Linked</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBulkOperation('ban')}
                  disabled={selectedUsers.length === 0}
                  className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Ban className="w-5 h-5 text-red-400" />
                  <div className="text-left">
                    <div className="font-medium text-red-300">Ban Users</div>
                    <div className="text-xs text-red-400">Restrict access</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBulkOperation('unban')}
                  disabled={selectedUsers.length === 0}
                  className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserCheck className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <div className="font-medium text-green-300">Unban Users</div>
                    <div className="text-xs text-green-400">Restore access</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBulkOperation('export')}
                  disabled={selectedUsers.length === 0}
                  className="flex items-center space-x-3 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium text-blue-300">Export Users</div>
                    <div className="text-xs text-blue-400">Download data</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-3 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                >
                  <Upload className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium text-purple-300">Import Users</div>
                    <div className="text-xs text-purple-400">Upload CSV</div>
                  </div>
                </motion.button>
              </div>

              {/* Selection Summary */}
              {selectedUsers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-[#3D619B]/20 border border-[#3D619B]/30 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3D619B]" />
                      <span className="text-[#E9E9EB]">
                        {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected for bulk operations
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedUsers([])}
                      className="text-[#E9E9EB]/60 hover:text-[#E9E9EB] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </CosmicModule>
        </CosmicEntrance>

        {/* Search and Filter */}
        <CosmicEntrance type="zoom" delay={0.3}>
          <CosmicModule effect="glass" className="border border-[#3D619B]/20 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E9E9EB]/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#43506C]/40 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] placeholder-[#E9E9EB]/50 focus:outline-none focus:border-[#EF4B4C]/50"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <Filter className="w-4 h-4 text-[#E9E9EB]/50" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-3 bg-[#43506C]/40 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:border-[#EF4B4C]/50"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Users</option>
                  <option value="banned">Banned Users</option>
                  <option value="inactive">Inactive Users</option>
                </select>
              </div>
            </div>
          </CosmicModule>
        </CosmicEntrance>

        {/* Users Database */}
        <CosmicEntrance type="constellation" delay={0.4}>
          <CosmicModule effect="glass" className="border border-[#3D619B]/20 p-6">
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center justify-between p-3 bg-[#43506C]/40 rounded-lg border border-[#3D619B]/30">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="w-4 h-4 text-[#EF4B4C] bg-[#43506C] border-[#3D619B] rounded focus:ring-[#EF4B4C]/50"
                  />
                  <span className="text-[#E9E9EB] font-medium">
                    Select All ({filteredUsers.length} users)
                  </span>
                </label>
                
                <div className="text-sm text-[#E9E9EB]/60">
                  {selectedUsers.length} selected
                </div>
              </div>

              {/* User List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedUsers.includes(user.id)
                        ? 'bg-[#EF4B4C]/20 border-[#EF4B4C]/30'
                        : 'bg-[#43506C]/40 border-[#3D619B]/30 hover:border-[#EF4B4C]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                            }
                          }}
                          className="w-4 h-4 text-[#EF4B4C] bg-[#43506C] border-[#3D619B] rounded focus:ring-[#EF4B4C]/50"
                        />
                        
                        <div className="w-10 h-10 bg-[#3D619B] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-[#E9E9EB]">
                              {user.firstName} {user.lastName}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isBanned 
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                : user.isActive 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                              {user.isBanned ? 'Banned' : user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 mt-1 text-sm text-[#E9E9EB]/60">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{user.username}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Last seen: {formatLastSeen(user.lastSeen)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>{user.actions || 0} actions</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-medium text-[#E9E9EB]">${user.totalEarnings}</div>
                          <div className="text-xs text-[#E9E9EB]/60">Total Earnings</div>
                        </div>
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowDropdown(showDropdown === user.id ? null : user.id)}
                            className="p-2 hover:bg-[#43506C]/60 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-[#E9E9EB]/60" />
                          </button>
                          
                          <AnimatePresence>
                            {showDropdown === user.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 top-full mt-2 w-48 bg-[#43506C] border border-[#3D619B]/30 rounded-lg shadow-lg z-10"
                              >
                                <div className="py-2">
                                  <button
                                    onClick={() => handleUserAction(user.id, user.isBanned ? 'unban' : 'ban')}
                                    className="w-full px-4 py-2 text-left hover:bg-[#3D619B]/20 transition-colors flex items-center space-x-2"
                                  >
                                    {user.isBanned ? (
                                      <>
                                        <UserCheck className="w-4 h-4 text-green-400" />
                                        <span className="text-green-300">Unban User</span>
                                      </>
                                    ) : (
                                      <>
                                        <Ban className="w-4 h-4 text-red-400" />
                                        <span className="text-red-300">Ban User</span>
                                      </>
                                    )}
                                  </button>
                                  
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="w-full px-4 py-2 text-left hover:bg-[#3D619B]/20 transition-colors flex items-center space-x-2"
                                  >
                                    <Edit3 className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-300">Edit User</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => handleUserAction(user.id, 'export')}
                                    className="w-full px-4 py-2 text-left hover:bg-[#3D619B]/20 transition-colors flex items-center space-x-2"
                                  >
                                    <Download className="w-4 h-4 text-purple-400" />
                                    <span className="text-purple-300">Export User</span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CosmicModule>
        </CosmicEntrance>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileImport}
          className="hidden"
        />

        {/* Reason Modal */}
        <AnimatePresence>
          {showReasonModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4">
                  {pendingOperation?.operation === 'ban' ? 'Ban Users' : 'Unban Users'}
                </h3>
                <p className="text-[#E9E9EB]/60 mb-4">
                  Please provide a reason for this action:
                </p>
                <textarea
                  value={bulkReason}
                  onChange={(e) => setBulkReason(e.target.value)}
                  placeholder="Enter reason..."
                  className="w-full p-3 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] placeholder-[#E9E9EB]/50 focus:outline-none focus:border-[#EF4B4C]/50 resize-none"
                  rows={3}
                />
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={executeBulkOperation}
                    disabled={!bulkReason.trim()}
                    className="flex-1 bg-[#EF4B4C] hover:bg-[#EF4B4C]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowReasonModal(false);
                      setPendingOperation(null);
                      setBulkReason('');
                    }}
                    className="flex-1 bg-[#43506C]/60 hover:bg-[#43506C]/80 text-[#E9E9EB] py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Options Modal */}
        <AnimatePresence>
          {showExportOptions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4">Export Options</h3>
                <p className="text-[#E9E9EB]/60 mb-6">Choose how you want to export the selected users:</p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleExportToDevice}
                    className="w-full flex items-center space-x-3 p-4 bg-[#3D619B]/20 border border-[#3D619B]/30 rounded-lg hover:bg-[#3D619B]/30 transition-colors"
                  >
                    <Download className="w-5 h-5 text-[#3D619B]" />
                    <div className="text-left">
                      <div className="font-medium text-[#E9E9EB]">Export to Device</div>
                      <div className="text-sm text-[#E9E9EB]/60">Download as CSV file</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleExportToGoogleSheets}
                    className="w-full flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    <FileSpreadsheet className="w-5 h-5 text-green-400" />
                    <div className="text-left">
                      <div className="font-medium text-[#E9E9EB]">Export to Google Sheets</div>
                      <div className="text-sm text-[#E9E9EB]/60">
                        {googleSheetsAuth.isLinked ? 'Direct export' : 'Link account first'}
                      </div>
                    </div>
                  </button>
                </div>
                
                <button
                  onClick={() => setShowExportOptions(false)}
                  className="w-full mt-4 bg-[#43506C]/60 hover:bg-[#43506C]/80 text-[#E9E9EB] py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Sheets Auth Modal */}
        <AnimatePresence>
          {showGoogleSheetsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileSpreadsheet className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#E9E9EB] mb-2">Link Google Sheets</h3>
                  <p className="text-[#E9E9EB]/60 mb-6">
                    Connect your Google account to export data directly to Google Sheets
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={linkGoogleSheetsAccount}
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Connect Google Account</span>
                    </button>
                    
                    <button
                      onClick={() => setShowGoogleSheetsModal(false)}
                      className="w-full bg-[#43506C]/60 hover:bg-[#43506C]/80 text-[#E9E9EB] py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit User Modal */}
        <AnimatePresence>
          {showEditModal && editingUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-6 max-w-lg w-full mx-4"
              >
                <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4">Edit User Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#E9E9EB] mb-1">First Name</label>
                      <input
                        type="text"
                        value={editingUser.firstName}
                        onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                        className="w-full p-3 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:border-[#EF4B4C]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#E9E9EB] mb-1">Last Name</label>
                      <input
                        type="text"
                        value={editingUser.lastName}
                        onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})}
                        className="w-full p-3 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:border-[#EF4B4C]/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#E9E9EB] mb-1">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full p-3 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:border-[#EF4B4C]/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#E9E9EB] mb-1">Username</label>
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                      className="w-full p-3 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:border-[#EF4B4C]/50"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={saveUserEdit}
                    className="flex-1 bg-[#EF4B4C] hover:bg-[#EF4B4C]/80 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingUser(null);
                    }}
                    className="flex-1 bg-[#43506C]/60 hover:bg-[#43506C]/80 text-[#E9E9EB] py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Import Modal */}
        <AnimatePresence>
          {showImportModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4">Import Preview</h3>
                <p className="text-[#E9E9EB]/60 mb-4">
                  Review the imported data before saving to database:
                </p>
                
                <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
                  {importedData.map((user, index) => (
                    <div key={index} className="p-3 bg-[#43506C]/40 rounded-lg border border-[#3D619B]/30">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-[#E9E9EB]/60">Name: </span>
                          <span className="text-[#E9E9EB]">{user.firstName} {user.lastName}</span>
                        </div>
                        <div>
                          <span className="text-[#E9E9EB]/60">Email: </span>
                          <span className="text-[#E9E9EB]">{user.email}</span>
                        </div>
                        <div>
                          <span className="text-[#E9E9EB]/60">Username: </span>
                          <span className="text-[#E9E9EB]">{user.username}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={saveImportedData}
                    className="flex-1 bg-[#EF4B4C] hover:bg-[#EF4B4C]/80 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Import {importedData.length} Users
                  </button>
                  <button
                    onClick={() => {
                      setShowImportModal(false);
                      setImportedData([]);
                    }}
                    className="flex-1 bg-[#43506C]/60 hover:bg-[#43506C]/80 text-[#E9E9EB] py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Card Feature */}
        <AnimatePresence>
          {showFloatingCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'fixed',
                left: floatingCardPosition.x,
                top: floatingCardPosition.y,
                zIndex: 1000
              }}
              className="bg-[#43506C] border border-[#3D619B]/30 rounded-xl p-4 shadow-2xl backdrop-blur-sm"
              onMouseDown={handleMouseDown}
            >
              <div className="cursor-move">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#E9E9EB]">Quick Stats</h4>
                  <button
                    onClick={toggleFloatingCard}
                    className="text-[#E9E9EB]/60 hover:text-[#E9E9EB] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#E9E9EB]/60">Total Users:</span>
                    <span className="text-[#E9E9EB] font-medium">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#E9E9EB]/60">Selected:</span>
                    <span className="text-[#E9E9EB] font-medium">{selectedUsers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#E9E9EB]/60">Active:</span>
                    <span className="text-green-400 font-medium">
                      {users.filter(u => u.isActive && !u.isBanned).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#E9E9EB]/60">Banned:</span>
                    <span className="text-red-400 font-medium">
                      {users.filter(u => u.isBanned).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#E9E9EB]/60">Filtered:</span>
                    <span className="text-blue-400 font-medium">{filteredUsers.length}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-[#3D619B]/30">
                  <div className="text-xs text-[#E9E9EB]/60">
                    Drag to move • Click X to close
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserCarePage;