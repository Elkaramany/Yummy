import React , {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';

function CustomPicker(props){

    const {title, arr, value,  setValue, pickerWidth} = props;

    return(
        <View style={[styles.container, {width: pickerWidth}]}>
            <Text style={styles.textInputStyle}>{title}</Text>
            <Picker
            selectedValue={value}
            style={styles.pickerContainer}
            onValueChange={(itemValue) => setValue(itemValue) }
            >
                {arr.map(pick =>{
                    return <Picker.Item label={pick.name} value={pick.name} key={pick.name} style={styles.pickerItemStyle}/>
                })}
            </Picker>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10rem',
    },
    pickerContainer:{
        flex: 1,
        height: '25rem',
        color: Colors.mainForeGround,
    },textInputStyle:{
        fontSize: '17rem',
        color: Colors.mainForeGround,
    },pickerItemStyle:{
        fontSize: '17rem'
    }
})

export default CustomPicker;