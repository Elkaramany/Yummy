import React, { Component, useState, useEffect } from 'react';
import {
  View, Alert, Platform, TouchableOpacity, Text
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, Marker }
  from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import EStyleSheet from 'react-native-extended-stylesheet';
import HeaderArrow from './common/HeaderArrow';
import { Colors } from './Colors';

function MapLocations(props){

  const { price, data } = props.navigation.state.params;
  const [initialPosition, setInitialPosition] = useState({
    latitude: -1.95167,
    longitude: 30.157518,
    latitudeDelta: 0.0068185,
    longitudeDelta: 0.006555,
  })

  useEffect(() => {
    requestLocationPermission();
  }, [])

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        locateCurrentPosition();
      } else {
        Alert.alert("Enabling Location in your phone's settings will lead to a better service")
      }
    }
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0068185,
          longitudeDelta: 0.006555,
        }
        setInitialPosition(newPosition)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderArrow navigateMeBack={() => backToCheckOut()} HeaderText={'Delivery Location'}
        HeaderStyle={{ backgroundColor: 'transparent' }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => _map = map}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={initialPosition}
        onRegionChangeComplete={(region) => setInitialPosition(region)}
      >
        <Marker
          coordinate={{ latitude: initialPosition.latitude, longitude: initialPosition.longitude }} />
      </MapView>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={() => props.navigation.navigate("Checkout", {
            price,
            data,
            region: initialPosition,
          })}
        >
          <Text style={styles.buttonText}>Deliver to this location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  map: {
    width: '90%',
    height: '85%',
    borderRadius: '20rem',
    marginBottom: '5rem'
  }, buttonStyle: {
    marginTop: '10rem',
    backgroundColor: Colors.mainForeGround,
    padding: '12rem',
    borderRadius: '15rem',
    justifyContent: 'center',
    alignItems: 'center'
  }, buttonText: {
    fontSize: '16rem',
    fontWeight: 'bold',
    color: Colors.mainBackGround,
  }
});

export default MapLocations;