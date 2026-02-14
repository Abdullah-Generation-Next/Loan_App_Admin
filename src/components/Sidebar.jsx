import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-900 min-h-screen fixed left-0 top-0 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-white text-xl font-bold">Loan Admin</h1>
          <p className="text-indigo-300 text-xs mt-1">Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/loan-details"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">Loan Details</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">All Users</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-800">
          <div className="text-indigo-300 text-xs">
            <p>© 2024 Loan Admin</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
