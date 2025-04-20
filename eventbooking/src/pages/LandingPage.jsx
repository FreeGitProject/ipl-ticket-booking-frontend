import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import categoryService from '../api/categoryService';

export default function LandingPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Browse Events by Category</h2>
      <div className="row">
        {categories.map(category => (
          <div key={category.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                <Link 
                  to={`/events?category=${category.id}`} 
                  className="btn btn-primary"
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}