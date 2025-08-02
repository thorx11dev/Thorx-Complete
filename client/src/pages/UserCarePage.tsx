import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Search, Eye, EyeOff, Ban, CheckCircle, AlertCircle, UserX, Shield, Clock, User, Filter, Grid3X3, List, Star, Mail, DollarSign, Calendar, Users, BarChart3, Activity, Download, Upload, Target, Zap, TrendingUp, PieChart, FileText, Settings, Package } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, AsymmetricGrid, CosmicModule } from '@/components/CosmicAdvancedLayout';

interface UserAccount {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  totalEarnings: string;
  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedBy?: number;
  bannedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const UserCarePage = () => {
  const { teamMember } = useTeamAuth();
  const [activeTab, setActiveTab] = useState<'database' | 'analytics' | 'bulk' | 'segments' | 'report'>('database');
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{[key: number]: boolean}>({});
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

  // Report section state
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [actionType, setActionType] = useState<'ban' | 'unban'>('ban');
  const [banReason, setBanReason] = useState('');
  const [processing, setProcessing] = useState(false);

  // New state for advanced features
  const [analytics, setAnalytics] = useState<any>(null);
  const [bulkOperations, setBulkOperations] = useState<any[]>([]);
  const [segments, setSegments] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [bulkOperation, setBulkOperation] = useState<'ban' | 'unban' | 'activate' | 'deactivate' | 'export' | 'import'>('ban');
  const [bulkReason, setBulkReason] = useState('');
  const [showActivityModal, setShowActivityModal] = useState<number | null>(null);
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<any[]>([]);
  const [showImportPreview, setShowImportPreview] = useState(false);

  useEffect(() => {
    loadUsers();
    if (activeTab === 'analytics') loadAnalytics();
    if (activeTab === 'bulk') loadBulkOperations();
    if (activeTab === 'segments') loadSegments();
  }, [activeTab]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Map database field names to frontend field names
        const mappedUserData = userData.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          firstName: user.first_name || user.firstName,
          lastName: user.last_name || user.lastName,
          totalEarnings: user.total_earnings || user.totalEarnings || '0.00',
          isActive: user.is_active !== undefined ? user.is_active : user.isActive,
          isBanned: user.is_banned !== undefined ? user.is_banned : user.isBanned,
          banReason: user.ban_reason || user.banReason,
          bannedBy: user.banned_by || user.bannedBy,
          bannedAt: user.banned_at || user.bannedAt,
          createdAt: user.created_at || user.createdAt,
          updatedAt: user.updated_at || user.updatedAt
        }));

        setUsers(mappedUserData);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/analytics', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const loadBulkOperations = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/bulk-operations', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBulkOperations(data);
      }
    } catch (error) {
      console.error('Error loading bulk operations:', error);
    }
  };

  const loadSegments = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/segments', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSegments(data);
      }
    } catch (error) {
      console.error('Error loading segments:', error);
    }
  };

  const loadUserActivity = async (userId: number) => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/users/${userId}/activity`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserActivities(data);
        setShowActivityModal(userId);
      }
    } catch (error) {
      console.error('Error loading user activity:', error);
    }
  };

  const handleBulkOperation = async () => {
    if (selectedUsers.length === 0 && bulkOperation !== 'import') return;
    if ((bulkOperation === 'ban' || bulkOperation === 'unban') && !bulkReason.trim()) return;
    if (bulkOperation === 'import' && (!importFile || importData.length === 0)) return;

    setProcessing(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');

      if (bulkOperation === 'export') {
        // Handle export operation
        const response = await fetch('/api/team/users/export', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userIds: selectedUsers,
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
          alert(`Exported ${selectedUsers.length} users successfully`);
        } else {
          alert('Failed to export users');
        }
      } else if (bulkOperation === 'import') {
        const response = await fetch('/api/team/users/import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ users: importData }),
        });

        if (response.ok) {
          await loadUsers();
          setImportFile(null);
          setImportData([]);
          setShowImportPreview(false);
          alert(`Imported ${importData.length} users successfully`);
        } else {
          const errorData = await response.json();
          alert(`Failed to import users: ${errorData.error || 'Unknown error'}`);
        }

      } else {
        // Handle other bulk operations
        const response = await fetch('/api/team/users/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            operation: bulkOperation,
            userIds: selectedUsers,
            reason: bulkReason,
          }),
        });

        if (response.ok) {
          await loadUsers();
          await loadBulkOperations();
          setSelectedUsers([]);
          setBulkReason('');
          alert(`${bulkOperation.charAt(0).toUpperCase() + bulkOperation.slice(1)} operation completed successfully for ${selectedUsers.length} users`);
        } else {
          const errorData = await response.json();
          alert(`Failed to execute ${bulkOperation} operation: ${errorData.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error executing bulk operation:', error);
      alert('Error executing bulk operation');
    } finally {
      setProcessing(false);
    }
  };

  const handleBanAction = async () => {
    if (!selectedUser || !banReason.trim()) return;

    setProcessing(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const endpoint = actionType === 'ban' ? `/api/team/users/${selectedUser.id}/ban` : `/api/team/users/${selectedUser.id}/unban`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: banReason,
        }),
      });

      if (response.ok) {
        // Refresh user list
        await loadUsers();
        setSelectedUser(null);
        setBanReason('');
        alert(`User ${actionType === 'ban' ? 'banned' : 'unbanned'} successfully`);
      } else {
        alert('Failed to process request');
      }
    } catch (error) {
      console.error('Error processing ban action:', error);
      alert('Error processing request');
    } finally {
      setProcessing(false);
    }
  };

  const togglePasswordVisibility = (userId: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && !user.isBanned) ||
      (statusFilter === 'banned' && user.isBanned);

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => !u.isBanned).length;
    const banned = users.filter(u => u.isBanned).length;
    const totalEarnings = users.reduce((sum, u) => sum + parseFloat(u.totalEarnings || '0'), 0);

    return { total, active, banned, totalEarnings };
  };

  const stats = getUserStats();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      parseCSV(file);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const text = e.target.result;
      csvToJson(text);
    };

    reader.readAsText(file);
  };

  const csvToJson = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
      }

      result.push(obj);
    }

    setImportData(result);
    setShowImportPreview(true);
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

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const executeBulkOperation = async () => {
    if (!bulkOperation || selectedUsers.length === 0) return;

    setProcessing(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          operation: bulkOperation,
          userIds: selectedUsers,
          reason: bulkReason || `Bulk ${bulkOperation} operation`
        })
      });

      if (response.ok) {
        // Refresh users list
        await loadUsers();

        // Reset selections
        setSelectedUsers([]);
        setBulkOperation('ban');
        setBulkReason('');

        alert(`Successfully ${bulkOperation}ned ${selectedUsers.length} user(s)`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error executing bulk operation:', error);
      alert('Error executing bulk operation');
    } finally {
      setProcessing(false);
    }
  };

  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('csv', file);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/import-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Successfully imported ${result.count} users`);

        // Refresh users list
        await loadUsers();
      } else {
        const error = await response.json();
        alert(`Import error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error importing CSV file:', error);
      alert('Error importing CSV file');
    }
  };

  const importFromGoogleSheets = async () => {
    const sheetUrl = prompt('Enter Google Sheets URL:');
    if (!sheetUrl) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/import-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sheetUrl })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Successfully imported ${result.count} users from Google Sheets`);

        // Refresh users list
        await loadUsers();
      } else {
        const error = await response.json();
        alert(`Import error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error importing from Google Sheets:', error);
      alert('Error importing from Google Sheets');
    }
  };

  const exportSelectedUsers = async () => {
    if (selectedUsers.length === 0) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/export-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userIds: selectedUsers })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Error exporting users');
      }
    } catch (error) {
      console.error('Error exporting selected users:', error);
      alert('Error exporting users');
    }
  };

  const exportToGoogleSheets = async () => {
    if (selectedUsers.length === 0) return;

    const sheetUrl = prompt('Enter Google Sheets URL to export to:');
    if (!sheetUrl) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/users/export-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userIds: selectedUsers,
          sheetUrl 
        })
      });

      if (response.ok) {
        alert('Successfully exported users to Google Sheets');
      } else {
        const error = await response.json();
        alert(`Export error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error exporting to Google Sheets:', error);
      alert('Error exporting to Google Sheets');
    }
  };

  return (
    <div className="flex min-h-screen" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <div className="flex-1 p-6 relative w-full max-w-none">

      {/* Enhanced Tab Navigation */}
      <CosmicEntrance type="stellar" delay={0.1}>
        <CosmicModule effect="glass" className="mb-6 relative z-10">
          <div className="flex flex-wrap gap-1 bg-[#43506C]/60 backdrop-blur-sm p-1 rounded-lg border border-[#EF4B4C]/20">
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md transition-colors ${
              activeTab === 'database'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md transition-colors ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md transition-colors ${
              activeTab === 'bulk'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Bulk Ops
          </button>
          <button
            onClick={() => setActiveTab('segments')}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md transition-colors ${
              activeTab === 'segments'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Segments
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md transition-colors ${
              activeTab === 'report'
                ? 'bg-red-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Report
          </button>
        </div>
        </CosmicModule>
      </CosmicEntrance>

      {/* Enhanced Database Tab with Modern Design */}
      {activeTab === 'database' && (
        <CosmicEntrance type="stellar" delay={0.2}>
          <div className="space-y-6">
            {/* Cosmic Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <CosmicModule effect="glass" className="p-4 rounded-xl border border-[#3D619B]/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#3D619B]/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#3D619B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#E9E9EB]/60">Total Users</p>
                    <p className="text-xl font-bold text-[#E9E9EB]">{stats.total}</p>
                  </div>
                </div>
              </CosmicModule>

              <CosmicModule effect="glass" className="p-4 rounded-xl border border-[#3D619B]/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#3D619B]/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#3D619B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#E9E9EB]/60">Active Users</p>
                    <p className="text-xl font-bold text-[#E9E9EB]">{stats.active}</p>
                  </div>
                </div>
              </CosmicModule>

              <CosmicModule effect="glass" className="p-4 rounded-xl border border-[#EF4B4C]/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#EF4B4C]/20 rounded-lg flex items-center justify-center">
                    <UserX className="w-5 h-5 text-[#EF4B4C]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#E9E9EB]/60">Banned Users</p>
                    <p className="text-xl font-bold text-[#E9E9EB]">{stats.banned}</p>
                  </div>
                </div>
              </CosmicModule>

              <CosmicModule effect="glass" className="p-4 rounded-xl border border-[#3D619B]/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#3D619B]/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#3D619B]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#E9E9EB]/60">Total Earnings</p>
                    <p className="text-xl font-bold text-[#E9E9EB]">${stats.totalEarnings.toFixed(2)}</p>
                  </div>
                </div>
              </CosmicModule>
            </div>

            {/* Enhanced Controls Bar */}
            <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold text-[#E9E9EB]">Cosmic User Database</h3>
                  <span className="text-sm text-[#E9E9EB]/60">({filteredUsers.length} users)</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="w-4 h-4 text-[#3D619B] bg-[#43506C]/60 border-[#3D619B]/30 rounded focus:ring-[#3D619B]/50"
                    />
                    <span className="text-sm text-[#E9E9EB]/60">Select All ({selectedUsers.length})</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E9E9EB]/40 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search cosmic users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] placeholder-[#E9E9EB]/40 focus:outline-none focus:ring-2 focus:ring-[#3D619B]/50 focus:border-[#3D619B]/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E9E9EB]/40 w-4 h-4" />
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value as 'all' | 'active' | 'banned');
                        setCurrentPage(1);
                      }}
                      className="pl-10 pr-8 py-2 bg-[#43506C]/60 border border-[#3D619B]/30 rounded-lg text-[#E9E9EB] focus:outline-none focus:ring-2 focus:ring-[#3D619B]/50 focus:border-[#3D619B]/50 backdrop-blur-sm appearance-none"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active Only</option>
                      <option value="banned">Banned Only</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex rounded-lg border border-[#3D619B]/30 overflow-hidden bg-[#43506C]/60">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-3 py-2 flex items-center space-x-2 transition-all duration-200 ${
                        viewMode === 'cards'
                          ? 'bg-[#3D619B] text-[#E9E9EB]'
                          : 'text-[#E9E9EB]/60 hover:text-[#E9E9EB] hover:bg-[#3D619B]/20'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                      <span className="text-xs">Cards</span>
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-2 flex items-center space-x-2 transition-all duration-200 ${
                        viewMode === 'table'
                          ? 'bg-[#3D619B] text-[#E9E9EB]'
                          : 'text-[#E9E9EB]/60 hover:text-[#E9E9EB] hover:bg-[#3D619B]/20'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span className="text-xs">Table</span>
                    </button>
                  </div>
                </div>
              </div>
            </CosmicModule>

            {/* Conditional Rendering Based on View Mode */}
            {viewMode === 'cards' ? (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                  {paginatedUsers.map((user, index) => (
                    <CosmicModule
                      key={user.id}
                      effect="glass"
                      className="p-5 rounded-xl border border-[#3D619B]/30 hover:border-[#3D619B]/50 transition-all duration-300 hover:scale-105 group cosmic-user-card min-h-[600px] w-full flex flex-col"
                    >
                      {/* User Header with Avatar and Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
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
                            className="w-4 h-4 text-[#3D619B] bg-[#43506C]/60 border-[#3D619B]/30 rounded focus:ring-[#3D619B]/50"
                          /></div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 ${
                            user.isBanned 
                              ? 'bg-[#EF4B4C]/10 shadow-[#EF4B4C]/20 border-[#EF4B4C]/30' 
                              : 'bg-[#3D619B]/10 shadow-[#3D619B]/20 border-[#3D619B]/30'
                          }`}>
                            <User className={`w-7 h-7 ${user.isBanned ? 'text-[#EF4B4C]' : 'text-[#3D619B]'}`} />                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-[#E9E9EB] leading-tight mb-1">
                              {(user.firstName && user.lastName) 
                                ? `${user.firstName} ${user.lastName}` 
                                : user.username || 'User'}
                            </h4>
                            <p className="text-sm text-[#E9E9EB]/70 mb-1">@{user.username}</p>
                            <p className="text-xs text-[#E9E9EB]/50">ID: #{user.id}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          {user.isBanned ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EF4B4C]/20 border border-[#EF4B4C]/40 text-[#EF4B4C]">
                              <UserX className="w-3 h-3 mr-1" />
                              Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#3D619B]/20 border border-[#3D619B]/40 text-[#3D619B]">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* User Information Grid */}
                      <div className="space-y-3 mb-4">
                        {/* Email Address */}
                        <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mail className="w-4 h-4 text-[#E9E9EB]/50" />
                            <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Email Address</span>
                          </div>
                          <p className="text-sm text-[#E9E9EB] font-medium truncate" title={user.email}>{user.email}</p>
                        </div>

                        {/* Password Section */}
                        <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-[#E9E9EB]/50" />
                              <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Password</span>
                            </div>
                            <button
                              onClick={() => togglePasswordVisibility(user.id)}
                              className="text-xs text-[#3D619B] hover:text-[#E9E9EB] transition-colors"
                            >
                              {showPasswords[user.id] ? 'Hide' : 'Show'}
                            </button>
                          </div>
                          <p className="text-sm text-[#E9E9EB] font-mono">
                            {showPasswords[user.id] ? '••••••••' : '••••••••'}
                          </p>
                          <p className="text-xs text-[#E9E9EB]/60 mt-1">
                            Password access restricted for security
                          </p>
                        </div>

                        {/* User Details Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="w-4 h-4 text-[#E9E9EB]/50" />
                              <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">First Name</span>
                            </div>
                            <p className="text-sm text-[#E9E9EB] font-medium">{user.firstName || 'Not provided'}</p>
                          </div>

                          <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="w-4 h-4 text-[#E9E9EB]/50" />
                              <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Last Name</span>
                            </div>
                            <p className="text-sm text-[#E9E9EB] font-medium">{user.lastName || 'Not provided'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <DollarSign className="w-4 h-4 text-[#E9E9EB]/50" />
                              <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Total Earnings</span>
                            </div>
                            <p className="text-sm text-[#E9E9EB] font-bold">${user.totalEarnings || '0.00'}</p>
                          </div>

                          <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="w-4 h-4 text-[#E9E9EB]/50" />                              <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Joined</span>
                            </div>
                            <p className="text-xs text-[#E9E9EB] font-medium">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: '2-digit'
                              }) : 'Unknown'}
                            </p>
                          </div>
                        </div>

                        {/* Account Status */}
                        <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-[#E9E9EB]/50" />
                            <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Account Status</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${user.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                              <span className="text-sm text-[#E9E9EB]">{user.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                            {user.isBanned && (
                              <span className="text-xs text-[#EF4B4C] bg-[#EF4B4C]/20 px-2 py-1 rounded">Banned</span>
                            )}
                          </div>
                        </div>

                        {/* Last Updated */}
                        <div className="bg-[#43506C]/30 rounded-lg p-3 border border-[#3D619B]/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-4 h-4 text-[#E9E9EB]/50" />
                            <span className="text-xs font-medium text-[#E9E9EB]/60 uppercase tracking-wide">Last Updated</span>
                          </div>
                          <p className="text-xs text-[#E9E9EB] font-medium">
                            {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Unknown'}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#3D619B]/20 mt-auto">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => loadUserActivity(user.id)}
                            className="flex items-center space-x-1 px-2 py-1 bg-[#3D619B]/20 hover:bg-[#3D619B]/30 rounded text-xs font-medium text-[#E9E9EB]/80 hover:text-[#E9E9EB] transition-all duration-200 border border-[#3D619B]/30"
                          >
                            <Activity className="w-3 h-3" />
                            <span>Activity</span>
                          </button></div>
                        <div className="flex items-center space-x-2">
                          {user.isBanned ? (
                            <button className="flex items-center space-x-2 px-3 py-1.5 bg-[#EF4B4C]/20 hover:bg-[#EF4B4C]/30 rounded-lg text-xs font-medium text-[#EF4B4C] transition-all duration-200 border border-[#EF4B4C]/30">
                              <Ban className="w-3 h-3" />
                              <span>Banned</span>
                            </button>
                          ) : (
                            <button className="flex items-center space-x-2 px-3 py-1.5 bg-[#3D619B]/20 hover:bg-[#3D619B]/30 rounded-lg text-xs font-medium text-[#E9E9EB]/80 hover:text-[#E9E9EB] transition-all duration-200 border border-[#3D619B]/30">
                              <CheckCircle className="w-3 h-3" />
                              <span>Active User</span>
                            </button>
                          )}
                        </div>

                        <div className="text-xs text-[#E9E9EB]/50 font-mono">
                          ID: #{user.id}
                        </div>
                      </div>
                    </CosmicModule>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#43506C]/80 backdrop-blur-sm rounded-xl border border-[#3D619B]/30 overflow-hidden" style={{boxShadow: '0 8px 32px rgba(61, 97, 155, 0.1)'}}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#43506C]/90 backdrop-blur-sm">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Cosmic User</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Email Portal</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Cosmic Earnings</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Voyage Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Journey Start</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#E9E9EB] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#43506C]/50">
                      {paginatedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-[#43506C]/40 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                                user.isBanned ? 'bg-[#EF4B4C]/20 shadow-[#EF4B4C]/20' : 'bg-[#3D619B]/20 shadow-[#3D619B]/20'
                              }`}>
                                <User className={`w-5 h-5 ${user.isBanned ? 'text-[#EF4B4C]' : 'text-[#3D619B]'}`} />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-[#E9E9EB]">
                                  {(user.firstName && user.lastName) 
                                    ? `${user.firstName} ${user.lastName}` 
                                    : user.username || 'User'}
                                </div>
                                <div className="text-sm text-[#E9E9EB]/60">@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E9E9EB]/80">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E9E9EB]/80 font-semibold">
                            ${user.totalEarnings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.isBanned ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EF4B4C]/20 border border-[#EF4B4C]/30 text-[#EF4B4C]">
                                <UserX className="w-3 h-3 mr-1" />
                                Banned
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#3D619B]/20 border border-[#3D619B]/30 text-[#3D619B]">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E9E9EB]/80">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => togglePasswordVisibility(user.id)}
                              className="text-[#E9E9EB]/60 hover:text-[#E9E9EB] transition-colors p-1 rounded"
                              title="Toggle access visibility"
                            >
                              {showPasswords[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <CosmicModule effect="glass" className="p-4 rounded-xl border border-[#3D619B]/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#E9E9EB]/60">
                    Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-lg bg-[#43506C]/60 border border-[#3D619B]/30 text-[#E9E9EB]/60 hover:text-[#E9E9EB] hover:bg-[#3D619B]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                              currentPage === pageNum
                                ? 'bg-[#3D619B] text-[#E9E9EB] shadow-lg shadow-[#3D619B]/25'
                                : 'bg-[#43506C]/60 border border-[#3D619B]/30 text-[#E9E9EB]/60 hover:text-[#E9E9EB] hover:bg-[#3D619B]/20'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-lg bg-[#43506C]/60 border border-[#3D619B]/30 text-[#E9E9EB]/60 hover:text-[#E9E9EB] hover:bg-[#3D619B]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </CosmicModule>
            )}
          </div>
        </CosmicEntrance>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <CosmicEntrance type="stellar" delay={0.2}>
          <div className="space-y-6">
            {analytics && (
              <>
                {/* Enhanced Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#3D619B]/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#3D619B]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#E9E9EB]/60">Total Users</p>
                        <p className="text-2xl font-bold text-[#E9E9EB]">{analytics.overview.totalUsers}</p>
                        <p className="text-xs text-green-400">+{analytics.overview.newUsersWeek} this week</p>
                      </div>
                    </div>
                  </CosmicModule>

                  <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-[#E9E9EB]/60">Active Users</p>
                        <p className="text-2xl font-bold text-[#E9E9EB]">{analytics.overview.activeUsers}</p>
                        <p className="text-xs text-green-400">+{analytics.overview.newUsersToday} today</p>
                      </div>
                    </div>
                  </CosmicModule>

                  <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#EF4B4C]/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#EF4B4C]/20 rounded-lg flex items-center justify-center">
                        <UserX className="w-6 h-6 text-[#EF4B4C]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#E9E9EB]/60">Banned Users</p>
                        <p className="text-2xl font-bold text-[#E9E9EB]">{analytics.overview.bannedUsers}</p>
                        <p className="text-xs text-[#EF4B4C]">Requires attention</p>
                      </div>
                    </div>
                  </CosmicModule>

                  <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm text-[#E9E9EB]/60">Total Earnings</p>
                        <p className="text-2xl font-bold text-[#E9E9EB]">${analytics.overview.totalEarnings}</p>
                        <p className="text-xs text-yellow-400">Platform wide</p>
                      </div>
                    </div>
                  </CosmicModule>
                </div>

                {/* Top Earners */}
                <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
                  <h3 className="text-xl font-bold text-[#E9E9EB] mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Earners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {analytics.topEarners.map((earner: any, index: number) => (
                      <div key={earner.id} className="bg-[#43506C]/40 rounded-lg p-4 border border-[#3D619B]/20">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-orange-600 text-white' :
                            'bg-[#3D619B] text-white'
                          }`}>
                            #{index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#E9E9EB] truncate">
                              {earner.firstName} {earner.lastName}
                            </p>
                            <p className="text-xs text-[#E9E9EB]/60">@{earner.username}</p>
                            <p className="text-sm font-bold text-green-400">${earner.totalEarnings}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CosmicModule>

                {/* User Growth Chart Placeholder */}
                <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
                  <h3 className="text-xl font-bold text-[#E9E9EB] mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    User Growth (Last 30 Days)
                  </h3>
                  <div className="h-64 bg-[#43506C]/40 rounded-lg flex items-center justify-center">
                    <p className="text-[#E9E9EB]/60">Growth chart visualization will be implemented here</p>
                  </div>
                </CosmicModule>
              </>
            )}
          </div>
        </CosmicEntrance>
      )}

      {/* Bulk Operations Tab */}
      {activeTab === 'bulk' && (
        <CosmicEntrance type="stellar" delay={0.2}>
          <div className="space-y-6">
            {/* Enhanced Bulk Operations */}
          <div className="bg-[#43506C]/60 backdrop-blur-sm rounded-lg border border-[#EF4B4C]/20 p-6">
            <h3 className="text-lg font-semibold text-[#E9E9EB] mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#EF4B4C]" />
              Bulk Operations Control Center
            </h3>

            <div className="space-y-6">
              {/* Main Operations */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[#E9E9EB]/80">User Management Operations</h4>
                <div className="flex flex-wrap gap-3">
                  <select 
                    value={bulkOperation}
                    onChange={(e) => setBulkOperation(e.target.value as any)}
                    className="bg-gradient-to-r from-[#2a3142] to-[#43506C]/60 border border-[#EF4B4C]/30 rounded-xl px-4 py-3 text-[#E9E9EB] text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#EF4B4C]/50 focus:border-[#EF4B4C] focus:ring-2 focus:ring-[#EF4B4C]/20 min-w-[180px]"
                  >
                    <option value="">🎯 Select Operation</option>
                    <option value="ban">🚫 Ban Users</option>
                    <option value="unban">✅ Unban Users</option>
                    <option value="activate">🟢 Activate Users</option>
                    <option value="deactivate">🔴 Deactivate Users</option>
                    <option value="export">📤 Export Users</option>
                  </select>

                  <input 
                    type="text" 
                    placeholder="Enter reason for this action..." 
                    value={bulkReason}
                    onChange={(e) => setBulkReason(e.target.value)}
                    className="bg-gradient-to-r from-[#2a3142] to-[#43506C]/60 border border-[#E9E9EB]/20 rounded-xl px-4 py-3 text-[#E9E9EB] text-sm flex-1 min-w-[250px] backdrop-blur-sm transition-all duration-300 hover:border-[#EF4B4C]/30 focus:border-[#EF4B4C] focus:ring-2 focus:ring-[#EF4B4C]/20"
                  />

                  <button 
                    onClick={handleBulkOperation}
                    disabled={
                      (selectedUsers.length === 0 && bulkOperation !== 'import') ||
                      ((bulkOperation === 'ban' || bulkOperation === 'unban') && !bulkReason.trim()) ||
                      (bulkOperation === 'import' && (!importFile || importData.length === 0)) ||
                      processing
                    }
                    className="bg-gradient-to-r from-[#EF4B4C] to-[#EF4B4C]/80 hover:from-[#EF4B4C]/90 hover:to-[#EF4B4C] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm transition-all duration-300 font-medium shadow-lg hover:shadow-[#EF4B4C]/30 transform hover:scale-105 flex items-center"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Execute ({selectedUsers.length})
                  </button>
                </div>

                {bulkOperation && (
                  <div className="bg-[#2a3142]/60 border border-[#EF4B4C]/20 rounded-lg p-3">
                    <p className="text-xs text-[#E9E9EB]/70">
                      {selectedUsers.length > 0 
                        ? `Ready to ${bulkOperation} ${selectedUsers.length} selected user${selectedUsers.length > 1 ? 's' : ''}`
                        : 'Please select users from the table below to perform this operation'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Import/Export Section */}
              <div className="border-t border-[#E9E9EB]/10 pt-4 space-y-4">
                <h4 className="text-sm font-medium text-[#E9E9EB]/80">Data Import/Export</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="text-xs text-[#E9E9EB]/60">Import Options</h5>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => document.getElementById('csv-file-input')?.click()}
                        className="bg-gradient-to-r from-[#3D619B] to-[#3D619B]/80 hover:from-[#3D619B]/90 hover:to-[#3D619B] text-white px-4 py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-[#3D619B]/30 transform hover:scale-105"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Import from Computer
                      </button>
                      <input 
                        id="csv-file-input"
                        type="file" 
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg
                                file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                      />
                      {showImportPreview && importData.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-[#E9E9EB]">Import Preview</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr>
                                  {Object.keys(importData[0]).map((key) => (
                                    <th key={key} className="px-4 py-2 text-left text-sm font-medium text-[#E9E9EB]">
                                      {key}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {importData.map((item, index) => (
                                  <tr key={index} className="hover:bg-[#43506C]/40">
                                    {Object.values(item).map((value, index) => (
                                      <td key={index} className="px-4 py-2 text-sm text-[#E9E9EB]">
                                        {String(value)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs text-[#E9E9EB]/60">Export Options</h5>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleBulkOperation}
                        disabled={selectedUsers.length === 0}
                        className="bg-gradient-to-r from-[#43506C] to-[#43506C]/80 hover:from-[#43506C]/90 hover:to-[#43506C] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-[#43506C]/30 transform hover:scale-105"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Selected ({selectedUsers.length})
                      </button>
                      <button 
                        onClick={handleBulkOperation}
                        disabled={selectedUsers.length === 0}
                        className="bg-gradient-to-r from-[#EF4B4C]/70 to-[#EF4B4C]/50 hover:from-[#EF4B4C]/80 hover:to-[#EF4B4C]/60 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-[#EF4B4C]/30 transform hover:scale-105"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export to Google Sheets
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </CosmicEntrance>
      )}

      {/* User Segmentation Tab */}
      {activeTab === 'segments' && (
        <CosmicEntrance type="stellar" delay={0.2}>
          <div className="space-y-6">
            <CosmicModule effect="glass" className="p-6 rounded-xl border border-[#3D619B]/30">
              <h3 className="text-xl font-bold text-[#E9E9EB] mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                User Segments
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {segments.map((segment: any) => (
                  <div key={segment.id} className="bg-[#43506C]/40 rounded-lg p-6 border border-[#3D619B]/20 hover:border-[#3D619B]/40 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-[#E9E9EB]">{segment.name}</h4>
                        <p className="text-sm text-[#E9E9EB]/60">{segment.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#3D619B]/20 border border-[#3D619B]/40 text-[#3D619B] text-sm font-medium rounded-full">
                        {segment.userCount} users
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 px-3 bg-[#3D619B] hover:bg-[#3D619B]/80 text-white text-sm rounded-lg transition-colors">
                        View Users
                      </button>
                      <button className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                        Export Segment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CosmicModule>
          </div>
        </CosmicEntrance>
      )}

      {/* Report Tab with Stellar Entrance */}
      {activeTab === 'report' && (
        <CosmicEntrance type="stellar" delay={0.2}>
        <CosmicModule effect="glass" className="p-6 rounded-lg border border-[#EF4B4C]/20">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">User Management Actions</h3>
            <p className="text-slate-400 text-sm">Ban or unban user accounts with mandatory reason documentation.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Selection */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h4 className="text-md font-medium text-slate-200 mb-4">Select User</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-slate-400">@{user.username}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.isBanned ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <UserX className="w-3 h-3 mr-1" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h4 className="text-md font-medium text-slate-200 mb-4">Take Action</h4>

              {selectedUser ? (
                <div className="space-y-4">
                  {/* Selected User Info */}
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <div className="text-sm font-medium text-slate-200">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </div>
                    <div className="text-xs text-slate-400">{selectedUser.email}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Current Status: {selectedUser.isBanned ? 'Banned' : 'Active'}
                    </div>
                  </div>

                  {/* Action Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Action Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActionType('ban')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          actionType === 'ban'
                            ? 'border-red-500 bg-red-900/20 text-red-300'
                            : 'border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <Ban className="w-4 h-4 inline mr-2" />
                        Ban User
                      </button>
                      <button
                        onClick={() => setActionType('unban')}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          actionType === 'unban'
                            ? 'border-green-500 bg-green-900/20 text-green-300'
                            : 'border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <Shield className="w-4 h-4 inline mr-2" />
                        Unban User
                      </button>
                    </div>
                  </div>

                  {/* Reason Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Reason (Required)
                    </label>
                    <textarea
                      value={banReason}
                      onChange={(e) => setBanReason(e.target.value)}
                      placeholder={`Enter reason for ${actionType}ning this user...`}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleBanAction}
                    disabled={processing || !banReason.trim()}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      actionType === 'ban'
                        ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-800'
                        : 'bg-green-600 hover:bg-green-700 disabled:bg-green-800'
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {processing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        {actionType === 'ban' ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                        <span>{actionType === 'ban' ? 'Ban User' : 'Unban User'}</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Select a user to take action</p>
                </div>
              )}
            </div>
          </div>
        </CosmicModule>
        </CosmicEntrance>
      )}

      {/* User Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <CosmicModule effect="glass" className="w-full max-w-4xl max-h-[80vh] m-4 p-6 rounded-xl border border-[#3D619B]/30 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#E9E9EB] flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                User Activity Log
              </h3>
              <button
                onClick={() => setShowActivityModal(null)}
                className="w-8 h-8 bg-[#EF4B4C]/20 hover:bg-[#EF4B4C]/30 rounded-lg flex items-center justify-center text-[#EF4B4C] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-96">
              <div className="space-y-3">
                {userActivities.map((activity: any) => (
                  <div key={activity.id} className="bg-[#43506C]/40 rounded-lg p-4 border border-[#3D619B]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#E9E9EB]">{activity.action.replace('_', ' ').toUpperCase()}</p>
                        <p className="text-xs text-[#E9E9EB]/60">{activity.details}</p>
                      </div>
                      <div className="text-xs text-[#E9E9EB]/60">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}

                {userActivities.length === 0 && (
                  <p className="text-[#E9E9EB]/60 text-center py-8">No activity logs found</p>
                )}
              </div>
            </div>
          </CosmicModule>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserCarePage;