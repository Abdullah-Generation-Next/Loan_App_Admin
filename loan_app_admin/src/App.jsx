import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import LoanDetails from './pages/LoanDetails';
import AllUsers from './pages/AllUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
