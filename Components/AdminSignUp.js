import React from 'react';
import {View, Text, KeyboardAvoidingView, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Input, Button} from 'react-native-elements';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {createAccount2, Credential} from '../actions';
import {connect} from 'react-redux';
import {Colors} from './Colors';

import Spinner from './common/Spinner'

class AdminSignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            missMatch: '',
            InvalidEmail:'',
        }
    }

    functionsCombined = () =>{
        const {email, password, confirm, AdminToken, AdminName} = this.props;
        if(this.state.InvalidEmail !== ''){
            this.setState({missMatch: this.state.InvalidEmail})
        }else if(email.length === 0 || password.length === 0|| confirm.length === 0|| AdminToken.length === 0|| AdminName.length === 0 ){
            Alert.alert("Please fill all form values");
        }else if(password !== confirm){
            Alert.alert("Password doesn't match it's confirmation");
        }else if(AdminToken !== "admin"){
            Alert.alert("Invalid Admin Token!!");
        }else if(AdminName.length < 2){
            Alert.alert("User name can't be less than 2 chars long")
        }else{
            this.setState({missMatch: ''});
            this.functionOne();
            this.functionTwo();
        }
    }

    functionOne = () =>{
        let AdminStatus = true;
        const {createAccount2, AdminName, AdminToken, email, password} = this.props;
        createAccount2({email, password, AdminToken, AdminName, AdminStatus});
    }
    
    functionTwo = () =>{
        this.props.navigation.navigate('Home');
    }

    validateEmail = (text) =>{
        const form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!text.match(form)){
        this.setState({InvalidEmail:'Incorrect email format'});
        }
        else {
            this.setState({InvalidEmail: ''})
        }
        this.props.Credential({prop: 'email', value: text})
    }

    validatePassword = (text) =>{
        const formula=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!text.match(formula)){
            this.setState({InvalidEmail: 'Password must be 6 to 20 chars which contain at least one digit, an uppercase and a lowercase letter'})
        }else{
            this.setState({InvalidEmail: ''})
        }
        this.props.Credential({prop: 'password', value: text})
    }

    showMissMatch = () =>{
        if(this.state.missMatch){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{this.state.missMatch}</Text></View>
        }
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
                    color={Colors.mainForeGround}
                    />
                }
                title={'Sign Up as an Admin'}
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
        const {email, password,Credential, confirm, AdminName, AdminToken} = this.props;
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
            <HeaderArrow  navigateMeBack={() => this.backToSignIn()} HeaderText={'Sign up as an Admin'} 
            HeaderStyle={{backgroundColor: 'transparent'}}/>
            <View style={styles.container}>
                <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={25} color={Colors.mainForeGround}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => this.validateEmail(text)}
                value={email}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Password'
                leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                onChangeText={(text) => this.validatePassword(text)}
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
                <Input
                placeholder='User Name'
                leftIcon={<Icon name={'account-box'} size={25} color={Colors.mainForeGround}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={AdminName}
                onChangeText={(text) => Credential({prop: 'AdminName', value: text})}
                placeholderTextColor={Colors.mainForeGround}
                />
                <Input
                placeholder='Admin Token'
                leftIcon={<Icon2 name={'user-secret'} size={25} color={Colors.mainForeGround}/>}
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                value={AdminToken}
                onChangeText={(text) => Credential({prop: 'AdminToken', value: text})}
                placeholderTextColor={Colors.mainForeGround}
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
        bottom: '40rem'
    },
    textInputStyle:{
        fontSize: '13rem',
        color: Colors.mainForeGround,
        height: '20rem',
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
        AdminToken: SignInReducer.AdminToken,
        AdminName: SignInReducer.AdminName,
    }
}

export default connect(mapStateToProps, {createAccount2, Credential})(AdminSignUp);