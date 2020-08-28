import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

function Button ({onPress, buttonText}){
    return(
        <TouchableOpacity style={styles.buttonContainer}
        onPress={onPress}
        >
            <Text style={styles.buttonText}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
}
export default Button

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#007aff',
        flex: 1,
        alignSelf: 'stretch',
        margin: 3,
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
        color: '#007aff',
    }
});