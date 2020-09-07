import React , {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Colors';
import HeaderArrow from './common/HeaderArrow';
import {connect} from 'react-redux';
import _ from 'lodash';
import {makeOrder, Credential} from '../actions';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import stripe from 'tipsi-stripe';

stripe.setOptions({
    publishableKey:'pk_test_51HLo2zFQ6XcCeM3SnP2VHEkBSVskdi0wmEwaQ1Yku5WnNYv1W01pG8qb4bNutTbVGkopFSCWOUUVib1N7ccQ1piw00Tur1PvEY',
})


function Checkout(props){
    const [address, setAddress] = useState(null);
    const[deliver, setDeliver] = useState(false);
    const[card, setCard] = useState(false);
    const[cash, setCash] = useState(false);

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

    useEffect(() =>{
        const {data} = props;
        data.map(d =>{
            setAddress(d)
        })
        return () =>{

        }
    }, [])

    const CardForm =async (data, price , deliver, address, method, fullDate)=>{
        try{
            const {Address1, Address2, FirstName, LastName, City} = props;
            let name = FirstName + ' ' + LastName;
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
                axios.get(`https://arcane-ocean-58349.herokuapp.com/createStripePaymentIntent?money=${price}&&cur=${"FRw"}&&token=${token.tokenId}`).then(res =>{
                    if(res.status === 200){
                        props.makeOrder({data, price , deliver, address, method, fullDate});
                        props.navigation.navigate("Menu");
                    }else{
                        Alert.alert("Error confirming Payment");
                    }
                }).catch(e=>{
                    console.log(e);
                    Alert.alert("Error confirming Payment");
                })
        }catch{
            Alert.alert("Error making payment, Please try again")
        }
    }

    const backToCart =() =>{
        props.navigation.goBack();
    }
    const setPaymentMethod =(card,cash)=>{
        setCard(card);
        setCash(cash);
    }

    const navigateMeAway = () =>{
        let method = "";
        const {price, data} = props.navigation.state.params;
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let fullDate = currentDate.getDate() + '-' + month + ' at ' + currentDate.getHours() + ":" + currentDate.getMinutes();
        if(cash){
            method = "Customer will pay with cash";
            props.makeOrder({data, price , deliver, address, method, fullDate});
            props.navigation.navigate("Menu");
        }else if(card){
            method = "Customer Paid with Credit card";
            CardForm(data, price , deliver, address, method, fullDate);
        }else if(paypal){

        }else{
            Alert.alert("Please select a payment method")
        }
    }

    return(
        <View style={styles.container}>
             <HeaderArrow HeaderText={"Checkout"} HeaderStyle={{backgroundColor: 'transparent'}}
                navigateMeBack={() => backToCart()}
                TextEdited={{color: Colors.MediumOrange}}
            />
            <Text style={[styles.footerStyle, styles.HeaderOptionStyle]}>Delivery Method:</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={[styles.clearContainer,{
                    backgroundColor: deliver ? null : Colors.purple,
                }]}
                onPress={() => setDeliver(false)}
                >
                    <Text style={[styles.footerStyle,{color: deliver ? Colors.purple : Colors.BrightYellow}]}>Pick up at the restaurant</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clearContainer,{
                    backgroundColor: !deliver ? null : Colors.purple,
                }]}
                onPress={() => setDeliver(true)}
                >
                    <Text style={[styles.footerStyle,{color: !deliver ? Colors.purple : Colors.BrightYellow}]}>Deliver to my address</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.footerStyle, styles.HeaderOptionStyle]}>Payment Method:</Text>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={[styles.clearContainer,{
                    backgroundColor: card ? Colors.purple: null,
                    flexDirection:'row',
                }]}
                onPress={() => setPaymentMethod(true,false, false,false)}
                >
                    <Icon 
                    name={'credit-card'}
                    size={25}
                    color={card ? Colors.BrightYellow : Colors.purple}
                    />
                    <Text style={[styles.footerStyle,{color: card ? Colors.BrightYellow : Colors.purple}]}>Credit or debit or MTN Momo Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.clearContainer,{
                    backgroundColor: cash ? Colors.purple: null,
                    flexDirection:'row',
                }]}
                onPress={() => setPaymentMethod(false,true,false,false)}
                >
                    <Icon2 
                    name={'cash'}
                    size={25}
                    color={cash ? Colors.BrightYellow : Colors.purple}
                    />
                    <Text style={[styles.footerStyle,{color: cash ? Colors.BrightYellow : Colors.purple}]}>Cash</Text>
                </TouchableOpacity>
            </View>
                <TouchableOpacity style={styles.buttonContainerStyle}
                onPress={() => navigateMeAway()}
                >
                    <Icon4
                        name={'arrow-right-circle'}
                        size={25}
                        color={Colors.purple}
                    />
                    <Text style={[styles.footerStyle, {fontWeight:'bold'}]}>Proceed</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.BrightYellow,
    },headerTextStyle:{
        color: Colors.DarkGreen,
        fontSize: '20rem',
        fontWeight: 'bold'
    },footerStyle:{
        fontSize: '12rem',
        fontWeight:'bold',
        color: Colors.purple,
        textAlign:'center',
        backgroundColor: 'transparent',
        borderRadius: '10rem',
        padding: '5rem',
        marginHorizontal: 0
    }, clearContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '1rem',
        paddingHorizontal: '5rem', 
        backgroundColor: 'transparent',
        borderRadius: '10rem',
        marginBottom: '10rem',
        marginHorizontal: '5rem'
    },HeaderOptionStyle:{
        color: Colors.DarkGreen, 
        fontWeight: 'bold',
        fontSize:'15rem'
    },buttonContainerStyle:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = ({FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return {data}
}

export default connect (mapStateToProps, {makeOrder, Credential})(Checkout);