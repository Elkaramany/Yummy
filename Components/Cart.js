import React from 'react';
import {View, Text, FlatList, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

class Cart extends React.Component{
    constructor(props){
        super(props);
    }


    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'shopping-cart'} size={25} color={tintColor} />
        },
    }


    UNSAFE_componentWillMount =() =>{
        all = 0;
        this.props.fetchMyOrders();
    }

    functionsCombined =(x) =>{
        this.functionOne(x);
        this.functionTwo();
    }

    functionOne =(x)=>{
        this.props.deleteSingleFood(x);
    }

    functionTwo =()=>{
        all = 0;
    }

    checkMeOut = () =>{
        console.log('clicked check')
    }

    ClearMeOut =() =>{
        this.props.deleteAllCart();
    }

    showFooter =()=>{
        if(this.props.data.length !== 0){
            return <ListFooter price={all} ClearMeOut={() => this.ClearMeOut()} CheckMeOut={() => this.checkMeOut()} />
        }
    }

    cartLength =() =>{
        if(this.props.data.length === 0){
            all = 0;
            return(
                <View style={{flex: 1, backgroundColor: Colors.BrightYellow, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.catTitle, {textAlign: 'center'}]}>Your Cart is empty</Text>
                </View>
            )
        }else{
            all = 0;
            return this.props.data.map((item) =>{
                all += item.price * item.count;
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
                        onPress={() => this.functionsCombined(item.uid)}
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
    
    render(){
        return(
            <ScrollView style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
                <Header HeaderText={'Your Eating Cart'} HeaderStyle={{backgroundColor: 'transparent'}} TextStyle={[styles.headerTextStyle, {color: Colors.MediumOrange}]} />
                {this.cartLength()}
                {this.showFooter()}
            </ScrollView>
        )
    }
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
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.06,
        height: Dimensions.get('window').width * 0.06,
    }
})

const mapStateToProps =({FetchedOrders, FoodsReducer}) =>{
    const data = _.map(FetchedOrders, (val, uid) =>{
        return {...val, uid}
    })
    return {
        data,
        addError: FoodsReducer.addError,
        totalPrice: FoodsReducer.totalPrice,
    }
}

export default connect(mapStateToProps, {fetchMyOrders, deleteSingleFood, ResetError, addThePrice, deleteAllCart}) (Cart);