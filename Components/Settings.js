import React, {useEffect} from 'react';
import {Credential} from '../actions';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import AccInfo from './AccInfo';

function Settings(props){

    useEffect(() =>{
        if(!props.user){
            Alert.alert("Please login to access your settings");
            props.navigation.navigate("Home");
        }else{
        const {data, Credential} = props;
        data.map(d =>{
            Credential({prop: "FirstName", value: d.FirstName})
            Credential({prop: "LastName", value: d.LastName})
            Credential({prop: "City", value: d.City})
            Credential({prop: "Address1", value: d.Address1})
            Credential({prop: "Address2", value: d.Address2})
            Credential({prop: "uid", value: d.uid})
        })
        }
    }, [])

    const takeMeToHome = () =>{
        props.navigation.navigate("Home");
    }
    
    return <AccInfo away={() => takeMeToHome()}/>
}


const mapStateToProps= ({FetchedDatabase, SignInReducer}) =>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return {
        data,
        user: SignInReducer.user
    }
}

export default connect(mapStateToProps, {Credential}) (Settings);