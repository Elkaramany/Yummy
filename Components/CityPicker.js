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
            props.Credential({prop: 'City', value: 'City of Kigali'})
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
            <Picker.Item label="City of Kigali" value="City of Kigali" />
            <Picker.Item label="Northern Province" value="Northern Province" />
            <Picker.Item label="Southern Province" value="Southern Province" />
            <Picker.Item label="Eastern Province" value="Eastern Province" />
            <Picker.Item label="Western Province" value="Western Province" />
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
        color: Colors.DarkGreen,
        fontSize: '13rem', 
    },textInputStyle:{
        fontSize: '13rem',
        color: Colors.DarkGreen,
    },
})

const mapStateToProps= ({ SignInReducer}) =>{
    return{
        City: SignInReducer.City,
    }
}

export default connect(mapStateToProps, {Credential})(CityPicker);