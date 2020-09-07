import React from 'react';
import {View, Text, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Input, Button} from 'react-native-elements';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {createAccount, Credential} from '../actions';
import {connect} from 'react-redux';
import {Colors} from './Colors';

import Spinner from './common/Spinner';
import CityPicker from './CityPicker';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            missMatch: '',
            InvalidName:'',
        }
    }

    functionsCombined = () =>{
        const {City, Address1, Address2, FirstName, LastName} = this.props;
        if(this.state.InvalidName !== ''){
            this.setState({missMatch: this.state.InvalidName})
        }else if(!City || !Address1 || !Address2 || !FirstName || !LastName){
            Alert.alert("Please fill all form values")
        }else{
            this.setState({missMatch: ''});
            this.setState({InvalidName: ''})
            this.functionTwo();
        }
    }

    functionTwo = () =>{
        this.props.navigation.navigate('SignUpFinal');
    }

    validateEmail = (text) =>{
        const form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!text.match(form)){
        this.setState({InvalidEmail:'Incorrect email'});
        }
        else {
            this.setState({InvalidEmail: 'Valid email'})
        }
        this.props.Credential({prop: 'email', value: text})
    }

    validatePassword = (text) =>{
        const formula=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!text.match(formula)){
            this.setState({InvalidPassword: 'Incorrect password'})
        }else{
            this.setState({InvalidPassword: 'Valid password'})
        }
        this.props.Credential({prop: 'password', value: text})
    }

    showMissMatch = () =>{
        if(this.state.missMatch){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{this.state.missMatch}</Text></View>
        }
    }

    validateName = (text, type) =>{
        if(text.length < 2){
            this.setState({InvalidName: `${type} must be more than 2 chars long.`})
        }else{
            this.setState({InvalidName: ""})
        }
        this.props.Credential({prop: type, value: text})
    }

    showButton = () =>{
        if(!this.props.loading){
        return(
            <View style={styles.buttonContainer2}>
            <Button
                icon={
                    <Icon
                    name={'account-plus'}
                    size={25}
                    color={Colors.DarkGreen}
                    />
                }
                title={'Proceed to Sign Up'}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.Login}
                onPress={() => this.functionsCombined()}
            />
        </View>
        )}else{
            return <View style={styles.buttonContainer}><Spinner size={'large'} /></View>
        }
    }

    backToSignIn = () =>{
        this.props.navigation.navigate('Home');
    }


    render(){
        const {Address1, Address2, FirstName, LastName} = this.props;
        return(
            <View style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
            <HeaderArrow  navigateMeBack={() => this.backToSignIn()} HeaderText={'Sign up (1 of 2)'} 
            HeaderStyle={{backgroundColor: 'transparent'}} />
            <View style={styles.container}>
                <Input
                placeholder='First Name'
                leftIcon={<Icon name={'account'} size={25} color={Colors.DarkGreen}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => this.validateName(text, "FirstName")}
                value={FirstName}
                placeholderTextColor={Colors.DarkGreen}
                />
                <Input
                placeholder='Last Name'
                leftIcon={<Icon name={'account-box'} size={25} color={Colors.DarkGreen}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                onChangeText={(text) => this.validateName(text, "LastName")}
                value={LastName}
                placeholderTextColor={Colors.DarkGreen}
                />
                <CityPicker />
                <Input
                placeholder='Address1'
                leftIcon={<Icon2 name={'address'} size={25} color={Colors.DarkGreen}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={Address1}
                onChangeText={(text) => this.validateName(text, "Address1")}
                placeholderTextColor={Colors.DarkGreen}
                />
                <Input
                placeholder='Address2'
                leftIcon={<Icon2 name={'address'} size={25} color={Colors.DarkGreen}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={Address2}
                onChangeText={(text) => this.validateName(text, "Address2")}
                placeholderTextColor={Colors.DarkGreen}
                />
                {this.showButton()}
                {this.showMissMatch()}
        </View>
        </View>
        )
    }
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle:{
        fontSize: '13rem',
        color: Colors.DarkGreen,
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
        color: Colors.DarkGreen,
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

export default connect(mapStateToProps, {createAccount, Credential})(SignUp);