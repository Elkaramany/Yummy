import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../Colors';

const WIDTH = Dimensions.get('window').width;

function HeaderArrow (props){
    return(
        <View style={[styles.HeaderContainer, props.HeaderStyle]}>
            <Icon style={[styles.arrowStyle, props.extraArrow]} name={'arrow-back'} size={30} color={Colors.mainHeader} onPress={() => props.navigateMeBack()}/>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.TextStyle, props.TextEdited]}>
                {props.HeaderText}
            </Text>
            </View> 
        </View>
    )
}

const styles = EStyleSheet.create({
    HeaderContainer:{
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        height: '25rem',
        width: '100%',
        marginTop: '10rem',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        marginHorizontal: '5rem'
    },
    TextStyle:{
        fontSize: '18rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.mainHeader,
    }
})

export default HeaderArrow;