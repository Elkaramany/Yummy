import React from 'react';
import {View, Text, KeyboardAvoidingView, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Input, Button} from 'react-native-elements';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAccount, Credential} from '../actions';
import {connect} from 'react-redux';
import {Colors} from './Colors';

import Spinner from './common/Spinner'

const SignUpFinal =(props) =>{
    const [missMatch, setMissMatch] = useState('');
    const [InvalidEmail, setInvalidEmail] = useState('');

    functionsCombined = () =>{
        const {email, password, confirm} = props;
        if(InvalidEmail != ''){
            setMissMatch(InvalidEmail)
        }else if(email.length === 0 || password.length === 0 || confirm.length === 0){
            Alert.alert("Please fill all form values")
        }else if(password !== confirm){
            Alert.alert("Password doesn't match it's confirmation");
        }else{
            setMissMatch('')
            setInvalidEmail('')
            functionOne();
            functionTwo();
        }
    }

    const functionOne = () =>{
        let AdminStatus = false;
        const {createAccount, FirstName, LastName, City, Address1, Address2, email, password} = props;
        createAccount({email, password, City, Address1, Address2, FirstName, LastName, AdminStatus})
    }
    
    const functionTwo = () =>{
        props.navigation.navigate('Home');
    }

    const validateEmail = (text) =>{
        const form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!text.match(form)){
            setInvalidEmail('Incorrect email format');
        }
        else {
            setInvalidEmail('')
        }
        props.Credential({prop: 'email', value: text})
    }

    const validatePassword = (text) =>{
        const formula=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!text.match(formula)){
            setInvalidEmail('Password must be 6 to 20 chars which contain at least one digit, an uppercase and a lowercase letter')
        }else{
            setInvalidEmail('')
        }
        props.Credential({prop: 'password', value: text})
    }

    const showMissMatch = () =>{
        if(missMatch){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{missMatch}</Text></View>
        }
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
                title={'Sign Up'}
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
        props.navigation.navigate('SignUp');
    }

        const {email, password, Credential, confirm} = props;
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
            <HeaderArrow  navigateMeBack={() => backToSignIn()} HeaderText={'Sign up (2 of 2)'} HeaderStyle={{backgroundColor: 'transparent'}}
             />
            <View style={styles.container} >
                <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={25} color={Colors.mainForeGround}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => validateEmail(text)}
                value={email}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Password'
                leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                onChangeText={(text) => validatePassword(text)}
                value={password}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Confirm password'
                leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={confirm}
                onChangeText={(text) => Credential({prop: 'confirm', value: text})}
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
        bottom: '50rem'
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

export default connect(mapStateToProps, {createAccount, Credential})(SignUpFinal);