/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/axiosClient';
import { Event } from '../../types/events';
import { toast } from 'react-hot-toast';
//import SeatSelection from '../../components/booking/SeatSelection';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading event details...</div>;
  if (!event) return <div className="text-center py-12">Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Event Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          <p className="text-xl mb-4">
            {new Date(event.dateTime).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="text-lg">{event.stadium.name}, {event.stadium.location}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Event Details
            </button>
            <button
              onClick={() => setActiveTab('seats')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'seats' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Book Seats
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'details' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Match Details</h2>
              <p className="mb-6">{event.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Venue Information</h3>
                  <p className="mb-1"><strong>Stadium:</strong> {event.stadium.name}</p>
                  <p className="mb-1"><strong>Location:</strong> {event.stadium.location}</p>
                  <p className="mb-1"><strong>Capacity:</strong> {event.stadium.capacity.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Pricing</h3>
                  <p className="mb-1"><strong>Starting Price:</strong> ₹{event.basePrice}</p>
                  <p className="mb-1"><strong>Duration:</strong> ~{event.duration} minutes</p>
                  <p className="mb-1"><strong>Status:</strong> <span className="capitalize">{event.status}</span></p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('seats')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Book Tickets Now
              </button>
            </div>
          ) : (
            // <SeatSelection eventId={event.id} />
            <div>sd</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;