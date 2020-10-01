import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {Colors} from './Colors';
import HeaderArrow from './common/HeaderArrow';

function MapLocations(props){
    const {price, data} = props.navigation.state.params;

    const [region, setRegion] = useState({
        latitude: 1.9441,
        longitude: 30.0619,
        latitudeDelta: 2,
        longitudeDelta: 2,
      })

    const backToCheckOut = () =>{
        props.navigation.navigate("Cart");
    }
    
    return(
        <View style={{flex: 1}}>
            <HeaderArrow  navigateMeBack={() => backToCheckOut()} HeaderText={'Delivery Location'} 
            HeaderStyle={{backgroundColor: 'transparent'}}
             />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={region => setRegion(region)}
            >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> 
            </MapView>
            <TouchableOpacity style={styles.buttonStyle}
                onPress={ () => props.navigation.navigate("Checkout",{
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
}

const styles = EStyleSheet.create({
    map: {
      width: '90%',
      height: '85%',
      borderRadius: '10rem',
    },buttonStyle:{
        marginTop: '10rem',
        backgroundColor: Colors.mainForeGround,
        padding: '12rem',
        borderRadius: '15rem',
        justifyContent: 'center',
        alignItems: 'center'
    },buttonText:{
        fontSize: '16rem',
        fontWeight: 'bold',
        color: Colors.mainBackGround
    }
  });

export default MapLocations;