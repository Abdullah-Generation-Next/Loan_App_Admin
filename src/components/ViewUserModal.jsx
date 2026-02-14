import Modal from './Modal';

function ViewUserModal({ isOpen, onClose, user }) {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="md">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-3xl font-bold">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-1">User ID</p>
              <p className="text-2xl font-bold">
                #{user._id ? user._id.slice(-8).toUpperCase() : user.id || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-base font-semibold text-gray-900">
                {user.fullName || 'N/A'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-base font-semibold text-gray-900 break-all">
                {user.email || 'N/A'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
              <p className="text-base font-semibold text-gray-900">
                {user.mobileNumber || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account Information
          </h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Registered Date</p>
            <p className="text-base font-semibold text-gray-900">
              {formatDate(user.createdAt || user.registeredAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewUserModal;
