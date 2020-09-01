import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('window').width;

function HeaderArrow (props){
    return(
        <View style={[styles.HeaderContainer, props.HeaderStyle]}>
            <Icon style={[styles.arrowStyle, props.extraArrow]} name={'arrow-back'} size={30} color={'#FF8C00'} onPress={() => props.navigateMeBack()}/>
            <Text style={[styles.TextStyle, props.TextEdited]}>
                {props.HeaderText}
            </Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    HeaderContainer:{
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25rem',
        marginTop: '10rem',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        marginRight: '15rem'
    },
    TextStyle:{
        fontSize: '17rem',
        fontWeight: 'bold'
    }
})

export default HeaderArrow;