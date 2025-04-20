import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1>EventBooking</h1>
        </Link>
        <nav>
          <ul className="list-unstyled d-flex gap-3 mb-0">
            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
            <li><Link to="/events" className="text-white text-decoration-none">Events</Link></li>
            {user ? (
              <>
                <li><span className="text-white">Welcome, {user.username}</span></li>
                <li>
                  <button onClick={logout} className="btn btn-outline-light">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                <li><Link to="/register" className="text-white text-decoration-none">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}