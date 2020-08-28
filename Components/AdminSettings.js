import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class AdminSettings extends React.Component{

    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'account'} size={28} color={tintColor} />
        },
    }

    render(){
        return(
            <View stlye={{flex: 1}}>
                <Text>AdminSettings page</Text>
            </View>
        )
    }
}

export default AdminSettings;