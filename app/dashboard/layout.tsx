"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiUser, FiHome, FiFileText, FiSettings, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/app/contexts/AuthContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  // Update active tab based on current path
  useEffect(() => {
    const path = pathname.split('/').pop() || 'overview';
    setActiveTab(path);
  }, [pathname]);

  const handleLogout = () => {
    logout();
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: FiHome, href: '/dashboard/user' },
    { id: 'requests', label: 'Requests', icon: FiFileText, href: '/dashboard/user/requests' },
    // { id: 'profile', label: 'Profile', icon: FiUser, href: '/dashboard/user/profile' },
    // { id: 'settings', label: 'Settings', icon: FiSettings, href: '/dashboard/user/settings' },
  ];

  const getPageTitle = () => {
    const item = sidebarItems.find(item => item.id === activeTab);
    return item?.label || 'Dashboard';
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'overview':
        return `Welcome back, ${user?.name}`;
      case 'requests':
        return 'Manage your requests and applications';
      case 'profile':
        return 'View and edit your profile information';
      case 'settings':
        return 'Configure your account settings';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <div className="h-screen bg-slate-50 flex overflow-hidden relative">
      {/* Overlay for mobile - must be before sidebar for proper z-index */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:relative z-40 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out
          ${sidebarExpanded ? 'w-64' : 'w-16'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8EC0C2] to-[#142954] rounded-lg flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              {sidebarExpanded && (
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
                  <p className="text-xs text-slate-500">Welcome back</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarExpanded && (
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 space-y-3">
            {/* User Info */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              {sidebarExpanded && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarExpanded && (
                <span className="ml-3 text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10 bg-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {getPageTitle()}
                </h1>
                <p className="text-slate-600">
                  {getPageDescription()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
      </div>
    </ProtectedRoute>
  );
}
