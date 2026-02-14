import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div 
        className={`lg:ml-64 transition-all duration-300 ${
          sidebarOpen 
            ? 'blur-sm opacity-75 lg:blur-none lg:opacity-100' 
            : ''
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-600 hover:text-gray-900 p-2 -ml-2"
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Loan Management System</h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Admin Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline-block truncate max-w-[120px] md:max-w-none">
                  {localStorage.getItem('adminEmail')}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
