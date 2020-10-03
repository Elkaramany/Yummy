import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Colors } from './Colors';
import Geolocation from '@react-native-community/geolocation';
import HeaderArrow from './common/HeaderArrow';
import Spinner from './common/Spinner';

function MapLocations(props) {
  const { price, data } = props.navigation.state.params;

  const [loaded, setLoaded] = useState(false);

  const [region, setRegion] = useState({
    latitude: -1.56,
    longitude: 30.03,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  })

  useEffect(() => {
    let currentLocation = true;
    setTimeout(() => {
      setLoaded(true);
    }, 500)
    let newRegion = { latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null };
    newRegion.longitudeDelta = region.longitudeDelta;
    newRegion.latitudeDelta = region.latitudeDelta;
    Geolocation.getCurrentPosition(info => {
      newRegion.latitude = info.coords.latitude
      newRegion.longitude = info.coords.longitude;
    });
    setTimeout(() => {
      for (var key in newRegion) {
        if (newRegion[key] == null) {
          currentLocation = false;
          break;
        }
      }
      if (currentLocation) {
        setRegion(newRegion);
      }
    }, 500)

  }, [])

  const backToCheckOut = () => {
    props.navigation.navigate("Cart");
  }

  if (loaded) {
    return (
      <View style={{ flex: 1 }}>
        <HeaderArrow navigateMeBack={() => backToCheckOut()} HeaderText={'Delivery Location'}
          HeaderStyle={{ backgroundColor: 'transparent' }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={region => setRegion(region)}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <TouchableOpacity style={styles.buttonStyle}
            onPress={() => props.navigation.navigate("Checkout", {
              price,
              data,
              region,
            })}
          >
            <Text style={styles.buttonText}>Deliver to this location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else return <Spinner size={'large'} />
}

const styles = EStyleSheet.create({
  map: {
    width: '90%',
    height: '85%',
    borderRadius: '20rem',
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
    color: Colors.mainBackGround
  }
});

export default MapLocations;