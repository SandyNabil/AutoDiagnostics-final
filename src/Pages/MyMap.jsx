import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MyMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceAddresses, setServiceAddresses] = useState({});

  const staticServices = useMemo(() => [
    { id: 1, name: 'Service Center 1 - Cairo', lat: 30.0444, lon: 31.2357, city: 'Cairo' },
    { id: 2, name: 'Service Center 2 - Cairo', lat: 30.0500, lon: 31.2400, city: 'Cairo' },
    { id: 3, name: 'Service Center 3 - Cairo', lat: 30.0333, lon: 31.2200, city: 'Cairo' },
    { id: 4, name: 'Service Center 1 - Alexandria', lat: 31.2156, lon: 29.9553, city: 'Alexandria' },
    { id: 5, name: 'Service Center 2 - Alexandria', lat: 31.2200, lon: 29.9500, city: 'Alexandria' },
    { id: 6, name: 'Service Center 3 - Alexandria', lat: 31.2100, lon: 29.9600, city: 'Alexandria' },
    { id: 7, name: 'Car Service Center TOTAL gas station - Suez', lat: 30.002819484344275, lon: 32.507136422764226, city: 'Suez' },
    { id: 8, name: 'Smart auto service - Suez', lat: 29.993367141480967, lon: 32.5405230693115, city: 'Suez' },
    { id: 9, name: 'elmohandes car service - Suez', lat: 29.981350155398225, lon: 32.48557042381373, city: 'Suez' },
    { id: 10, name: 'Service Center 1 - Hurghada', lat: 27.2579, lon: 33.8129, city: 'Hurghada' },
    { id: 11, name: 'Service Center 2 - Hurghada', lat: 27.2600, lon: 33.8200, city: 'Hurghada' },
    { id: 12, name: 'Service Center 3 - Hurghada', lat: 27.2550, lon: 33.8050, city: 'Hurghada' },
    { id: 13, name: 'Ismailia auto service - Ismailia', lat: 30.61016497064724, lon: 32.28536781534937, city: 'Ismailia' },
    { id: 14, name: 'Engineering Center For German Car Repair - Ismailia', lat: 30.62058008650051,  lon: 32.25614676804991, city: 'Ismailia' },
    { id: 15, name: 'Alkady Auto Service Mg - Ismailia', lat: 30.57359221715841,  lon: 32.23932395310399, city: 'Ismailia' },
    { id: 16, name: 'Service Center 1 - Port Said', lat: 31.2565, lon: 32.2903, city: 'Port Said' },
    { id: 17, name: 'Service Center 2 - Port Said', lat: 31.2600, lon: 32.3000, city: 'Port Said' },
    { id: 18, name: 'Service Center 3 - Port Said', lat: 31.2500, lon: 32.2800, city: 'Port Said' },
    { id: 19, name: 'المركز الهندسي لصيانة السيارات Motor - Suez', lat: 29.979114696406928, lon: 32.52256393862812, city: 'Suez' },
  ], []);

  const fetchServices = async (lat, lon) => {
    setServices(staticServices);
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            fetchServices(latitude, longitude);
          },
          error => {
            console.log('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  const convertLatLonToAddress = async (lat, lon) => {
    const apiKey = ''; // Replace with your OpenCage API key efb0fcb618514090a5b925a329f9b7bf
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${lat}+${lon}&pretty=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].formatted;
      } else {
        return `${lat}, ${lon}`;
      }
    } catch (error) {
      console.error('Error converting coordinates to address:', error);
      return `${lat}, ${lon}`;
    }
  };

  useEffect(() => {
    const fetchServiceAddresses = async () => {
      const addresses = {};
      for (const service of staticServices) {
        const address = await convertLatLonToAddress(service.lat, service.lon);
        addresses[`${service.lat},${service.lon}`] = address;
      }
      setServiceAddresses(addresses);
    };

    fetchServiceAddresses();
  }, [staticServices]);

  const getCity = (latitude, longitude) => {
    const cities = [
      { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
      { name: 'Alexandria', lat: 31.2156, lon: 29.9553 },
      { name: 'Suez', lat: 29.9668, lon: 32.5498 },
      { name: 'Hurghada', lat: 27.2579, lon: 33.8129 },
      { name: 'Ismailia', lat: 30.5900, lon: 32.2653 },
      { name: 'Port Said', lat: 31.2565, lon: 32.2903 },
    ];
    for (let city of cities) {
      const distance = Math.sqrt(
        Math.pow(latitude - city.lat, 2) + Math.pow(longitude - city.lon, 2)
      );
      if (distance < 0.1) {
        return city.name;
      }
    }
    return null;
  };

  const handleRowClick = (service) => {
    setSelectedService(service);
  };

  const handleShowDirections = (service) => {
    if (userLocation) {
      const [userLat, userLon] = userLocation;
      const destinationLat = service.lat;
      const destinationLon = service.lon;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${destinationLat},${destinationLon}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    } else {
      alert('User location not available.');
    }
  };

  const calculateSteps = () => {
    if (userLocation && selectedService) {
      const [userLat, userLon] = userLocation;
      const serviceLat = selectedService.lat;
      const serviceLon = selectedService.lon;
      
      const userAddress = serviceAddresses[`${userLat},${userLon}`] || `(${userLat}, ${userLon})`;
      const serviceAddress = serviceAddresses[`${serviceLat},${serviceLon}`] || `(${serviceLat}, ${serviceLon})`;
      
      const steps = [
        `Start at your current location: ${userAddress}`,
        `Head towards the service location at: ${serviceAddress}`
      ];
      return steps;
    }
    return [];
  };

  const filteredServices = useMemo(() => {
    if (!userLocation) return staticServices;
    const [lat, lon] = userLocation;
    const currentCity = getCity(lat, lon);
    if (!currentCity) return staticServices;
    return services.filter(service => service.city === currentCity || service.city === null);
  }, [staticServices, services, userLocation]);

  const userIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const serviceIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [20, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <>
      <h1 style={{ textAlign: 'center', margin: '20px' }}>Car Maintenance Services</h1>
      <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px' }}>
        <p>Zoom in to see all available car maintenance services in the city.</p>
      </div>

      <MapContainer center={[29.9668, 32.5498]} zoom={8} style={{ height: '60vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {filteredServices.map((service) => (
          <Marker key={service.id} position={[service.lat, service.lon]} icon={serviceIcon}>
            <Popup>
              <div>
                <p>{service.name}</p>
                <p>{serviceAddresses[`${service.lat},${service.lon}`]}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleRowClick(service)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleShowDirections(service)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Show Directions
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedService && (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <h2>{selectedService.name}</h2>
          <p>{serviceAddresses[`${selectedService.lat},${selectedService.lon}`]}</p>
          <ul>
            {calculateSteps().map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
          <button
            onClick={() => handleShowDirections(selectedService)}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Show Directions
          </button>
        </div>
      )}
      <div style={{ overflowX: 'auto', margin: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => (
              <tr key={service.id} onClick={() => handleRowClick(service)} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px' }}>{service.name}</td>
                <td style={{ padding: '10px' }}>{serviceAddresses[`${service.lat},${service.lon}`]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyMap;
