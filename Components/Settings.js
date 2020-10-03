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
        if(props.user){
            props.fetchData(props.user.user.uid);
            props.fetchAdmin(props.user.user.uid);
            props.fetchMyOrders(props.user.user.uid);
        }
    }, [props.user])

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
                Credential({prop: "points", value: d.points})
                setLoaded(true)        
            })
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