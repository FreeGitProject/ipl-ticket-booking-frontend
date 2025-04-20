import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import EventList from './pages/EventList';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetail from './pages/EventDetail';
//import NotFound from './pages/NotFound';
//import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetail />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}