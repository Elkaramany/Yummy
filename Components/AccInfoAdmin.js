import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Header from './common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Credential, EditInfoAdmin, signMeOut} from '../actions';
import {Colors} from './Colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from './common/Spinner';
import _ from 'lodash';


function AccInfoAdmin(props){
    const [InvalidName, setInvalidName] = useState('');
    const [missMatch, setmissMatch] = useState('');


    const validateName = (text, type) =>{
        if(text.length < 2){
            setInvalidName(`${type} must be more than 2 chars long.`);
        }else{
            setInvalidName("");
        }
       props.Credential({prop: type, value: text})
    }

    const functionsCombined=() =>{
        const {AdminName} = props;
        if(InvalidName !== ''){
            setmissMatch(InvalidName);
        }else if(!AdminName){
            Alert.alert("Please fill all form values");
        }else{
            setmissMatch('');
            setInvalidName('');
            functionTwo();      
        }
    }

    const functionTwo = async () =>{
        const {AdminName, uid, EditInfoAdmin} = props;
        await EditInfoAdmin({AdminName, uid});
    }

    const showMissMatch = () =>{
        let toBeShown = '';
        if(missMatch){
            toBeShown = missMatch;
        }else if(props.errorMessage !== ''){
            toBeShown = props.errorMessage;
        }
        return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{toBeShown}</Text></View>
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
                color={Colors.DarkGreen}
                />
                <Text style={styles.buttonTitleStyle}>Log Out</Text>
                </TouchableOpacity>
            </View>        
        )
    }

    const showButton = () =>{
        if(!props.loading){
        return(
            <View style={styles.buttonContainer2}>
            <Button
                icon={
                    <Icon
                    name={'account-edit'}
                    size={25}
                    color={Colors.DarkGreen}
                    />
                }
                title={'Save Changes'}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.Login}
                onPress={() => functionsCombined()}
            />
        </View>
        )}else{
            return <View style={styles.buttonContainer}><Spinner size={'large'} /></View>
        }
    }

    const showEditMessage = () =>{
        if(props.errorMessage){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{props.errorMessage}</Text></View>
        }else{
            return <View></View>
        }
    }

    const {AdminName} = props;
    return(
        <View style={{flex: 1, backgroundColor: Colors.BrightYellow}} behaviour={'padding'} enabled={false}>
            <Header HeaderText={'Account Settings'} HeaderStyle={{backgroundColor: 'transparent'}} TextStyle={styles.headerTextStyle} />
            <ScrollView contentContainerStyle={styles.container}>
                <Input
                placeholder='Admin Name'
                leftIcon={<Icon name={'account'} size={25} color={Colors.DarkGreen}/>}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => validateName(text, "AdminName")}
                value={AdminName}
                placeholderTextColor={Colors.DarkGreen}
                />
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
        backgroundColor: Colors.BrightYellow
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
        backgroundColor: 'transparent',
        color: Colors.DarkGreen,
    },buttonTitleStyle:{
        color: Colors.DarkGreen,
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
    },headerTextStyle:{
        color: Colors.DarkGreen,
        fontSize: '18rem',
        fontWeight: 'bold'
    }
})

const mapStateToProps = ({SignInReducer}) =>{
    return{
        AdminName: SignInReducer.AdminName,
        uid: SignInReducer.uid,
        errorMessage: SignInReducer.errorMessage,
        EditLoading: SignInReducer.EditLoading,
    }
}

export default connect (mapStateToProps, {Credential, EditInfoAdmin, signMeOut})(AccInfoAdmin);