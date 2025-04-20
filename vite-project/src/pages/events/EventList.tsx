/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/axiosClient';
import { Event } from '../../types/events';
import { toast } from 'react-hot-toast';

const EventListPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get(`/events?status=${filter}`);
        setEvents(response.data);
      } catch (error) {
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [filter]);

  if (loading) return <div className="text-center py-12">Loading events...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">IPL 2024 Matches</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('ongoing')}
            className={`px-4 py-2 rounded ${filter === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Live
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/events/${event.id}`} className="hover:text-blue-600">
            {event.name}
          </Link>
        </h2>
        <p className="text-gray-600 mb-2">
          {new Date(event.dateTime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p className="text-gray-700 mb-4">{event.stadium.name}, {event.stadium.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">From ₹{event.basePrice}</span>
          <Link
            to={`/events/${event.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventListPage;