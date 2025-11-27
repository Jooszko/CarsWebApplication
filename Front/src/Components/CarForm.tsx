import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Car, FuelType, BodyType } from '../Models/Car';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../Styles/CarForm.css'


export default function CarForm(){
  const { id } = useParams<{ id: string }>(); 
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (car) {
      const { name, value } = e.target;
      setCar({
        ...car,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (car && id) {
      try {
        await axios.put(`https://localhost:7050/api/Cars/${id}`, car);
        
        navigate('/cars'); 
      } catch (error) {
        console.log(error)
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <div className='formBox'>
      <form onSubmit={handleSubmit}>
        <div className='formItem'>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Doors Number:</label>
          <input
            type="number"
            name="doorsNumber"
            value={car.doorsNumber}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Luggage Capacity (liters):</label>
          <input
            type="number"
            name="luggageCapacity"
            value={car.luggageCapacity}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Engine Capacity (cc):</label>
          <input
            type="number"
            name="engineCapacity"
            value={car.engineCapacity}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Fuel Type:</label>
          <select
            name="fuelType"
            value={car.fuelType}
            onChange={handleChange}
          >
            {Object.values(FuelType).map(fuel => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        <div className='formItem'>
          <label>Production Date:</label>
          <input
            type="date"
            name="productionDate"
            value={car.productionDate.slice(0, 10)} // Skracamy ISO string do formatu yyyy-MM-dd
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Fuel Consumption (L/100km):</label>
          <input
            type="number"
            name="carFuelConsumption"
            value={car.carFuelConsumption}
            onChange={handleChange}
          />
        </div>

        <div className='formItem'>
          <label>Body Type:</label>
          <select
            name="bodyType"
            value={car.bodyType}
            onChange={handleChange}
          >
            {Object.values(BodyType).map(body => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className='saveButton'>Save</button> 
        <Button as={NavLink} to={`/cars`} className='backButton'>Powrót</Button>
      </form>
    </div>
  ) : (
    <div>No car data available</div>
  );
  
};

// export default CarForm;
