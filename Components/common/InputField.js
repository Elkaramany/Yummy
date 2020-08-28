import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

function InputField (props){
    return (
    <View style={styles.container}>
        <Text style={styles.labelText}>
            {props.fieldText}
        </Text>
        <TextInput 
            style={styles.inputStyle}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            underlineColorAndroid={props.underlineColorAndroid}
            autoCorrect={props.autoCorrect}
            autoCapitalize={props.autoCapitalize}
        />
    </View>
    );
}

export default InputField

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    height: 50,
    lineHeight: 23,
    width: 100,
    flex: 8,
    textAlign: 'center',
  },
  labelText:{
      fontSize: 18,
      flex: 2,
  },
  container:{
      height: 60,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
  }
});
