import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {AddUserFood, ResetError} from '../actions';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from './Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import { map } from 'lodash';

function FoodSpecific(props){
    const [count, setCount] = useState(null);

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
            props.AddUserFood(item);
        }
    }

    const {item} = props.navigation.state.params;
    return(
        <View style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
            <HeaderArrow HeaderText={`${item.name}`} HeaderStyle={{backgroundColor: 'transparent'}}
            navigateMeBack={() => backToMenu()}
            TextEdited={styles.catTitle}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                source={{uri: item.ImageLink}}
                style={styles.imageDims}
                />
                <Text style={[styles.ingStyle, {fontWeight:'bold'}]}>Ingredients:</Text>
                <Text style={styles.ingStyle}>
                    {item.ingredients}
                </Text>
                <Text style={[styles.ingStyle, {fontWeight:'bold'}]}>Price: {item.price}RWF</Text>
                <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}
                >
                    <Text style={[styles.ingStyle, {marginHorizontal: 10, bottom: 3}]}>Quantity: </Text>
                    <TouchableOpacity
                    onPress={() => functionsCombinedAdd(item)}
                    >
                        <Icon 
                        name={'plus-circle'}
                        color={Colors.DarkGreen}
                        size={20}
                        />
                    </TouchableOpacity>   
                    <Text style={[styles.ingStyle, {marginHorizontal: 10, bottom: 3}]}>{item.count}</Text>
                    <TouchableOpacity onPress={() => functionsCombinedMinus(item)}>
                        <Icon 
                        name={'minus-circle'}
                        color={Colors.DarkGreen}
                        size={20}
                        />
                    </TouchableOpacity>  
                </View>
                <TouchableOpacity style={{flexDirection: 'row'}}
                onPress={() => checkUserAndAdd()}
                >
                    <Text style={[styles.catTitle, {color:Colors.Tomato, fontFamily: 'roboto'}]}>Add to cart</Text>
                    <Icon 
                    name={'cart-plus'}
                    color={Colors.Tomato}
                    size={25}
                    />
                </TouchableOpacity>
            </ScrollView>
            {showErrorMessage()}
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        //flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10rem',
    },
    imageDims:{
        height: '300rem',
        width: '300rem',
        borderRadius: '20rem',
    },catTitle:{
        fontSize: '19rem',
        color: Colors.purple,
        fontWeight: 'normal',
        alignSelf: 'center',
        fontFamily: 'Grandstander-Italic-VariableFont_wght',
    },ingStyle:{
        marginTop: '5rem',
        fontSize: '15rem',
        color: Colors.DarkGreen,
        marginHorizontal: '10rem',
        textAlign: 'center'
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },textMissMatch:{
        color: '#ff3232',
        fontSize: '14rem',
        textAlign: 'center'
    },
})

const mapStateToProps =({FoodsReducer, SignInReducer}) =>{
    return{
        errorMessage: FoodsReducer.addError,
        user: SignInReducer.user
    }
}

export default connect(mapStateToProps, {AddUserFood, ResetError}) (FoodSpecific);