import React, {useEffect} from 'react';
import AccInfoAdmin from './AccInfoAdmin';
import {connect} from 'react-redux';
import {Credential} from '../actions';
import {fetchData} from '../actions';
import _ from 'lodash';

function AdminSettings(props){

    useEffect(() =>{
        const {data, Credential} = props;
        data.map(d =>{
            Credential({prop: "AdminName", value: d.AdminName})
            Credential({prop: "uid", value: d.uid})
        })
    }, [])

    const takeMeToHome = () =>{
        props.navigation.navigate("Home");
    }
    
    return (
        <AccInfoAdmin away={() => takeMeToHome()}/>
    )
}


const mapStateToProps= ({FetchedDatabase, SignInReducer}) =>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return {data,
    user: SignInReducer.user
    }
}

export default connect(mapStateToProps, {Credential, fetchData}) (AdminSettings);