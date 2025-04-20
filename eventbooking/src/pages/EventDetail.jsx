import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import eventService from '../api/eventService';
import categoryService from '../api/categoryService';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const eventData = await eventService.getEventById(id);
        setEvent(eventData);
        
        if (eventData.categoryId) {
          const categoryData = await categoryService.getAllCategories();
          const foundCategory = categoryData.find(c => c.id === eventData.categoryId);
          setCategory(foundCategory);
        }
      } catch (err) {
        setError('Failed to load event details');
        toast.error('Failed to load event details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      toast.info('Please login to book tickets');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    // Here you would typically navigate to a booking page
    toast.success('Redirecting to booking page');
    // navigate(`/events/${id}/book`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="container my-5 text-danger">{error}</div>;
  if (!event) return <div className="container my-5">Event not found</div>;

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/events">Events</Link>
          </li>
          {category && (
            <li className="breadcrumb-item">
              <Link to={`/events?category=${category.id}`}>{category.name}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {event.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h1 className="card-title">{event.name}</h1>
              
              <div className="mb-4">
                <h5>Event Details</h5>
                <p className="card-text">{event.description}</p>
              </div>

              <div className="mb-4">
                <h5>Date & Time</h5>
                <p>
                  <strong>Date: </strong>
                  {format(parseISO(event.dateTime), 'EEEE, MMMM do, yyyy')}
                </p>
                <p>
                  <strong>Time: </strong>
                  {format(parseISO(event.dateTime), 'h:mm a')}
                </p>
                <p>
                  <strong>Duration: </strong>
                  {Math.floor(event.duration / 60)} hours {event.duration % 60} minutes
                </p>
              </div>

              {category && (
                <div className="mb-4">
                  <h5>Category</h5>
                  <Link to={`/events?category=${category.id}`} className="badge bg-primary text-decoration-none">
                    {category.name}
                  </Link>
                </div>
              )}

              <div className="mb-4">
                <h5>Status</h5>
                <span className={`badge ${
                  event.status === 'upcoming' ? 'bg-warning text-dark' : 
                  event.status === 'ongoing' ? 'bg-success' : 'bg-secondary'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Ticket Information</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Base Price:</span>
                <strong>₹{event.basePrice.toLocaleString()}</strong>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="btn btn-primary w-100"
                disabled={event.status !== 'upcoming'}
              >
                {event.status === 'upcoming' ? 'Book Now' : 'Booking Closed'}
              </button>

              {event.status !== 'upcoming' && (
                <p className="text-muted mt-2 mb-0 text-center">
                  {event.status === 'ongoing' ? 
                    'This event is currently ongoing' : 
                    'This event has already ended'}
                </p>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Share This Event</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-twitter"></i>
                </button>
                <button className="btn btn-outline-danger">
                  <i className="bi bi-instagram"></i>
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-link-45deg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}