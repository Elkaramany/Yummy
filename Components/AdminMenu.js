import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';
import Header from './common/Header';
import {connect} from 'react-redux';
import {fetchAllOrders, Transaction} from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import _ from 'lodash';
import DialogInput from 'react-native-dialog-input';

const WIDTH = Dimensions.get('window').width;

function AdminMenu(props){

    const [input, setInput] = useState(false);

    useEffect(() =>{
        props.fetchAllOrders();
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
                    <Text style={styles.miniHeaderStyle}>Deliver to this address: </Text>
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
                    <Text style={styles.itemName}>Customer will pick up the order at the restaurant</Text>
                </View>
            )
        }
    }

    const OrderHanded =(item) =>{
        item.status = 'Order completed successfully'
        props.Transaction(item)
    }

    const OrderCancelled =(item, text)=>{
        setInput(false);
        item.status = 'Order cancelled because ' + text;
        props.Transaction(item)
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
                <Text style={styles.miniHeaderStyle}>Notes:</Text>
                <Text style={styles.itemName}>{item.method}</Text>
                <Text style={styles.itemName}>Order made in: {item.fullDate}</Text>
                <Text style={styles.itemName}>Total Price: {item.navigatedPrice}RWF</Text>
                <Text style={styles.miniHeaderStyle}>Customer Information:</Text>
                <Text style={styles.itemName}>Name: {item.address.FirstName} {item.address.LastName}</Text>
                {showDelivery(item)}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={[styles.clearContainer, {backgroundColor: Colors.mainHeader}]}
                    onPress={() => OrderHanded(item)}
                    >
                        <Text style={[styles.footerStyle, {color:'#fff', backgroundColor: 'transparent', marginHorizontal: 0}]}>Order Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clearContainer}
                    onPress={() => setInput(true)}
                    >
                        <Text style={[styles.footerStyle, {color: '#fff', backgroundColor: 'transparent', marginHorizontal: 0}]}>Cancel Order</Text>
                    </TouchableOpacity>
                </View>
                <DialogInput isDialogVisible={input}
                    title={"Order cancel"}
                    message={"Why are you cancelling this order?"}
                    hintInput ={""}
                    submitInput={ (text) => OrderCancelled(item, text)}
                    closeDialog={ () => setInput(false)}>
                </DialogInput>
                <View style={styles.mainItemContainer}></View>
            </View>
        )
    }

    const showOrders =()=>{
        if(props.data.length === 0){
            return(
                <Text style={[styles.miniHeaderStyle, {textAlign: 'center'}]}>No orders available</Text>
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
            <Header HeaderText={'All orders'} 
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
        color: Colors.mainHeader,
    },itemContainer:{
        margin: '10rem'
    },mainItemContainer:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: WIDTH * 0.1,
        marginTop: '10rem'
    },singleRemove:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#2E90C8', 
        justifyContent: 'center',
        padding: '3rem',
        borderRadius: '50rem',
        marginHorizontal: WIDTH * 0.45,
        left: WIDTH * 0.33,
        //to make a circle:
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.07,
        height: Dimensions.get('window').width * 0.07,
    },map: {
        width: '90%',
        height: '200rem',
        borderRadius: '10rem',
        marginVertical: '5rem'
      },footerStyle:{
        fontSize: '14rem',
        fontWeight:'bold',
        color: '#fff',
        textAlign:'center',
        backgroundColor: '#fe5269',
        padding: '5rem',
        marginHorizontal: WIDTH * 0.3
    }, clearContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: '10rem', 
        backgroundColor: Colors.brightRed,
        borderRadius: '10rem',
        marginTop: '5rem',
        marginHorizontal: '5rem'
    }
})

const mapStateToProps=({FetchedDatabase})=>{
    const data = _.map(FetchedDatabase.allOrders, (val, uid) =>{
        return {...val, uid}
    })
    return{
        data,
    }
}

export default connect(mapStateToProps, {fetchAllOrders, Transaction}) (AdminMenu);