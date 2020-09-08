import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from './Colors';
import {connect} from 'react-redux';

const entireScreenWidth = Dimensions.get('window').width;

function ListFooter({price, CheckMeOut, ClearMeOut}){
    return(
        <View>
            <Text style={[styles.footerStyle, {margin: 10}]}>Total: {price} RWF</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.clearContainer}
                onPress={() => ClearMeOut()}
                >
                    <Text style={[styles.footerStyle, {color: '#fff', backgroundColor: 'transparent', marginHorizontal: 0}]}>Clear Cart</Text>
                    <Icon2 name={'delete-forever'} size={20} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clearContainer, {backgroundColor: Colors.mainHeader}]}
                onPress={() => CheckMeOut()}
                >
                    <Text style={[styles.footerStyle, {color:'#fff', backgroundColor: 'transparent', marginHorizontal: 0}]}>Check out</Text>
                    <Icon name={'add-shopping-cart'} size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    footerStyle:{
        fontSize: '17rem',
        fontWeight:'bold',
        color: '#fff',
        textAlign:'center',
        backgroundColor: '#fe5269',
        borderRadius: '10rem',
        padding: '5rem',
        marginHorizontal: entireScreenWidth * 0.3
    }, clearContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        paddingHorizontal: '10rem', 
        backgroundColor: Colors.brightRed,
        borderRadius: '10rem',
        marginBottom: '5rem',
        marginHorizontal: '5rem'
    }
})

export default ListFooter;