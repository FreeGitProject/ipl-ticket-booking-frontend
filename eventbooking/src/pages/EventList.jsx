import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import eventService from '../api/eventService';
import categoryService from '../api/categoryService';
import { format, parseISO } from 'date-fns';

export default function EventList() {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryId = searchParams.get('category');
        setSelectedCategory(categoryId);

        const [eventsData, categoriesData] = await Promise.all([
          categoryId ? eventService.getEventsByCategory(categoryId) : eventService.getAllEvents(),
          categoryService.getAllCategories()
        ]);

        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Categories</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <Link 
                    to="/events" 
                    className={`d-block p-2 ${!selectedCategory ? 'bg-light' : ''}`}
                  >
                    All Events
                  </Link>
                </li>
                {categories.map(category => (
                  <li key={category.id}>
                    <Link 
                      to={`/events?category=${category.id}`}
                      className={`d-block p-2 ${selectedCategory === category.id ? 'bg-light' : ''}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">
            {selectedCategory 
              ? `Events in ${categories.find(c => c.id === selectedCategory)?.name || ''}` 
              : 'All Events'}
          </h2>
          <div className="row">
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{event.name}</h5>
                      <p className="card-text">
                        <small className="text-muted">
                          {format(parseISO(event.dateTime), 'MMMM dd, yyyy h:mm a')}
                        </small>
                      </p>
                      <p className="card-text">{event.description}</p>
                      <p className="card-text">
                        <strong>Price: </strong>${event.basePrice}
                      </p>
                      <Link 
                        to={`/events/${event.id}`} 
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No events found for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}