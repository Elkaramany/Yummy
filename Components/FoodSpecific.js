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
        props.navigation.navigate("Menu");
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

    const {item} = props.navigation.state.params;
    return(
        <View style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
            <HeaderArrow HeaderText={"Yummy n Fresh Ingredients Summary"} HeaderStyle={{backgroundColor: 'transparent'}}
            navigateMeBack={() => backToMenu()}
            TextEdited={{color: Colors.MediumOrange}}
            extraArrow={styles.arrowStyle}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.catTitle}>
                    {item.name}
                </Text>
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
                        size={15}
                        />
                    </TouchableOpacity>   
                    <Text style={[styles.ingStyle, {marginHorizontal: 10, bottom: 3}]}>{item.count}</Text>
                    <TouchableOpacity onPress={() => functionsCombinedMinus(item)}>
                        <Icon 
                        name={'minus-circle'}
                        color={Colors.DarkGreen}
                        size={15}
                        />
                    </TouchableOpacity>  
                </View>
                <TouchableOpacity style={{flexDirection: 'row'}}
                onPress={() => props.AddUserFood(item)}
                >
                    <Text style={[styles.catTitle, {color:Colors.Tomato}]}>Add to cart</Text>
                    <Icon 
                    name={'cart-plus'}
                    color={Colors.Tomato}
                    size={20}
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
        height: '350rem',
        width: '350rem',
        borderRadius: '20rem',
    },catTitle:{
        fontSize: '15rem',
        fontWeight: 'bold',
        color: Colors.Tomato,
        alignSelf: 'center'
    },ingStyle:{
        marginTop: '5rem',
        fontSize: '15rem',
        color: Colors.DarkGreen,
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

const mapStateToProps =({FoodsReducer}) =>{
    return{
        errorMessage: FoodsReducer.addError,
    }
}

export default connect(mapStateToProps, {AddUserFood, ResetError}) (FoodSpecific);