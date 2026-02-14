import Modal from './Modal';

function ViewLoanModal({ isOpen, onClose, loan }) {
  if (!loan) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatText = (text) => {
    if (!text) return 'N/A';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toUpperCase();
    const statusColors = {
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
    };
    const displayStatus = status
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : 'Pending';
    
    return (
      <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${statusColors[normalizedStatus] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {displayStatus}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Loan Details" size="lg">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Loan ID</p>
              <p className="text-2xl font-bold">
                #{loan._id ? loan._id.slice(-8).toUpperCase() : loan.id || 'N/A'}
              </p>
            </div>
            {getStatusBadge(loan.status || 'PENDING')}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-base font-semibold text-gray-900">
                {loan.fullName || loan.user?.fullName || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-base font-semibold text-gray-900 break-all">
                {loan.email || loan.user?.email || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
              <p className="text-base font-semibold text-gray-900">
                {loan.mobileNumber || loan.user?.mobileNumber || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Loan Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loan Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Loan Amount</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatCurrency(loan.loanAmount || 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {loan.loanDurationMonths || 'N/A'} <span className="text-base font-normal text-gray-500">months</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Loan Purpose</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatText(loan.loanPurpose)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Employment Type</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatText(loan.employmentType)}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Financial Information
          </h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Monthly Income</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(loan.monthlyIncome || 0)}
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

export default ViewLoanModal;
