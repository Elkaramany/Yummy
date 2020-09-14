import React, {useEffect, useState} from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {fetchAll, fetchAdmin, fetchData, fetchMyOrders, Credential} from '../actions';
import _ from 'lodash';

function MainMenu(props){

    const [navigated, setNavigated] = useState(false);

    useEffect(() =>{
        if(props.user){
            props.fetchAll();
            props.fetchData(props.user.user.uid);
            props.fetchAdmin(props.user.user.uid);
            props.fetchMyOrders(props.user.user.uid);
        }
    }, [props.user])

    useEffect(() =>{
            _.map(props.citySelect, (val) =>{
                props.Credential({prop: 'City', value: val.City})
                return;
            })
    }, [props.citySelect])

    useEffect(() =>{
        //To prevent multiple navigation everytime data gets updated
        if(props.user && !navigated && props.data.length !== 0){
            setNavigated(true);
            props.data.map(d =>{
                if(d.AdminStatus === false){
                    props.navigation.navigate("Menu");
                }else if(d.AdminStatus === true){
                    props.navigation.navigate("AdminMenu");
                }
            })  
        }
    },[props.data])

    return <Menu />
}

const mapStateToProps =({SignInReducer, FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase.admin, (val, uid) =>{
        return {...val, uid}
    })
    const citySelect = FetchedDatabase.data;
    return{
        user: SignInReducer.user,
        data,
        citySelect,
    }
}

export default connect(mapStateToProps, {fetchAll, fetchAdmin, fetchData, fetchMyOrders, Credential})(MainMenu);