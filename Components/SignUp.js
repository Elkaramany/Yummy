import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Input, Button} from 'react-native-elements';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {Credential} from '../actions';
import {connect} from 'react-redux';
import {Colors} from './Colors';

import Spinner from './common/Spinner';
import CityPicker from './CustomPicker';

function SignUp (props){

    const [missMatch, setMissmatch] = useState('');
    const [InvalidName, setInvalidName] = useState('');
    const [cities] = useState([{name: "Gasabo"}, {name: "Kicukiro"}, {name: "Nyarugenge"}
    ,{name: 'City Centre'},{name: 'Free Trade zone'},{name: 'Gaculiro'},{name: 'Gikondo'},{name: 'Gishushu'}
    ,{name: 'Gisozi'},{name: 'Kabeza'},{name: 'Kacyiru'},{name: 'Kagugu'},{name: 'Kanombe'},{name: 'Kibagabaga'}
    ,{name: 'Kimihurura'},{name: 'Kimironko'},{name: 'Kinamba'},{name: 'Kinyinya'},{name: 'Kiyovu'},{name: 'Nyamirambo'}
    ,{name: 'Nyarutarama'},{name: 'Rebero'},{name: 'Remera'}
    ]);

    useEffect(() =>{
        props.Credential({prop: 'City', value: cities[1]})
    }, [])


    const functionsCombined = () =>{
        const {City, Address1, Address2, FirstName, LastName} = props;
        if(InvalidName !== ''){
            setMissmatch(InvalidName);
        }else if(!City || !Address1 || !Address2 || !FirstName || !LastName){
            Alert.alert("Please fill all form values")
        }else{
            setMissmatch('');
            setInvalidName('');
            functionTwo();
        }
    }

    const functionTwo = () =>{
        props.navigation.navigate('SignUpFinal');
    }

    const validateEmail = (text) =>{
        const form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!text.match(form)){
            setInvalidName('Incorrect email format');
        }
        else {
            setInvalidName('');
        }
        props.Credential({prop: 'email', value: text})
    }

    const showMissMatch = () =>{
        if(missMatch){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{missMatch}</Text></View>
        }
    }

    const validateName = (text, type) =>{
        if(text.length < 2){
            setInvalidName(`${type} must be more than 2 chars long.`);
        }else{
            setInvalidName('');
        }
        props.Credential({prop: type, value: text})
    }

    const showButton = () =>{
        if(!props.loading){
        return(
            <View style={styles.buttonContainer2}>
            <Button
                icon={
                    <Icon
                    name={'account-plus'}
                    size={25}
                    color={Colors.mainForeGround}
                    />
                }
                title={'Proceed to Sign Up'}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.Login}
                onPress={() => functionsCombined()}
            />
        </View>
        )}else{
            return <View style={styles.buttonContainer}><Spinner size={'large'} /></View>
        }
    }

    const backToSignIn = () =>{
        props.navigation.navigate('Home');
    }

    const {Address1, Address2, FirstName, LastName, City, Credential} = props;
    return(
        <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
        <HeaderArrow  navigateMeBack={() => backToSignIn()} HeaderText={'Sign up (1 of 2)'} 
        HeaderStyle={{backgroundColor: 'transparent'}} />
        <View style={styles.container}>
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
            containerStyle={{marginRight: 50}}
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
            {showButton()}
            {showMissMatch()}
    </View>
    </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        flex:1,
        backgroundColor: 'transparent',
    },buttonTitleStyle:{
        color: Colors.mainForeGround,
        fontSize: '15rem'
    },
    textMissMatch:{
        color: '#ff3232',
        fontSize: '12rem'
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },buttonContainer2:{
        height: '25rem',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps= ({ SignInReducer}) =>{
    return{
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        createError: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        confirm: SignInReducer.confirm,
        City: SignInReducer.City,
        Address1: SignInReducer.Address1,
        Address2: SignInReducer.Address2,
        FirstName: SignInReducer.FirstName,
        LastName: SignInReducer.LastName,
    }
}

export default connect(mapStateToProps, {Credential})(SignUp);