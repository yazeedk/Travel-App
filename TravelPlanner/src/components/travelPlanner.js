import React, { useState } from 'react';
import './travelPlanner.css';

const TravelPlanner = () => {
  const [trips, setTrips] = useState([
    { id: 1, location: 'Paris, France', date: '02/12/2020', flights: ['Flight 22', 'Flight 44'] }
  ]);
  const [newTrip, setNewTrip] = useState({ location: '', date: '', flights: [] });

  const handleAddTrip = () => {
    if (newTrip.location && newTrip.date) {
      setTrips([...trips, { ...newTrip, id: Date.now() }]);
      setNewTrip({ location: '', date: '', flights: [] });
    }
  };

  const handleRemoveTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  return (
    <div className="travel-planner-container">
      <h1>Travel Planner</h1>
      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <h2>My trip to: {trip.location}</h2>
            <p>Departing: {trip.date}</p>
            <h3>Flight info:</h3>
            {trip.flights.map((flight, index) => (
              <p key={index}>{flight}</p>
            ))}
            <button onClick={() => handleRemoveTrip(trip.id)}>remove trip</button>
            <div className="trip-actions">
              <button>+ add lodging info</button>
              <button>+ add packing list</button>
              <button>+ add notes</button>
            </div>
          </div>
        ))}
      </div>

      <div className="new-trip-container">
        <h2>My trip to: <input type="text" value={newTrip.location} onChange={e => setNewTrip({ ...newTrip, location: e.target.value })} placeholder="Enter Location" /></h2>
        <p>Departing: <input type="date" value={newTrip.date} onChange={e => setNewTrip({ ...newTrip, date: e.target.value })} /></p>
        <h3>Flight Info:</h3>
        <input type="text" placeholder="Flight 1" onChange={e => handleFlightChange(0, e.target.value)} />
        <button onClick={handleAddTrip}>save trip</button>
      </div>
    </div>
  );
};

export default TravelPlanner;
