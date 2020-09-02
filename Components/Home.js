import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {Colors} from './Colors';
import {Credential, TryLogin, fetchData, getAllCategories, getAllFoods, fetchMyOrders, fetchAdmin} from '../actions';

import Spinner from './common/Spinner';

function Home(props){
    
    useEffect(() =>{
        if(props.user){
            props.getAllFoods();
            props.getAllCategories();
            props.fetchData(props.user.user.uid);
            props.fetchAdmin(props.user.user.uid);
            props.fetchMyOrders(props.user.user.uid);
        }
    }, [props.user])

    useEffect(() =>{
        //To prevent multiple navigation everytime data gets updated
        if(props.user && !props.navigated && props.data.length !== 0){
            props.Credential({prop: 'navigated', value: true})
            props.data.map(d =>{
                if(d.AdminStatus === false){
                    props.navigation.navigate("Menu");
                }else if(d.AdminStatus === true){
                    props.navigation.navigate("AdminMenu");
                }
            })  
        }
    },[props.data])

    const showErrorMessage = () =>{
        if(props.errorMessage){
            return( 
            <View style={styles.buttonContainer}>
                <Text style={styles.textMissMatch}>
                    {props.errorMessage}
                </Text>
            </View>
            )
        }else{
            return <View></View>
        }
    }

    const functionsCombined = () =>{
        const {email, password,TryLogin} = props;
        if(email && password){
            TryLogin({email, password});
        }else{
            Alert.alert("Email or password can't be empty")
        }
    }

    const showButton = () =>{
        const {loading} = props;
        if(!loading){
            return(
                <View style={styles.buttonContainer2}>
                <Button
                style={{flex: 1}}
                    icon={
                        <Icon
                        name={'login'}
                        size={25}
                        color={Colors.DarkGreen}
                        />
                    }
                    title={'Login'}
                    titleStyle={{color: Colors.DarkGreen}}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={() => functionsCombined()}
                />
                </View>
            )
        }else{
            return <View style={styles.buttonContainer}><Spinner size={'large'} /></View>
        }
    }

    if(props.user){
        return (
        <View style={[styles.buttonContainer, {backgroundColor: Colors.BrightYellow, flex: 1}]}>
            <Spinner size={'large'} />
        </View>
        )
    }else{
        const {Credential, email, password} = props;
        return(
        <View style={styles.container}>
            <Image 
            style={styles.imageDimensions}
            source={require("../Images/logo.jpg")}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={25} color={Colors.DarkGreen}/>}
                onChangeText={(text) => Credential({prop: 'email', value: text})}
                value={email}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                placeholderTextColor={Colors.DarkGreen}
            />
            <Input
                placeholder='Password'
                leftIcon={<Icon name={'lock'} size={25} color={Colors.DarkGreen}/>}
                onChangeText={(text) => Credential({prop: 'password', value: text})}
                value={password}
                secureTextEntry
                inputStyle={styles.textInputStyle}
                inputContainerStyle={styles.textInputContainer}
                placeholderTextColor={Colors.DarkGreen}
            />                
            {showButton()}
            <View style={[styles.OrStyle, {flexDirection: 'row'}]}>
                <Text style={styles.textInputStyle}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('SignUp')}
                    >
                    <Text style={styles.signUpStyle}>Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.OrStyle}>Or</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("AdminSignUp")}
            >
            <Text style={[styles.OrStyle, {color:Colors.MediumOrange}]}>Sign Up as an Admin</Text>
            </TouchableOpacity>
            <Text style={styles.OrStyle}>Or</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("MainMenu")}
            >
            <Text style={[styles.OrStyle, {color:Colors.MediumOrange}]}>Browse without login</Text>
            </TouchableOpacity>
            <View style={styles.ErrorStyle}>
                {showErrorMessage()}
            </View>
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
        backgroundColor: Colors.BrightYellow
    },
    textInputStyle:{
        fontSize: '15rem',
        color: Colors.DarkGreen,
        height: '20rem',
        marginLeft: '5rem'
    },
    textInputContainer:{
        marginBottom: '5rem',
        width: '100%'
    },
    imageDimensions:{
        width: '150rem',
        height: '150rem',

    },signUpStyle:{
        color: Colors.MediumOrange,
        fontSize: '15rem',
        fontWeight: 'bold',
    },buttonContainer2:{
        height: '15rem',
        justifyContent: 'center',
        alignItems: 'center',
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },textMissMatch:{
        color: '#ff3232',
        fontSize: '14rem',
        textAlign: 'center'
    },logoStyle:{
        bottom: '15rem'
    },OrStyle:{
        fontSize: '14rem',
        color: Colors.DarkGreen,
        height: '25rem',
        marginLeft: '5rem'
    },ErrorStyle:{
        height: '10rem',
        marginTop: '5rem'
    },dontStyle:{
        flexDirection: 'row',
        //height: '20rem',
        width: '100%'
    }
})

const mapStateToProps= ({ SignInReducer, FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase.admin, (val, uid) =>{
        return {...val, uid}
    })
    return{
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        errorMessage: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        navigated: SignInReducer.navigated,
        data,
    }
}

export default connect(mapStateToProps, { Credential, TryLogin, fetchData, getAllCategories
    , getAllFoods, fetchMyOrders, fetchAdmin}) (Home);