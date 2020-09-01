import React , {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fetchMyOrders, deleteSingleFood, ResetError, addThePrice, deleteAllCart} from '../actions';
import {Colors} from './Colors';
import Header from './common/Header';
import _ from 'lodash';
import ListFooter from './ListFooter';

const WIDTH = Dimensions.get('window').width;

let all = 0;

function Cart(props){
    
    useEffect(() =>{
        props.fetchMyOrders(props.user.user.uid);
    }, [])

    const functionsCombined =(x) =>{
        functionOne(x);
        functionTwo();
    }

    const functionOne =(x)=>{
        props.deleteSingleFood(x);
    }

    const functionTwo =()=>{
       all = 0;
    }

    const checkMeOut = () =>{
        props.navigation.navigate('Checkout',{
            data: props.data,
            price: all,
        });
    }

    const ClearMeOut =() =>{
        props.deleteAllCart();
    }

    const showFooter =()=>{
        if(props.data.length !== 0){
            return <ListFooter price={all} ClearMeOut={() => ClearMeOut()} CheckMeOut={() => checkMeOut()} />
        }
    }

    const cartLength =() =>{
        if(props.data.length === 0){
            all = 0;
            return(
                <View style={{flex: 1, backgroundColor: Colors.BrightYellow, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.catTitle, {textAlign: 'center'}]}>Your Cart is empty</Text>
                </View>
            )
        }else{
            // to prevent adding to the previous state
            all = 0;
            return props.data.map((item) =>{
                //Calculating the total price
                all += (item.price * item.count);
                return(
                    <>
                        <View style={styles.container}>
                            <Image
                            source={{uri: item.ImageLink}}
                            style={styles.imageDims}
                            />
                            <View style={styles.secondContainer}>
                                <Text style={styles.catTitle}>Name: {item.name}</Text>
                                <Text style={styles.catTitle}>Price: {item.price} RWF</Text>
                                <Text style={styles.catTitle}>Quantity: {item.count}</Text>
                                <Text style={styles.catTitle}>Total price: {item.count * item.price} RWF</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.singleRemove}
                        onPress={() => functionsCombined(item.uid)}
                        >
                            <Icon2
                            name={'delete-empty'}
                            size={20}
                            color={'#fff'}
                            />
                        </TouchableOpacity>
                        <View style={styles.mainItemContainer}></View>
                    </>
                )
            })
        }
    }
    
    return(
        <ScrollView style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
            <Header HeaderText={'Your Eating Cart'} HeaderStyle={{backgroundColor: 'transparent'}} 
            TextStyle={[styles.headerTextStyle, {color: Colors.MediumOrange}]} />
            {cartLength()}
            {showFooter()}
        </ScrollView>
    )
}

const styles = EStyleSheet.create({
    mainItemContainer:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: WIDTH * 0.1,
    marginTop: '10rem'
    },
    container:{
        margin: '5rem',
        flexDirection: 'row'
    },catTitle:{
        fontSize: '17rem',
        color: Colors.DarkGreen,
    },imageDims:{
        height: '100rem',
        width: '100rem',
        borderRadius: '20rem',
    },headerTextStyle:{
        color: Colors.DarkGreen,
        fontSize: '20rem',
        fontWeight: 'bold'
    },secondContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '5rem',
    },footerStyle:{
        fontSize: '20rem',
        fontWeight:'bold',
        color: Colors.Tomato,
        textAlign:'center'
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

const mapStateToProps =({FetchedOrders, FoodsReducer, SignInReducer}) =>{
    const data = _.map(FetchedOrders, (val, uid) =>{
        return {...val, uid}
    })
    return {
        data,
        addError: FoodsReducer.addError,
        totalPrice: FoodsReducer.totalPrice,
        user: SignInReducer.user,
    }
}

export default connect(mapStateToProps, {fetchMyOrders, deleteSingleFood, ResetError, addThePrice, deleteAllCart}) (Cart);