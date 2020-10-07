import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Header from './common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Credential, EditInfo, signMeOut, resetErrorMessage} from '../actions';
import {Colors} from './Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon2 from 'react-native-vector-icons/Entypo';
import Spinner from './common/Spinner';
import _ from 'lodash';
import { withNavigation } from 'react-navigation';

import CityPicker from './CustomPicker';

let toBeShown = '';
function AccInfo(props){
    const [InvalidName, setInvalidName] = useState('');
    const [missMatch, setmissMatch] = useState('');
    const [cities] = useState([{name: "Gasabo"}, {name: "Kicukiro"}, {name: "Nyarugenge"}
    ,{name: 'City Centre'},{name: 'Free Trade zone'},{name: 'Gaculiro'},{name: 'Gikondo'},{name: 'Gishushu'}
    ,{name: 'Gisozi'},{name: 'Kabeza'},{name: 'Kacyiru'},{name: 'Kagugu'},{name: 'Kanombe'},{name: 'Kibagabaga'}
    ,{name: 'Kimihurura'},{name: 'Kimironko'},{name: 'Kinamba'},{name: 'Kinyinya'},{name: 'Kiyovu'},{name: 'Nyamirambo'}
    ,{name: 'Nyarutarama'},{name: 'Rebero'},{name: 'Remera'}
    ]);

    useEffect(() =>{
        if(!props.City){
            props.Credential({prop: 'City', value: cities[1]})
        }
        return function cleanup() {
            props.resetErrorMessage();
        };
    }, [])

    const validateName = (text, type) =>{
        if(text.length < 2){
            setInvalidName(`${type} must be more than 2 chars long.`)
        }else{
            setInvalidName("")
        }
        props.Credential({prop: type, value: text})
    }
    const functionsCombined=() =>{
        const {City, Address1, Address2, FirstName, LastName} = props;
        if(InvalidName !== ''){
            setmissMatch(InvalidName)
        }else if(!City || !Address1 || !Address2 || !FirstName || !LastName){
            Alert.alert("Please fill all form values");
        }else{
            setmissMatch("");
            setInvalidName('')
            functionTwo();
            
        }
    }

    const functionTwo = async () =>{
        const {City, Address1, Address2, FirstName, LastName, uid, EditInfo, points} = props;
        EditInfo({City, Address1, Address2, FirstName, LastName, uid, points});
    }

    const showMissMatch = () =>{
        if(missMatch !== ''){
            toBeShown = missMatch;
            missMatch = '';
        }else if(props.errorMessage !== ''){
            toBeShown = props.errorMessage;
            props.resetErrorMessage();
        }
        if(toBeShown !== ''){
            Alert.alert(toBeShown);
            toBeShown = '';
        }
    }

    const HandleOut =() =>{
        functionOut();
        functionAway();
    }

    const functionOut = () =>{
        props.signMeOut();
    }

    const functionAway =()=>{
        props.away();
    }

    const showLogOut =() =>{
        return(
            <View style={styles.buttonContainer2}>
                <TouchableOpacity style={[styles.buttonContainer2, {flexDirection: 'row'}]}
                    onPress={() => HandleOut()}
                >
                <Icon
                name={'logout'}
                size={25}
                color={Colors.mainHeader}
                />
                <Text style={styles.buttonTitleStyle}>Log Out</Text>
                </TouchableOpacity>
            </View>        
        )
    }

    const showButton = () =>{
        if(!props.EditLoading){
        return(
            <View style={styles.buttonContainer2}>
            <Button
                icon={
                    <Icon
                    name={'account-edit'}
                    size={25}
                    color={Colors.mainHeader}
                    />
                }
                title={'Save Changes'}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.Login}
                onPress={() => functionsCombined()}
            />
        </View>
        )}else{
            return <View style={{height: 35}}><Spinner size={'small'} /></View>
        }
    }

        const {FirstName, LastName, City, Address1, Address2, Credential, points} = props;
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround}} behaviour={'padding'} enabled={false}>
                <Header HeaderText={'Account Settings'} HeaderStyle={{backgroundColor: 'transparent'}} 
                TextStyle={[styles.headerTextStyle, {color: Colors.mainHeader}]} />
                <ScrollView contentContainerStyle={styles.container}>
                <Input
                placeholder='First Name'
                leftIcon={<Icon name={'account'} size={25} color={Colors.mainForeGround}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => validateName(text, "FirstName")}
                value={FirstName}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Last Name'
                leftIcon={<Icon name={'account-box'} size={25} color={Colors.mainForeGround}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                onChangeText={(text) => validateName(text, "LastName")}
                value={LastName}
                placeholderTextColor={Colors.mainForeGround}
                />
                <CityPicker title={'City:   '} arr={cities} value={City} 
                setValue={(item) => Credential({prop: "City", value: item})}
                pickerWidth={'95%'}
                />
                <Input
                placeholder='Address1'
                leftIcon={<Icon2 name={'address'} size={25} color={Colors.mainForeGround}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={Address1}
                onChangeText={(text) => validateName(text, "Address1")}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Address2'
                leftIcon={<Icon2 name={'address'} size={25} color={Colors.mainForeGround}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={Address2}
                onChangeText={(text) => validateName(text, "Address2")}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Text style={[styles.textInputStyle, {alignSelf: 'flex-start'}]}>Yummy Points: {props.data[0].points}</Text>
                {showButton()}
                {showLogOut()}
                {showMissMatch()}             
            </ScrollView>
            </View>
        )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainBackGround
    },
    textInputStyle:{
        fontSize: '13rem',
        color: Colors.mainForeGround,
        height: '15rem',
        marginLeft: '5rem'
    },
    textInputContainer:{
        marginBottom: '5rem',
        width: '100%'
    },
    Login:{
        backgroundColor: 'transparent',
        color: Colors.mainForeGround,
    },buttonTitleStyle:{
        color: Colors.mainHeader,
        fontSize: '15rem'
    },
    textMissMatch:{
        color: '#ff3232',
        fontSize: '12rem'
    },buttonContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },buttonContainer2:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5rem'
    },headerTextStyle:{
        color: Colors.mainForeGround,
        fontSize: '18rem',
        fontWeight: 'bold'
    }
})

const mapStateToProps = ({SignInReducer, FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return{
        FirstName: SignInReducer.FirstName,
        LastName: SignInReducer.LastName,
        City: SignInReducer.City,
        Address1: SignInReducer.Address1,
        Address2: SignInReducer.Address2,
        uid: SignInReducer.uid,
        errorMessage: SignInReducer.errorMessage,
        EditLoading: SignInReducer.EditLoading,
        points: SignInReducer.points,
        data,
    }
}

export default withNavigation (connect (mapStateToProps, {Credential, EditInfo, signMeOut, resetErrorMessage})(AccInfo));