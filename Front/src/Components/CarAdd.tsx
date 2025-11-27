import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Car } from '../Models/Car'; 
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import '../Styles/CarAdd.css'

export default function CarAdd() {
  const navigate = useNavigate();

  const [car, setCar] = useState<any>({
      id: '00000000-0000-0000-0000-000000000000',
      brand: '',
      model: '',
      doorsNumber: 5,
      luggageCapacity: 0,
      engineCapacity: 0,
      fuelType: '', 
      productionDate: new Date().toISOString().slice(0, 10),
      carFuelConsumption: 0,
      bodyType: '' 
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number = value;
    const numberFields = ['fuelType', 'bodyType', 'doorsNumber', 'luggageCapacity', 'engineCapacity', 'carFuelConsumption'];

    if (value === '') {
        parsedValue = '';
    } else if (type === 'number' || numberFields.includes(name)) {
        parsedValue = Number(value);
    }

    setCar({ ...car, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (car.fuelType === '' || car.bodyType === '') {
        setError("Proszę wybrać Typ Paliwa oraz Typ Nadwozia!");
        return; 
    }

    if (Number(car.doorsNumber) <= 0 || 
        Number(car.luggageCapacity) <= 0 || 
        Number(car.engineCapacity) <= 0 || 
        Number(car.carFuelConsumption) <= 0) {
        
        setError("Błąd: Ilość drzwi, pojemność bagażnika/silnika oraz spalanie muszą być większe od zera!");
        return; 
    }


    const carPayload = {
        brand: car.brand,
        model: car.model,
        productionDate: new Date(car.productionDate).toISOString(),
        
        doorsNumber: parseInt(car.doorsNumber),
        luggageCapacity: parseInt(car.luggageCapacity),
        engineCapacity: parseInt(car.engineCapacity),
        carFuelConsumption: parseFloat(car.carFuelConsumption),

        fuelType: parseInt(car.fuelType), 
        bodyType: parseInt(car.bodyType)
    };

    console.log("Wysyłany JSON:", JSON.stringify(carPayload, null, 2));

    try {
        await axios.post(`https://localhost:7050/api/Cars`, carPayload);
        navigate('/cars'); 
    } catch (error: any) {
        console.error("Błąd backendu:", error);
        if (error.response?.data?.errors) {
            setError(JSON.stringify(error.response.data.errors));
        } else {
            setError(JSON.stringify(error.response?.data) || "Wystąpił błąd.");
        }
    }
  };

  return (
    <div className='formBox'>
      <form onSubmit={handleSubmit}>
        
        {error && <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '15px', backgroundColor: '#fff0f0' }}>
            {error}
        </div>}

        <h2>Dodaj nowe auto</h2>

        <div className='formItem'>
          <label>Brand:</label>
          <input type="text" name="brand" value={car.brand} onChange={handleChange} required />
        </div>

        <div className='formItem'>
          <label>Model:</label>
          <input type="text" name="model" value={car.model} onChange={handleChange} required />
        </div>

        <div className='formItem'>
          <label>Doors Number:</label>
          <input type="number" min="1" name="doorsNumber" value={car.doorsNumber} onChange={handleChange} />
        </div>

        <div className='formItem'>
          <label>Luggage Capacity (liters):</label>
          <input type="number" min="1" name="luggageCapacity" value={car.luggageCapacity} onChange={handleChange} />
        </div>

        <div className='formItem'>
          <label>Engine Capacity (cc):</label>
          <input type="number" min="1" name="engineCapacity" value={car.engineCapacity} onChange={handleChange} />
        </div>

        <div className='formItem'>
          <label>Fuel Type:</label>
          <select name="fuelType" value={car.fuelType} onChange={handleChange} required>
            <option value="" disabled>-- Wybierz paliwo --</option>
            <option value="0">Petrol</option>
            <option value="1">Hybrid</option>
            <option value="2">Diesel</option>
            <option value="3">LPG</option>
          </select>
        </div>

        <div className='formItem'>
          <label>Production Date:</label>
          <input type="date" name="productionDate" value={car.productionDate} onChange={handleChange} />
        </div>

        <div className='formItem'>
          <label>Fuel Consumption (L/100km):</label>
          <input type="number" min="0.1" step="0.1" name="carFuelConsumption" value={car.carFuelConsumption} onChange={handleChange} />
        </div>

        <div className='formItem'>
          <label>Body Type:</label>
          <select name="bodyType" value={car.bodyType} onChange={handleChange} required>
             <option value="" disabled>-- Wybierz nadwozie --</option>
             <option value="0">Hatchback</option>
             <option value="1">Sedan</option>
             <option value="2">Kombi</option>
             <option value="3">SUV</option>
             <option value="4">Roadster</option>
          </select>
        </div>

        <button type="submit" className='saveButton'>Dodaj</button> 
        <Button as={NavLink} to={`/cars`} className='backButton'>Powrót</Button>
      </form>
    </div>
  );
};