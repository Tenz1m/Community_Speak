import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RealtimeLocationTracker: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  let markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  const [locationInfo, setLocationInfo] = useState<{
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
  }>({
    latitude: null,
    longitude: null,
    accuracy: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView([14.0860746, 100.608406], 6);
          const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          });
          osm.addTo(mapRef.current);
        }
      });
    }
  }, []);

  const trackGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updateLocation);
    } else {
      console.log("Geolocation is not supported in your browser.");
    }
  };

  const updateLocation = (position: GeolocationPosition) => {
    const { latitude: lat, longitude: long, accuracy } = position.coords;

    if (!markerRef.current) {
      const busIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/4565/4565023.png",
        iconSize: [32, 32],
      });
      markerRef.current = L.marker([lat, long], { icon: busIcon }).addTo(mapRef.current!);
    } else {
      markerRef.current.setLatLng([lat, long]);
    }

    if (!circleRef.current) {
      circleRef.current = L.circle([lat, long], { radius: accuracy }).addTo(mapRef.current!);
    } else {
      circleRef.current.setLatLng([lat, long]).setRadius(accuracy);
    }

    mapRef.current?.panTo([lat, long]);

    setLocationInfo({
      latitude: lat,
      longitude: long,
      accuracy: accuracy,
    });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    margin: '0',
    padding: '0',
  };

  return (
<div style={{ textAlign: 'center' }}>
  <div id="map" style={{ width: '100%', height: '460px', margin: '0 auto', border: '2px solid #333' }}></div>
  <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' }} onClick={trackGeolocation}>Track Bus Location</button>
  <div style={{ textAlign: 'left', marginTop: '10px' }}>
    <h2 style={{ fontSize: '20px', color: '#333' }}>Location Information</h2>
    <p style={{ fontSize: '16px', color: '#333' }}>Latitude: <span style={{ fontWeight: 'bold' }}>{locationInfo.latitude}</span></p>
    <p style={{ fontSize: '16px', color: '#333' }}>Longitude: <span style={{ fontWeight: 'bold' }}>{locationInfo.longitude}</span></p>
    <p style={{ fontSize: '16px', color: '#333' }}>Accuracy: <span style={{ fontWeight: 'bold' }}>{locationInfo.accuracy} meters</span></p>
  </div>
</div>

  );
};

export default RealtimeLocationTracker;
