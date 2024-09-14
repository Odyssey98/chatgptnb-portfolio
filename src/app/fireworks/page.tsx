'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const ImmersiveStreetViewPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const panorama = new google.maps.StreetViewPanorama(mapRef.current, {
          position: { lat: 48.858844, lng: 2.294351 }, // 起始位置：埃菲尔铁塔
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          addressControl: false,
          showRoadLabels: false,
        });

        panorama.addListener('position_changed', () => {
          const position = panorama.getPosition();
          if (position) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: position }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                setCurrentLocation(results[0].formatted_address);
              }
            });
          }
        });
      }
    });
  }, []);

  const moveToRandomLocation = () => {
    const randomLocations = [
      { lat: 40.758896, lng: -73.985130 }, // 纽约时代广场
      { lat: 51.500729, lng: -0.124625 },  // 伦敦大本钟
      { lat: 35.659494, lng: 139.700292 }, // 东京涉谷十字路口
      { lat: 41.890251, lng: 12.492373 },  // 罗马斗兽场
      { lat: -33.856159, lng: 151.215256 }, // 悉尼歌剧院
    ];
    const randomLocation = randomLocations[Math.floor(Math.random() * randomLocations.length)];
    const panorama = new google.maps.StreetViewPanorama(mapRef.current as HTMLElement);
    panorama.setPosition(randomLocation);
  };

  return (
    <div className="h-screen flex flex-col">
      <div ref={mapRef} className="flex-grow"></div>
      <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
        <p className="text-sm">{currentLocation}</p>
      </div>
      <button
        onClick={moveToRandomLocation}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        随机传送
      </button>
    </div>
  );
};

export default ImmersiveStreetViewPage;