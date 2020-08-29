import React, {useEffect} from 'react';
import AccInfoAdmin from './AccInfoAdmin';
import {connect} from 'react-redux';
import {Credential} from '../actions';
import _ from 'lodash';

function AdminSettings(props){
    useEffect(() =>{
        const {data, Credential} = props;
            data.map(d =>{
                Credential({prop: "AdminName", value: d.AdminName})
            })
    }, [])

    const takeMeToHome = () =>{
        props.navigation.navigate("Home");
    }
    
    return (
        <AccInfoAdmin away={() => takeMeToHome()}/>
    )
}


const mapStateToProps= ({FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase, (val, uid) =>{
        return {...val, uid}
    })
    return {data}
}

export default connect(mapStateToProps, {Credential}) (AdminSettings);