import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth/context';

const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            IPL Tickets
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/events" className="text-gray-800 hover:text-blue-600">
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="text-gray-800 hover:text-blue-600">
                  My Bookings
                </Link>
                {user?.roles.includes('admin') && (
                  <Link to="/admin" className="text-gray-800 hover:text-blue-600">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-gray-800 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-600">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;