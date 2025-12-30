import { useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import useLocationStore from '../stores/useLocationStore';

const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const { updateLocation } = useLocationStore();

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': 'Maple/1.0',
          },
        },
      );
      const data = await response.json();
      return (
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        'Unknown'
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);

    try {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const cityName = await getCityFromCoordinates(latitude, longitude);

          updateLocation({
            city: cityName,
            coordinates: { latitude, longitude },
          });
          setLoading(false);
        },
        err => {
          console.error(err);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return { loading, getCurrentLocation };
};

export default useLocation;
