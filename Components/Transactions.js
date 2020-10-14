import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';
import Header from './common/Header';
import {connect} from 'react-redux';
import {fetchAllTransactions} from '../actions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import _ from 'lodash';

const WIDTH = Dimensions.get('window').width;

function Transactions(props){

    useEffect(() =>{
        props.fetchAllTransactions();
    },[])

    const [region, setRegion] = useState({
        latitude: 1.9441,
        longitude: 30.0619,
        latitudeDelta: 0.0068185,
        longitudeDelta: 0.006555,
      })

    const showDelivery=(item)=>{
        if(item.deliver){
            return(
                <View>
                    <Text style={styles.miniHeaderStyle}>Delivered to this address: </Text>
                    <Text style={styles.itemName}>City: {item.address.City}</Text>
                    <Text style={styles.itemName}>Address1: {item.address.Address1}</Text>
                    <Text style={styles.itemName}>Address2: {item.address.Address2}</Text>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                        <MapView
                        style={styles.map}
                        region={item.region}
                        >
                            <Marker coordinate={{ latitude: item.region.latitude, longitude: item.region.longitude }} /> 
                        </MapView>
                        </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text style={styles.itemName}>Customer picked up the order at the restaurant</Text>
                </View>
            )
        }
    }

    const showOrderStatus =(status)=>{
        if(status === 'Order completed successfully'){
            return <Text style={styles.miniHeaderStyle}>{status}</Text>
        }else return <Text style={[styles.miniHeaderStyle, {color: Colors.mainFooter}]}>{status}</Text>
    }

    const renderItem =({item})=>{
        return(
            <View style={styles.itemContainer}>
                <Text style={styles.miniHeaderStyle}>Order:</Text>
                {item.data.map((order, index) =>{
                    return(
                        <>
                        <Text style={styles.itemName}>{index + 1}. {order.name}</Text>
                        <Text style={styles.itemName}>Sides: {order.sides}</Text>
                        <Text style={styles.itemName}>Dressings: {order.dressings}</Text>
                        </>
                    )
                })}
                {showOrderStatus(item.status)}
                <Text style={styles.miniHeaderStyle}>Notes:</Text>
                <Text style={styles.itemName}>{item.method}</Text>
                <Text style={styles.itemName}>Order made in: {item.fullDate}</Text>
                <Text style={styles.itemName}>Total Price: {item.navigatedPrice}RWF</Text>
                <Text style={styles.miniHeaderStyle}>Customer Information:</Text>
                <Text style={styles.itemName}>Name: {item.address.FirstName} {item.address.LastName}</Text>
                {showDelivery(item)}
                <View style={styles.mainItemContainer}></View>
            </View>
        )
    }

    const showOrders =()=>{
        if(props.data.length === 0){
            return(
                <Text style={[styles.miniHeaderStyle, {textAlign: 'center'}]}>No Transactions available</Text>
            )
        }else{
            return(
                <FlatList 
                data={props.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            )
        }
    }

    return(
        <View style={styles.container}>
            <Header HeaderText={'Order History'} 
            HeaderStyle={{backgroundColor: 'transparent'}} TextStyle={styles.headerTextStyle} />
            {showOrders()}
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.mainBackGround
    },headerTextStyle:{
        color: Colors.mainHeader,
        fontSize: '18rem',
        fontWeight: 'bold'
    },itemName:{
        fontSize: '15rem',
        color: Colors.mainForeGround
    },miniHeaderStyle:{
        fontSize: '16rem',
        fontWeight: 'bold',
        color: Colors.mainForeGround,
    },itemContainer:{
        margin: '10rem'
    },mainItemContainer:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: WIDTH * 0.1,
        marginTop: '10rem'
    },map: {
        width: '90%',
        height: '200rem',
        borderRadius: '10rem',
        marginVertical: '5rem'
    },
})

const mapStateToProps=({FetchedDatabase})=>{
    const data = _.map(FetchedDatabase.allTransactions, (val, uid) =>{
        return {...val, uid}
    })
    return{
        data,
    }
}

export default connect(mapStateToProps, {fetchAllTransactions}) (Transactions);