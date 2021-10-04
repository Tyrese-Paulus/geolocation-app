import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Mapview, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const App = () => {
  Location.installWebGeolocationPolyfill();

  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [coordinates] = useState([
    {
      latitude: -26.175167,
      longitude: 27.914507,
    },
    {
      latitude: -28.175167,
      longitude: 27.914507,
    },
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      { timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return currentPosition.latitude ? (
    <Mapview
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={currentPosition}
    >
      <Polyline
        coordinates={coordinates}
        strokeWidth={4}
        strokeColor='#111111'
      />
    </Mapview>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} animating size='large' />
  );
};

export default App;
