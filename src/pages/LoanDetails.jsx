import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { API_ENDPOINTS } from '../config/api';
import Layout from '../components/Layout';
import ViewLoanModal from '../components/ViewLoanModal';
import EditLoanModal from '../components/EditLoanModal';

function LoanDetails() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  // Fetch loans from API using axios
  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(API_ENDPOINTS.GET_LOANS);
      
      // Handle API response format: { message, count, loans: [...] }
      const responseData = response.data;
      const loansData = responseData.loans || responseData.data || responseData || [];
      
      setLoans(Array.isArray(loansData) ? loansData : []);
    } catch (err) {
      console.error('Error fetching loans:', err);
      
      // Handle axios error
      if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || `Error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // Request made but no response received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError(err.message || 'Failed to fetch loan data. Please try again later.');
      }
      
      setLoans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setViewModalOpen(true);
  };

  const handleEditLoan = (loan) => {
    setSelectedLoan(loan);
    setEditModalOpen(true);
  };

  const handleUpdateLoan = () => {
    fetchLoans();
  };


  const getStatusBadge = (status) => {
    // Normalize status to handle uppercase/lowercase
    const normalizedStatus = status?.toUpperCase();
    const statusColors = {
      APPROVED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    
    // Format status for display (capitalize first letter, rest lowercase)
    const displayStatus = status 
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : 'Pending';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[normalizedStatus] || 'bg-gray-100 text-gray-800'}`}>
        {displayStatus}
      </span>
    );
  };
  
  // Helper function to format text (capitalize first letter)
  const formatText = (text) => {
    if (!text) return 'N/A';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading loan data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="bg-red-100 p-3 rounded-full inline-block mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Loans</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{loans.length}</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
                  {loans.filter(l => l.status?.toUpperCase() === 'APPROVED').length}
                </p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-1">
                  {loans.filter(l => l.status?.toUpperCase() === 'PENDING').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Amount</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600 mt-1 break-words">
                  {formatCurrency(loans.reduce((sum, loan) => sum + loan.loanAmount, 0))}
                </p>
              </div>
              <div className="bg-indigo-100 p-2 sm:p-3 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Loan Applications</h2>
          </div>
          {/* Mobile Card View */}
          <div className="block md:hidden">
            {loans.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">No loan applications found</p>
                <p className="text-gray-400 text-sm mt-2">There are no loan applications to display at the moment.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {loans.map((loan) => (
                  <div key={loan._id || loan.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-gray-500">ID</p>
                        <p className="text-sm font-medium text-gray-900">
                          #{loan._id ? loan._id.slice(-6).toUpperCase() : loan.id || 'N/A'}
                        </p>
                      </div>
                      {getStatusBadge(loan.status || 'PENDING')}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{loan.fullName || loan.user?.fullName || 'N/A'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Mobile</p>
                        <p className="text-sm text-gray-900">{loan.mobileNumber || loan.user?.mobileNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-900 truncate">{loan.email || loan.user?.email || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Loan Amount</p>
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(loan.loanAmount || 0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm text-gray-900">{loan.loanDurationMonths || 'N/A'} months</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Purpose</p>
                      <p className="text-sm text-gray-900">{formatText(loan.loanPurpose)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Employment</p>
                        <p className="text-sm text-gray-900">{formatText(loan.employmentType)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Income</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(loan.monthlyIncome || 0)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => handleViewLoan(loan)}
                        className="flex-1 text-indigo-600 hover:text-indigo-900 text-sm font-medium py-2 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditLoan(loan)}
                        className="flex-1 text-gray-600 hover:text-gray-900 text-sm font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile Number
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration (Months)
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Purpose
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employment Type
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Income
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">No loan applications found</p>
                        <p className="text-gray-400 text-sm mt-2">There are no loan applications to display at the moment.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  loans.map((loan) => (
                    <tr key={loan._id || loan.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{loan._id ? loan._id.slice(-6).toUpperCase() : loan.id || 'N/A'}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {loan.fullName || loan.user?.fullName || 'N/A'}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.mobileNumber || loan.user?.mobileNumber || 'N/A'}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="truncate block max-w-[150px]">{loan.email || loan.user?.email || 'N/A'}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(loan.loanAmount || 0)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.loanDurationMonths || 'N/A'}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatText(loan.loanPurpose)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatText(loan.employmentType)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(loan.monthlyIncome || 0)}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(loan.status || 'PENDING')}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewLoan(loan)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleEditLoan(loan)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewLoanModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedLoan(null);
        }}
        loan={selectedLoan}
      />
      <EditLoanModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedLoan(null);
        }}
        loan={selectedLoan}
        onUpdate={handleUpdateLoan}
      />
    </Layout>
  );
}

export default LoanDetails;
