import React from 'react';
import {Credential} from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import _ from 'lodash';
import AccInfo from './AccInfo';

class Settings extends React.Component{

    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'account'} size={28} color={tintColor} />
        },
    }

    UNSAFE_componentWillMount = async () =>{
        const {data, Credential} = this.props;
        await data.map(d =>{
            Credential({prop: "FirstName", value: d.FirstName})
            Credential({prop: "LastName", value: d.LastName})
            Credential({prop: "City", value: d.City})
            Credential({prop: "Address1", value: d.Address1})
            Credential({prop: "Address2", value: d.Address2})
            Credential({prop: "uid", value: d.uid})
        })
    }

    takeMeToHome = () =>{
        this.props.navigation.navigate("Home");
    }
    
    render(){
        return <AccInfo away={() => this.takeMeToHome()}/>
    }
}


const mapStateToProps= ({FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase, (val, uid) =>{
        return {...val, uid}
    })
    return {data}
}

export default connect(mapStateToProps, {Credential}) (Settings);