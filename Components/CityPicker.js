import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {Credential} from '../actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';

function CityPicker(props){

    useEffect(() =>{
        if(!props.City){
            props.Credential({prop: 'City', value: 'Gasabo'})
        }
    }, [])
    
    return(
        <View style={styles.container}>
            <Text style={styles.textInputStyle}>City: </Text>
            <Picker
            selectedValue={props.City}
            style={styles.pickerContainer}
            onValueChange={(itemValue, itemIndex) =>
                props.Credential({prop: 'City', value: itemValue})
            }>
            <Picker.Item label="Gasabo" value="Gasabo" />
            <Picker.Item label="Kicukiro" value="Kicukiro" />
            <Picker.Item label="Nyarugenge" value="Nyarugenge" />
        </Picker>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10rem'
    },
    pickerContainer:{
        flex: 1,
        height: '35rem',
        color: Colors.mainForeGround,
        fontSize: '13rem', 
    },textInputStyle:{
        fontSize: '13rem',
        color: Colors.mainForeGround,
    },
})

const mapStateToProps= ({ SignInReducer}) =>{
    return{
        City: SignInReducer.City,
    }
}

export default connect(mapStateToProps, {Credential})(CityPicker);