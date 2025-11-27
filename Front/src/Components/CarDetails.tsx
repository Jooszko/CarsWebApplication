import { useEffect, useState } from "react";
import { Car, FuelTypeMap } from "../Models/Car";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../Styles/CarDetails.css'

export default function CarDetails(){
    // Pobranie id z parametrów URL
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchCarById = async () => {
      try {
        const response = await axios.get(`https://localhost:7050/api/Cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Error fetching cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCarById();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Wyświetlenie danych samochodu, jeśli są dostępne
  return (
    <div className="container">
      <h1>Szczegóły auta</h1>
      {car ? (
        <div className='carBox'>
          <p>Marka: {car.brand}</p>
          <p>Model: {car.model}</p>
          <p>Ilość drzwi: {car.doorsNumber}</p>
          <p>Wielkość bagażnika: {car.luggageCapacity} litrów</p>
          <p>Pojemność silnika: {car.engineCapacity} cc</p>
          <p>Typ paliwa: {FuelTypeMap[parseInt(car.fuelType)] || 'Unknown'}</p>
          <p>Data produkcji: {new Date(car.productionDate).toLocaleDateString()}</p>
          <p>Spalanie: {car.carFuelConsumption} L/100km</p>
          <p>Typ nadowzia: {FuelTypeMap[parseInt(car.bodyType)] || 'Unknown'}</p>
          
        </div>
      ) : (
        <p>No car details available</p>
      )}
      <Button as={NavLink} to={`/cars`} className='backButton'>Powrót</Button>
    </div>
  );
}