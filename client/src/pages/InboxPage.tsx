import { useState, useEffect } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Mail, MailOpen, Search, Calendar, User, RefreshCw, Star, Archive } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const InboxPage = () => {
  const { teamMember } = useTeamAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/messages', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const messageData = await response.json();
        setMessages(messageData);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMessages();
    setRefreshing(false);
  };

  const markAsRead = async (messageId: number) => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, isRead: true } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'unread' && !message.isRead) ||
      (filterType === 'read' && message.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
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
        {/* Advanced Cosmic Background with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cosmic-parallax-layer cosmic-parallax-slow">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#3D619B]/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#EF4B4C]/5 rounded-full blur-lg"></div>
          </div>
        </div>
        <CosmicParticles count={30} />
      <CosmicEntrance type="stellar" delay={0.1}>
        <CosmicModule effect="glass" className="flex items-center justify-between mb-6 p-4 rounded-lg border border-[#3D619B]/20">
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Cosmic Inbox</h3>
            <p className="text-slate-400 text-sm">
              {unreadCount} unread messages • {messages.length} total
            </p>
          </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
        </CosmicModule>
      </CosmicEntrance>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          {/* Search and Filter */}
          <div className="mb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('unread')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterType === 'unread'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilterType('read')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterType === 'read'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Read
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 max-h-96 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 cursor-pointer hover:bg-slate-700 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-slate-700' : ''
                    } ${!message.isRead ? 'border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {message.isRead ? (
                            <MailOpen className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Mail className="w-4 h-4 text-blue-500" />
                          )}
                          <p className={`text-sm truncate ${
                            message.isRead ? 'text-slate-300' : 'text-slate-200 font-medium'
                          }`}>
                            {message.name}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{message.email}</p>
                        <p className={`text-sm mt-1 truncate ${
                          message.isRead ? 'text-slate-400' : 'text-slate-300 font-medium'
                        }`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {message.message}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <p className="text-xs text-slate-400">{formatDate(message.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 h-96 flex flex-col">
            {selectedMessage ? (
              <>
                {/* Message Header */}
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-slate-200 mb-2">
                        {selectedMessage.subject}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{selectedMessage.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{selectedMessage.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!selectedMessage.isRead && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-300 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>

                {/* Message Actions */}
                <div className="p-6 border-t border-slate-700">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                      <Star className="w-4 h-4" />
                      <span>Star</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-slate-200 mb-2">
                    Select a message
                  </h4>
                  <p className="text-slate-400">
                    Choose a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default InboxPage;