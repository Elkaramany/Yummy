import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../Colors';

function Spinner ({size}){
    return(
        <View
        style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        }}
        >
            <ActivityIndicator
            size={size}
            color={Colors.DarkGreen}
            />
        </View>
    );
}

export default Spinner