import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">IPL Tickets</div>
        <div className="flex space-x-4">
         
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-blue-800">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-white text-blue-700 font-medium">
                Register
              </Link>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Book Your IPL 2024 Tickets</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the thrill of live cricket matches with the best seats in the stadium
        </p>
        <Link 
          to="/events" 
          className="inline-block px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Browse Matches
        </Link>
      </section>

      {/* Featured Matches */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* These would be fetched from API in real implementation */}
          <MatchCard 
            teams="MI vs CSK" 
            date="May 1, 2024" 
            venue="Wankhede Stadium" 
          />
          <MatchCard 
            teams="RCB vs KKR" 
            date="May 5, 2024" 
            venue="M. Chinnaswamy Stadium" 
          />
          <MatchCard 
            teams="DC vs SRH" 
            date="May 10, 2024" 
            venue="Arun Jaitley Stadium" 
          />
        </div>
      </section>
    </div>
  );
};

const MatchCard = ({ teams, date, venue }: { teams: string; date: string; venue: string }) => {
  return (
    <div className="bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{teams}</h3>
        <p className="text-gray-600 mb-1">{date}</p>
        <p className="text-gray-600 mb-4">{venue}</p>
        <Link 
          to="/events" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;