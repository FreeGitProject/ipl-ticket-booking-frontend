import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './utils/auth/context';
//import { ProtectedRoute } from './utils/auth/ProtectedRoute';
//import { ToastContainer } from 'react-hot-toast';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import EventListPage from './pages/events/EventList';
import EventDetailPage from './pages/events/EventDetail';

function App() {
  return (
    <BrowserRouter>
     
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<UserBookings />} />
          </Route> */}

          {/* Admin Routes */}
          {/* <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route> */}
        </Routes>
        {/* <ToastContainer position="bottom-right" /> */}
     
    </BrowserRouter>
  );
}

export default App;