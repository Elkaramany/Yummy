import React, {useEffect} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';
import Header from './common/Header';
import {connect} from 'react-redux';
import {fetchAllOrders, OrderFinished} from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

const WIDTH = Dimensions.get('window').width;

function AdminMenu(props){

    useEffect(() =>{
        props.fetchAllOrders();
    },[])

    useEffect(() =>{
        setTimeout(() =>{
            console.log('called');
            props.fetchAllOrders();
        }, 60000)
    })

    const showDelivery=(item)=>{
        if(item.deliver){
            return(
                <View>
                    <Text style={styles.miniHeaderStyle}>Deliver to this address: </Text>
                    <Text style={styles.itemName}>City: {item.address.City}</Text>
                    <Text style={styles.itemName}>Address1: {item.address.Address1}</Text>
                    <Text style={styles.itemName}>Address2: {item.address.Address2}</Text>
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

    const renderItem =({item})=>{
        return(
            <View style={styles.itemContainer}>
                <Text style={styles.miniHeaderStyle}>Order:</Text>
                {item.data.map((order, index) =>{
                    return(
                        <Text style={styles.itemName}>{index + 1}. {order.name}</Text>
                    )
                })}
                <Text style={styles.miniHeaderStyle}>Notes:</Text>
                <Text style={styles.itemName}>{item.method}</Text>
                <Text style={styles.itemName}>Order made in: {item.fullDate}</Text>
                <Text style={styles.itemName}>Total Price: {item.price}</Text>
                <Text style={styles.miniHeaderStyle}>Customer Information:</Text>
                <Text style={styles.itemName}>Name: {item.address.FirstName} {item.address.LastName}</Text>
                {showDelivery(item)}
                <TouchableOpacity style={styles.singleRemove}
                onPress={() => props.OrderFinished(item.uid)}
                >
                    <Icon
                    name={'delete-empty'}
                    size={20}
                    color={'#fff'}
                    />
                </TouchableOpacity>
                <View style={styles.mainItemContainer}></View>
            </View>
        )
    }

    const showOrders =()=>{
        if(props.data.length === 0){
            return(
                <Text style={[styles.miniHeaderStyle, {textAlign: 'center'}]}>No orders are made</Text>
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
        backgroundColor: Colors.BrightYellow
    },headerTextStyle:{
        color: Colors.DarkGreen,
        fontSize: '18rem',
        fontWeight: 'bold'
    },itemName:{
        fontSize: '14rem',
        color: Colors.DarkGreen
    },miniHeaderStyle:{
        fontSize: '16rem',
        fontWeight: 'bold',
        color: Colors.purple,
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
        width: Dimensions.get('window').width * 0.06,
        height: Dimensions.get('window').width * 0.06,
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

export default connect(mapStateToProps, {fetchAllOrders, OrderFinished}) (AdminMenu);