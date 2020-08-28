import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions, Alert, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {Colors} from './Colors';
import {Credential, TryLogin, fetchData, getAllCategories, getAllFoods, fetchMyOrders} from '../actions';

import Spinner from './common/Spinner';

const entireScreenWidth = Dimensions.get('window').width;

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            called: false,
            navigated: false,
        }
    }

    showErrorMessage(){
        if(this.props.errorMessage){
            return( 
            <View style={styles.buttonContainer}>
                <Text style={styles.textMissMatch}>
                    {this.props.errorMessage}
                </Text>
            </View>
            )
        }else{
            return <View></View>
        }
    }

    functionsCombined = () =>{
        const {email, password,TryLogin} = this.props;
        if(email && password){
            TryLogin({email, password});
        }else{
            Alert.alert("Email or password can't be empty")
        }
    }

    

    showButton = () =>{
        const {loading} = this.props;
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
                    onPress={() => this.functionsCombined()}
                />
                </View>
            )
        }else{
            return <View style={styles.buttonContainer}><Spinner size={'large'} /></View>
        }
    }

    fetchOnce = async() =>{
        if(!this.state.called){
            this.setState({called: true})
            this.props.getAllFoods();
            this.props.getAllCategories();   
            await this.props.fetchData();
            await this.props.fetchMyOrders();
        }
    }
    
    componentDidUpdate =() =>{
        this.props.data.map(d =>{
            if(d.AdminStatus == true){
                if(!this.state.navigated){
                    this.setState({navigated: true})
                    this.props.navigation.navigate("AdminMenu");
                }
            }else if(d.AdminStatus == false){
                if(!this.state.navigated){
                    this.setState({navigated: true})
                    this.props.navigation.navigate("Menu");
                }
            }
        })
    }

    render(){
        if(this.props.user){
            {this.fetchOnce()}
            return (
            <View style={[styles.buttonContainer, {backgroundColor: Colors.BrightYellow, flex: 1}]}>
                <Spinner size={'large'} />
            </View>
            )
        }else{
            const {Credential, email, password} = this.props;
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
                {this.showButton()}
                <View style={[styles.OrStyle, {flexDirection: 'row'}]}>
                    <Text style={styles.textInputStyle}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        >
                        <Text style={styles.signUpStyle}>Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.OrStyle}>Or</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminSignUp")}
                >
                <Text style={[styles.OrStyle, {color:Colors.MediumOrange}]}>Sign Up as an Admin</Text>
                </TouchableOpacity>
                <View style={styles.ErrorStyle}>
                    {this.showErrorMessage()}
                </View>
                </View>
            </View>
           )
        }
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
    const data = _.map(FetchedDatabase, (val, uid) =>{
        return {...val, uid}
    })
    return{
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        errorMessage: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        data,
    }
}

export default connect(mapStateToProps, { Credential, TryLogin, fetchData, getAllCategories, getAllFoods, fetchMyOrders}) (Home);