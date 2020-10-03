import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {AddUserFood, ResetError} from '../actions';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from './Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { map } from 'lodash';
import CustomPicker from './CustomPicker';

function FoodSpecific(props){
    const [count, setCount] = useState(null);
    const [addedPrice, setAddedPrice] = useState(0);
    const [side, setSide] = useState("No sides");
    const [dressing, setDressing] = useState("No dressings");

    const {item, category} = props.navigation.state.params;
    let title = `${item.name} ${category.name}`;

    const showErrorMessage = () =>{
        if(props.errorMessage){
            return( 
            <View style={styles.buttonContainer}>
                <Text style={styles.textMissMatch}>
                {props.navigation.state.params.item.name} is {props.errorMessage}
                </Text>
            </View>
            )
        }else{
            return <View></View>
        }
    }

    useEffect(() =>{
        props.sides.map(e =>{
            if(e.name === side){
                setAddedPrice(e.price);
                return;
            }
        })
    }, [side])

    useEffect(() =>{
        setCount(props.navigation.state.params.item.count);
        return () =>{
            props.ResetError();
        }
    }, [])

    const backToMenu =() =>{
        props.navigation.goBack();
    }

    const functionsCombinedMinus =(item) =>{
        if(item.count === 1){
            Alert.alert("Quantity can't be less than 1");
        }else{
            functionOneMinus(item);
            functionTwoMinus();
        }
    }

    const functionOneMinus =(item)=>{
        item.count--;
    }

    const functionTwoMinus =() =>{
        setCount(count - 1)
    }
    

    const functionsCombinedAdd =(item) =>{
        functionOneAdd(item);
        functionTwoAdd();
    }

    const functionOneAdd = (item) =>{
        item.count++;
    }

    const functionTwoAdd = () =>{
        setCount(count + 1)
    }

    const checkUserAndAdd =()=>{
        if(!props.user){
            Alert.alert("Please login to access your cart");
            props.navigation.navigate("Home");
        }else{
            let x = {...item};
            x.name = title;
            x.price += addedPrice;
            x.sides = side;
            x.dressings = dressing;
            props.AddUserFood(x);
        }
    }

    const showSides =()=>{
        if(category.name !== "Smoothies" && category.name !== "Juices"){
            return(
                <View style={styles.pickerStyle}>
                <CustomPicker title={'Sides:  '} arr={props.sides} value={side} 
                    setValue={(item) => setSide(item)} 
                    pickerWidth={'90%'}
                />
                </View>
            )
        }
    }

    const showDressings =()=>{
        if(category.name === "Salads" || category.name === "Veggie Bowls"){
            return(
                <View style={styles.pickerStyle}>
                <CustomPicker title={'Dressings:  '} arr={props.dressings} value={dressing} 
                setValue={(item) => setDressing(item)} 
                pickerWidth={'90%'}
                />
                </View>
            )
        }
    }
    
    return(
        <ScrollView style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
            <HeaderArrow HeaderText={`${title}`} HeaderStyle={{backgroundColor: 'transparent'}}
            navigateMeBack={() => backToMenu()}
            TextEdited={styles.catTitle}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                source={{uri: item.ImageLink}}
                style={styles.imageDims}
                />
                <Text style={styles.ingStyle}>
                    {item.ingredients}
                </Text>
                {showSides()}
                {showDressings()}
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={[styles.ingStyle, {fontWeight:'bold'}]}>Total Amount: {(item.price + addedPrice) * item.count}RWF</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}
                >
                    <TouchableOpacity
                    onPress={() => functionsCombinedAdd(item)}
                    >
                        <Icon 
                        name={'plus-circle'}
                        color={Colors.mainFooter}
                        size={20}
                        />
                    </TouchableOpacity>   
                    <Text style={[styles.ingStyle, {marginHorizontal: 50, color: Colors.mainFooter}]}>{item.count}</Text>
                    <TouchableOpacity onPress={() => functionsCombinedMinus(item)}>
                        <Icon 
                        name={'minus-circle'}
                        color={Colors.mainFooter}
                        size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.checkoutButton}
                    onPress={() => checkUserAndAdd()}
                    >
                        <Text style={[styles.catTitle, {color:Colors.mainBackGround, fontFamily: 'roboto'}]}>Add to cart</Text>
                        <Icon 
                        name={'cart-plus'}
                        color={Colors.mainBackGround}
                        size={25}
                        />
                    </TouchableOpacity>  
            </ScrollView>
            {showErrorMessage()}
        </ScrollView>
    )
}

const styles = EStyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: '10rem',
    },
    imageDims:{
        height: '225rem',
        width: '300rem',
        borderRadius: '20rem',
        marginBottom: '5rem'
    },catTitle:{
        fontSize: '19rem',
        color: Colors.mainHeader,
        fontWeight: 'normal',
        alignSelf: 'center',
    },ingStyle:{
        fontSize: '18rem',
        color: Colors.mainForeGround,
        marginHorizontal: '20rem',
        marginVertical: '10rem',
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },textMissMatch:{
        color: '#ff3232',
        fontSize: '14rem',
        textAlign: 'center'
    },
    pickerStyle:{
        marginVertical: '5rem'
    },checkoutButton:{
        flexDirection: 'row', 
        marginTop: '10rem', 
        backgroundColor: Colors.mainFooter, 
        padding: '8rem',
        paddingHorizontal: '12rem',
        borderRadius: '15rem'
    }
})

const mapStateToProps =({FoodsReducer, SignInReducer}) =>{
    return{
        errorMessage: FoodsReducer.addError,
        user: SignInReducer.user,
        sides: FoodsReducer.allSides,
        dressings: FoodsReducer.allDressings,
    }
}

export default connect(mapStateToProps, {AddUserFood, ResetError}) (FoodSpecific);