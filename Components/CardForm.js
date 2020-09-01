import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Input, Card} from 'react-native-elements';
import {CredentialCard, Credential} from '../actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {Colors} from './Colors';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import stripe from 'tipsi-stripe';
import _ from 'lodash';

stripe.setOptions({
    publishableKey:'pk_test_51HLo2zFQ6XcCeM3SnP2VHEkBSVskdi0wmEwaQ1Yku5WnNYv1W01pG8qb4bNutTbVGkopFSCWOUUVib1N7ccQ1piw00Tur1PvEY',
})

function CardForm(props){
    const {CredentialCard, Number, expMonth, expYear, cvc} = props;

    useEffect(() =>{
        const {data, Credential} = props;
        data.map(d =>{
            Credential({prop: "FirstName", value: d.FirstName})
            Credential({prop: "LastName", value: d.LastName})
            Credential({prop: "City", value: d.City})
            Credential({prop: "Address1", value: d.Address1})
            Credential({prop: "Address2", value: d.Address2})
            Credential({prop: "uid", value: d.uid})
        })
    }, [])

    const validateCard = async () =>{
        let dt = new Date().getFullYear();
        if(isNaN(Number) || Number.length !== 16){
            Alert.alert("Credit card number must consist of 16 digits");
        }else if(isNaN(expMonth) || expMonth.length !== 2 || expMonth > 12 || expMonth < 1){
            Alert.alert("Expiration Month must be a valid month consisting of 2 digits");
        }else if(isNaN(expYear) || expYear.length !== 2 || expYear < dt - 2000){
            Alert.alert("Expiration Year must be a valid year consisting of 2 digits");
        }else if(cvc.length !== 3){
            Alert.alert("CVC number must consist of 3 digits");
        }else{
            try{
            const {Address1, Address2, FirstName, LastName, City} = props;
            let name = FirstName + ' ' + LastName;
            console.log(name);
            const options = {
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                  billingAddress: {
                    name,
                    line1: Address1,
                    line2: Address2,
                    state: City,
                    country: 'RW',
                  },
                },
              }
                const token = await stripe.paymentRequestWithCardForm(options);
                console.log(token + ' here');
            }catch{
                Alert.alert("Error making payment, Please try again")
            }
        }
    }

    const backToPayment =() =>{
        props.navigation.goBack();
    }
    
    return(
        <View style={styles.container}>
            <HeaderArrow  navigateMeBack={() => backToPayment()} HeaderText={'Credit Card Details'} HeaderStyle={{backgroundColor: 'transparent'}}
             TextEdited={{color: '#FF8C00'}}/>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Input
                placeholder='Credit Card number'
                leftIcon={<Icon 
                    name={'credit-card'}
                    size={25}
                    color={Colors.DarkGreen}
                    />}
                maxLength={16}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => CredentialCard({prop: "Number", value: text})}
                value={Number}
                placeholderTextColor={Colors.DarkGreen}
                />
                 <Input
                placeholder='Expiration Year'
                leftIcon={<Icon3 
                    name={'calendar'}
                    size={25}
                    color={Colors.DarkGreen}
                    />}
                maxLength={2}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => CredentialCard({prop: "expYear", value: text})}
                value={expYear}
                placeholderTextColor={Colors.DarkGreen}
                />
                 <Input
                placeholder='Expiration Month'
                leftIcon={<Icon2 
                    name={'calendar-month'}
                    size={25}
                    color={Colors.DarkGreen}
                    />}
                maxLength={2}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => CredentialCard({prop: "expMonth", value: text})}
                value={expMonth}
                placeholderTextColor={Colors.DarkGreen}
                />
                 <Input
                placeholder='CVC'
                leftIcon={<Icon2 
                    name={'numeric-3-box-multiple'}
                    size={25}
                    color={Colors.DarkGreen}
                    />}
                maxLength={3}
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInputStyle}
                onChangeText={(text) => CredentialCard({prop: "cvc", value: text})}
                value={cvc}
                placeholderTextColor={Colors.DarkGreen}
                />
                <TouchableOpacity style={styles.buttonContainerStyle}
                onPress={() => validateCard()}
                >
                    <Text style={[styles.footerStyle, {fontWeight:'bold'}]}>Pay with this Card</Text>
                    <Icon4
                        name={'payment'}
                        size={25}
                        color={Colors.purple}
                    />
                </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
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
    },buttonContainerStyle:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = ({CardReducer, SignInReducer, FetchedDatabase})=>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return{
        Number: CardReducer.Number,
        expMonth: CardReducer.expMonth,
        expYear: CardReducer.expYear,
        cvc: CardReducer.cvc,
        user: SignInReducer.user,
        City: SignInReducer.City,
        Address1: SignInReducer.Address1,
        Address2: SignInReducer.Address2,
        FirstName: SignInReducer.FirstName,
        LastName: SignInReducer.LastName,
        data,
        
    }
}

export default connect (mapStateToProps, {CredentialCard, Credential}) (CardForm);