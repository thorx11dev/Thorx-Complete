import { useState, useEffect, useRef, useCallback } from 'react';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import { Send, Paperclip, User, Clock, Search, Reply, Edit2, Trash2, Download, Image, FileText, X, Check, CheckCheck, Upload, Mic } from 'lucide-react';
import TeamSidebar from '@/components/TeamSidebar';
import { CosmicEntrance, CosmicModule, CosmicParticles } from '@/components/CosmicAdvancedLayout';
import { io, Socket } from 'socket.io-client';

interface TeamChat {
  id: number;
  senderId: number;
  message: string;
  createdAt: string;
  replyTo?: number;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isEdited?: boolean;
  senderName?: string;
  senderRole?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

interface TypingUser {
  userId: number;
  userName: string;
  isTyping: boolean;
}

interface MessageStatus {
  messageId: number;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  timestamp: string;
}

const LinkagePage = () => {
  const { teamMember } = useTeamAuth();
  const [messages, setMessages] = useState<TeamChat[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<TeamChat[]>([]);
  const [replyTo, setReplyTo] = useState<TeamChat | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messageStatuses, setMessageStatuses] = useState<Map<number, MessageStatus>>(new Map());
  const [dragOver, setDragOver] = useState(false);
  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    loadMessages();
    loadTeamMembers();

    // Only initialize socket if not already connected
    if (!socket) {
      initializeSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
      // Clear typing timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  

  const initializeSocket = () => {
    // Disconnect existing socket if any
    if (socket) {
      socket.off(); // Remove all listeners
      socket.disconnect();
      setSocket(null);
    }

    const socketConnection = io({
      forceNew: true,
      transports: ['websocket', 'polling'],
      timeout: 5000,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 3
    });

    socketConnection.on('connect', () => {
      console.log('Connected to server');
      if (teamMember) {
        socketConnection.emit('join-team', teamMember.id);
        // Update online status
        setTeamMembers(prev => prev.map(member => 
          member.id === teamMember.id 
            ? { ...member, isActive: true }
            : member
        ));
      }
    });

    socketConnection.on('new-message', (message: TeamChat) => {
      setMessages(prev => {
        // Check if message already exists to prevent duplicates
        const messageExists = prev.some(m => m.id === message.id);
        if (messageExists) {
          return prev;
        }
        return [...prev, message];
      });
      
      // Mark as delivered for other users
      if (message.senderId !== teamMember?.id) {
        setMessageStatuses(prev => new Map(prev.set(message.id, {
          messageId: message.id,
          status: 'delivered',
          timestamp: new Date().toISOString()
        })));
      }
    });

    socketConnection.on('user-typing', (data: { userId: number; userName: string; isTyping: boolean }) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(user => user.userId !== data.userId);
        if (data.isTyping && data.userId !== teamMember?.id) {
          return [...filtered, { userId: data.userId, userName: data.userName, isTyping: true }];
        }
        return filtered;
      });
    });

    socketConnection.on('message-read-update', (data: { messageId: number; readBy: number }) => {
      setMessageStatuses(prev => new Map(prev.set(data.messageId, {
        messageId: data.messageId,
        status: 'read',
        timestamp: new Date().toISOString()
      })));
    });

    socketConnection.on('message-status-update', (data: MessageStatus) => {
      setMessageStatuses(prev => new Map(prev.set(data.messageId, data)));
    });

    // Handle member online/offline status
    socketConnection.on('member-online', (memberId: number) => {
      setTeamMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, isActive: true }
          : member
      ));
    });

    socketConnection.on('member-offline', (memberId: number) => {
      setTeamMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, isActive: false }
          : member
      ));
    });

    socketConnection.on('disconnect', () => {
      console.log('Disconnected from server');
      if (teamMember) {
        setTeamMembers(prev => prev.map(member => 
          member.id === teamMember.id 
            ? { ...member, isActive: false }
            : member
        ));
      }
    });

    // Handle initial online members list
    socketConnection.on('online-members', (onlineMembers: number[]) => {
      setTeamMembers(prev => prev.map(member => ({
        ...member,
        isActive: onlineMembers.includes(member.id)
      })));
    });

    setSocket(socketConnection);
  };

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/chat', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Keep messages in chronological order (oldest first, newest last)
        setMessages(data);

        // Initialize message statuses
        const statusMap = new Map();
        data.forEach((msg: TeamChat) => {
          statusMap.set(msg.id, {
            messageId: msg.id,
            status: msg.senderId === teamMember?.id ? 'sent' : 'delivered',
            timestamp: msg.createdAt
          });
        });
        setMessageStatuses(statusMap);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch('/api/team/members', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  const scrollToBottom = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.scrollTop = dropZoneRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom when new messages arrive (WhatsApp behavior)
  useEffect(() => {
    if (dropZoneRef.current) {
      const isScrolledToBottom = dropZoneRef.current.scrollHeight - dropZoneRef.current.clientHeight <= dropZoneRef.current.scrollTop + 1;
      if (isScrolledToBottom || messages.length > 0) {
        scrollToBottom();
      }
    }
  }, [messages]);

  const handleTyping = useCallback(() => {
    if (socket && teamMember) {
      socket.emit('typing', { userName: teamMember.name, isTyping: true });

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', { userName: teamMember.name, isTyping: false });
      }, 1000);
    }
  }, [socket, teamMember]);

  const sendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;
    if (sending) return; // Prevent double sending

    setSending(true);

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const messageContent = newMessage.trim();
      const replyToId = replyTo?.id;

      // Clear input immediately to prevent double sending
      setNewMessage('');
      setReplyTo(null);

      if (selectedFile) {
        await uploadFileWithMessage();
        setSelectedFile(null);
      } else {
        const response = await fetch('/api/team/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: messageContent,
            replyTo: replyToId
          })
        });

        if (response.ok) {
          const sentMessage = await response.json();
          // Set message status but don't add to messages (socket will handle it)
          setMessageStatuses(prev => new Map(prev.set(sentMessage.id, {
            messageId: sentMessage.id,
            status: 'sent',
            timestamp: new Date().toISOString()
          })));
        } else {
          // If failed, restore the message
          setNewMessage(messageContent);
          if (replyToId) {
            const originalReply = messages.find(m => m.id === replyToId);
            if (originalReply) setReplyTo(originalReply);
          }
          throw new Error('Failed to send message');
        }
      }

      // Stop typing indicator
      if (socket && teamMember) {
        socket.emit('typing', { userName: teamMember.name, isTyping: false });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const uploadFileWithMessage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('message', newMessage || `Sent a file: ${selectedFile.name}`);
    if (replyTo?.id) {
      formData.append('replyTo', replyTo.id.toString());
    }

    const token = localStorage.getItem('thorx_team_auth_token');

    try {
      const response = await fetch('/api/team/chat/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadProgress(0);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/chat/search?q=${encodeURIComponent(searchTerm)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error searching messages:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Prevent multiple rapid sends
      if (!sending && (newMessage.trim() || selectedFile)) {
        sendMessage();
      }
    } else {
      handleTyping();
    }
  };

  

  const downloadFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return '#EF4B4C';
      case 'marketing': return '#3D619B';
      case 'social_media': return '#EF4B4C';
      case 'admin': return '#3D619B';
      default: return '#43506C';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getMessageStatus = (messageId: number) => {
    return messageStatuses.get(messageId);
  };

  const renderMessageStatus = (message: TeamChat) => {
    if (message.senderId !== teamMember?.id) return null;

    const status = getMessageStatus(message.id);

    switch (status?.status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400 animate-pulse" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Check className="w-3 h-3 text-gray-400" />;
    }
  };

  const startEdit = (message: TeamChat) => {
    setEditingMessage(message.id);
    setEditText(message.message);
    setShowDropdownMenu(false);
  };

  const saveEdit = async () => {
    if (!editText.trim() || !editingMessage) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/chat/${editingMessage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: editText })
      });

      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === editingMessage 
            ? { ...msg, message: editText, isEdited: true }
            : msg
        ));
      }
    } catch (error) {
      console.error('Error editing message:', error);
    } finally {
      setEditingMessage(null);
      setEditText('');
    }
  };

  const deleteMessage = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('thorx_team_auth_token');
      const response = await fetch(`/api/team/chat/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
    setShowDropdownMenu(false);
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
    <div className="flex min-h-screen" style={{background: 'linear-gradient(135deg, #43506C 0%, #2a3142 100%)'}}>
      <TeamSidebar />
      <CosmicParticles count={20} />

      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <CosmicEntrance type="stellar" delay={0.1}>
          <CosmicModule effect="glass" className="border-b border-[#3D619B]/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#EF4B4C] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#E9E9EB]">Orbital Linkage</h1>
                  <p className="text-sm text-[#E9E9EB]/60">Team Communication Hub</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value) {
                          handleSearch();
                        } else {
                          setSearchResults([]);
                        }
                      }}
                      className="bg-[#43506C]/40 border border-[#3D619B]/30 rounded-lg px-3 py-2 text-sm text-[#E9E9EB] placeholder-[#E9E9EB]/50 focus:outline-none focus:border-[#EF4B4C]/50 w-64"
                    />
                    <Search className="absolute right-3 top-2.5 w-4 h-4 text-[#E9E9EB]/50" />
                  </div>
                </div>

                

                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#E9E9EB]/60">{teamMembers.filter(m => m.isActive).length} online</span>
                </div>
              </div>
            </div>
          </CosmicModule>
        </CosmicEntrance>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="p-4 bg-[#43506C]/60 backdrop-blur-sm border-b border-[#3D619B]/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#E9E9EB]">Search Results ({searchResults.length})</h3>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                }}
                className="text-xs text-[#E9E9EB]/60 hover:text-[#E9E9EB] transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {searchResults.map((result) => (
                <div key={result.id} className="text-sm p-3 bg-[#43506C]/80 rounded-lg hover:bg-[#3D619B]/20 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[#EF4B4C] font-medium text-xs">{result.senderName}</span>
                    <span className="text-[#E9E9EB]/40 text-xs">•</span>
                    <span className="text-[#E9E9EB]/40 text-xs">{formatTime(result.createdAt)}</span>
                  </div>
                  <span className="text-[#E9E9EB]">{result.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div 
          ref={dropZoneRef}
          className={`flex-1 overflow-y-auto p-4 space-y-4 relative min-h-0 message-container custom-scrollbar ${dragOver ? 'bg-[#3D619B]/10 border-2 border-dashed border-[#3D619B]/50' : ''}`}
          style={{ maxHeight: 'calc(100vh - 280px)' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {dragOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#43506C]/80 backdrop-blur-sm z-10">
              <div className="text-center">
                <Upload className="w-12 h-12 text-[#3D619B] mx-auto mb-4" />
                <p className="text-lg font-medium text-[#E9E9EB]">Drop files here to share</p>
                <p className="text-sm text-[#E9E9EB]/60">Images, documents, and more</p>
              </div>
            </div>
          )}

          {replyTo && (
            <div className="bg-[#43506C]/40 border-l-4 border-[#EF4B4C] p-3 rounded-r-lg flex items-center justify-between">
              <div>
                <p className="text-xs text-[#E9E9EB]/60">Replying to {replyTo.senderName}</p>
                <p className="text-sm text-[#E9E9EB]">{replyTo.message}</p>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="text-[#E9E9EB]/60 hover:text-[#E9E9EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {messages.map((message) => (
            <CosmicEntrance key={message.id} type="stellar" delay={0.1}>
              <div className={`flex ${message.senderId === teamMember?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${message.senderId === teamMember?.id ? 'order-2' : 'order-1'}`}>
                  {message.senderId !== teamMember?.id && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: getRoleColor(message.senderRole || '') }}
                      >
                        {message.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </div>
                      <span className="text-xs text-[#E9E9EB]/60">{message.senderName}</span>
                    </div>
                  )}

                  <div className={`relative group ${message.senderId === teamMember?.id ? 'ml-12' : 'mr-12'}`}>
                    <div
                      className={`p-3 rounded-lg relative ${
                        message.senderId === teamMember?.id
                          ? 'bg-[#EF4B4C] text-white'
                          : 'bg-[#43506C]/60 text-[#E9E9EB]'
                      }`}
                    >
                      {message.replyTo && (
                        <div className="mb-2 p-2 bg-black/20 rounded text-xs border-l-2 border-white/30">
                          <div className="text-white/70">Replying to message</div>
                        </div>
                      )}

                      {editingMessage === message.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded p-2 text-sm resize-none"
                            rows={2}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEdit}
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingMessage(null)}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {message.fileUrl ? (
                            <div className="space-y-2">
                              {message.fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <div className="relative">
                                  <img 
                                    src={message.fileUrl} 
                                    alt={message.fileName}
                                    className="max-w-full h-auto rounded cursor-pointer"
                                    onClick={() => window.open(message.fileUrl, '_blank')}
                                  />
                                  <button
                                    onClick={() => downloadFile(message.fileUrl!, message.fileName!)}
                                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                  >
                                    <Download className="w-4 h-4 text-white" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-3 p-3 bg-black/20 rounded">
                                  <FileText className="w-8 h-8 text-blue-400" />
                                  <div className="flex-1">
                                    <p className="font-medium">{message.fileName}</p>
                                    <p className="text-xs opacity-70">
                                      {message.fileSize && (message.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => downloadFile(message.fileUrl!, message.fileName!)}
                                    className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                  >
                                    <Download className="w-4 h-4 text-white" />
                                  </button>
                                </div>
                              )}
                              {message.message !== `Sent a file: ${message.fileName}` && (
                                <p className="text-sm">{message.message}</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          )}

                          {message.isEdited && (
                            <p className="text-xs opacity-60 mt-1">(edited)</p>
                          )}
                        </>
                      )}

                      {/* Message options for own messages */}
                      {message.senderId === teamMember?.id && editingMessage !== message.id && (
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => startEdit(message)}
                              className="w-6 h-6 bg-[#43506C] rounded-full flex items-center justify-center hover:bg-[#3D619B] transition-colors"
                            >
                              <Edit2 className="w-3 h-3 text-white" />
                            </button>
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Reply button for others' messages */}
                      {message.senderId !== teamMember?.id && (
                        <button
                          onClick={() => setReplyTo(message)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-[#3D619B] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#EF4B4C]"
                        >
                          <Reply className="w-3 h-3 text-white" />
                        </button>
                      )}
                    </div>

                    <div className={`flex items-center mt-1 space-x-2 ${message.senderId === teamMember?.id ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-[#E9E9EB]/50">{formatTime(message.createdAt)}</span>
                      {renderMessageStatus(message)}
                    </div>
                  </div>
                </div>
              </div>
            </CosmicEntrance>
          ))}

          {/* Typing indicators */}
          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-[#43506C]/60 text-[#E9E9EB] p-3 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#E9E9EB] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#E9E9EB] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-[#E9E9EB] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs">
                    {typingUsers.map(user => user.userName).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <CosmicModule effect="glass" className="border-t border-[#3D619B]/30 p-4 chat-input-container">
          {selectedFile && (
            <div className="mb-3 p-3 bg-[#43506C]/40 rounded-lg border border-[#3D619B]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedFile.type.startsWith('image/') ? (
                    <Image className="w-8 h-8 text-[#3D619B]" />
                  ) : (
                    <FileText className="w-8 h-8 text-[#3D619B]" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#E9E9EB]">{selectedFile.name}</p>
                    <p className="text-xs text-[#E9E9EB]/60">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              {uploadProgress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-[#43506C]/60 rounded-full h-2">
                    <div 
                      className="bg-[#3D619B] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={messageInputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your cosmic message..."
                className="w-full bg-[#43506C]/40 border border-[#3D619B]/30 rounded-lg px-4 py-3 text-[#E9E9EB] placeholder-[#E9E9EB]/50 focus:outline-none focus:border-[#EF4B4C]/50 resize-none min-h-[48px] max-h-32 pr-12"
                rows={1}
              />

              <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                {/* File Attachment */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#3D619B]/20 rounded transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-[#E9E9EB]/60" />
                </button>
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={sending || (!newMessage.trim() && !selectedFile)}
              className="w-12 h-12 bg-[#EF4B4C] rounded-full flex items-center justify-center hover:bg-[#EF4B4C]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </CosmicModule>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,application/pdf,.doc,.docx,.txt"
        />
      </div>
    </div>
  );
};

export default LinkagePage;