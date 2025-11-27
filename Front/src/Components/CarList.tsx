import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../Models/Car';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../Styles/CarList.css';

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation(); 

  useEffect(() => {
    setLoading(true); 
    
    const axiosConfig = {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    };

    axios.get<Car[]>('https://localhost:7050/api/Cars', axiosConfig)
        .then((response) => {
            setCars(response.data);
        })
        .catch(() => {
            setError('Error fetching cars');
        })
        .finally(() => {
            setLoading(false);
        });
        
  }, [location.key]); 

  const handleDelete = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to auto?")) {
        return;
    }

    try {
        await axios.delete(`https://localhost:7050/api/Cars/${id}`);

        setCars(prevCars => prevCars.filter(car => car.id !== id));
        
    } catch (err) {
        console.error(err);
        alert("Nie udało się usunąć auta.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
      <h1>Twoje auta</h1>
      <Button as={NavLink} to={`/add`} className='addCarButton'>Dodaj nowe auto</Button>
      <ul>
        {cars.map(car => (
          <li key={car.id} className='carBoxEl'>
            <h2>{car.brand} {car.model} </h2>
            <Button as={NavLink} to={`/cars/${car.id}`} className='detailsButton'>Szczegóły</Button>
            <Button as={NavLink} to={`/edit/${car.id}`} className='editCarButton'>Edytuj</Button>
            <Button onClick={() => handleDelete(car.id)} className='deleteCarButton'>Usuń</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}