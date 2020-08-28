import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

function Header ({HeaderStyle, TextStyle, HeaderText}){
    return(
        <View style={[styles.HeaderContainer, HeaderStyle]}>
            <Text style={[styles.TextStyle, TextStyle]}>
                {HeaderText}
            </Text>
        </View>
    )
}

export default Header;

const styles = EStyleSheet.create({
    HeaderContainer:{
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40rem',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: '2rem',
        position: 'relative',
    },
    TextStyle:{
        fontSize: '20rem',
    }
})