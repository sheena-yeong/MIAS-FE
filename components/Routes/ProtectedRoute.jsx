import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )

  }
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace /> // replace is to replace the current entry in the browser’s history stack instead of adding a new one. This ensures when user press back they dont access the protected route
  }

  return children;
};

export default ProtectedRoute;
