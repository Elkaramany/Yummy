import React, {useEffect, useState} from 'react';
import { Credential, fetchData,fetchMyOrders, fetchAdmin} from '../actions';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import AccInfo from './AccInfo';
import Spinner from './common/Spinner'

function Settings(props){

    const [loaded, setLoaded] = useState(false);

    useEffect(() =>{
        if(!props.user){
            Alert.alert("Please login to access your settings");
            props.navigation.navigate("Home");
        }else{
            const {data, Credential} = props;
            Credential({prop: "FirstName", value: data[0].FirstName})
            Credential({prop: "LastName", value: data[0].LastName})
            Credential({prop: "City", value: data[0].City})
            Credential({prop: "Address1", value: data[0].Address1})
            Credential({prop: "Address2", value: data[0].Address2})
            Credential({prop: "uid", value: data[0].uid})
            Credential({prop: "points", value: data[0].points})
            setLoaded(true)       
        }
    }, [])

    const takeMeToHome = () =>{
        props.navigation.navigate("Home");
    }
    
    if(loaded){
        return <AccInfo away={() => takeMeToHome()}/>
    }else return <Spinner size={'large'} />
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

export default connect(mapStateToProps, { Credential, fetchData
    , fetchMyOrders, fetchAdmin}) (Settings);