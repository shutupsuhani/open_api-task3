import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
          params: {
            json: 1,
            action: 'process',
            page_size: 100
          }
        });
        setFoods(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-mono text-blue-400 mb-8">Food Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foods.map(food => (
            <li key={food.code} className="bg-white rounded-lg shadow-md overflow-hidden">
              {food.image_url && <img src={food.image_url} alt={food.product_name} className="w-32 h-64 rounded-md items-center m-auto " />}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{food.product_name}</h2>
                <p className="text-gray-700 mb-2">Category: {food.categories}</p>
                <p className="text-gray-700 mb-4">Brand: {food.brands}</p>
                <a href={food.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">See Details</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodList;
