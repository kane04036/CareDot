// EmergencyRoomMap.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import emergencyData from '../assets/emergency.json'; // 응급실 JSON 데이터

const EmergencyRoomMap = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('위치 권한이 허용되지 않았습니다.');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <MapView style={styles.map} region={location}>
      {emergencyData.DATA.map((hospital, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(hospital.wgs84lat),
            longitude: parseFloat(hospital.wgs84lon),
          }}
          title={hospital.dutyname}
          description={hospital.dutyaddr}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyRoomMap;
