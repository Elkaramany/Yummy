import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class AdminMenu extends React.Component{

    static navigationOptions = {
        header: null,
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'reorder'} size={28} color={tintColor} />
        },
    }

    render(){
        return(
            <View stlye={{flex: 1}}>
                <Text>Admin Menu page</Text>
            </View>
        )
    }
}

export default AdminMenu;