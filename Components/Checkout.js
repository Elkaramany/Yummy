import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from './Colors';
import HeaderArrow from './common/HeaderArrow';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { makeOrder, Credential } from '../actions';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import stripe from 'tipsi-stripe';
import Spinner from './common/Spinner';

const entireScreenWidth = Dimensions.get('window').width

stripe.setOptions({
    publishableKey: 'pk_test_51HLo2zFQ6XcCeM3SnP2VHEkBSVskdi0wmEwaQ1Yku5WnNYv1W01pG8qb4bNutTbVGkopFSCWOUUVib1N7ccQ1piw00Tur1PvEY',
})


function Checkout(props) {
    let { price, data, region } = props.navigation.state.params;
    const [address, setAddress] = useState(null);
    const [navigatedPrice, setNavigatedPrice] = useState(price);
    const [deliver, setDeliver] = useState(false);
    const [card, setCard] = useState(false);
    const [cash, setCash] = useState(false);
    const [momo, setMomo] = useState(false);
    const [mobile, setMobile] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [redeem, setRedeem] = useState(false);

    useEffect(() => {
        //getting the user address for the checkout
        const { data, Credential } = props;
        data.map(d => {
            Credential({ prop: "FirstName", value: d.FirstName })
            Credential({ prop: "LastName", value: d.LastName })
            Credential({ prop: "City", value: d.City })
            Credential({ prop: "Address1", value: d.Address1 })
            Credential({ prop: "Address2", value: d.Address2 })
            Credential({ prop: "uid", value: d.uid })
            Credential({ prop: "points", value: d.points })
            setLoaded(true)
        })
    }, [])

    useEffect(() => {
        const { data } = props;
        data.map(d => {
            setAddress(d)
        })
        return () => {

        }
    }, [])

    const CardForm = async (data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID) => {
        try {
            const { Address1, Address2, FirstName, LastName, City } = props;
            const currency = 'rwf';
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
            axios.get(`https://arcane-ocean-58349.herokuapp.com/createStripePaymentIntent/${navigatedPrice}/${currency}/${token.tokenId}`)
                .then(res => {
                    if (res.data.outcome.seller_message === "Payment complete.") {
                        props.makeOrder({ data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID });
                        props.navigation.navigate("Menu");
                    } else {
                        Alert.alert('Error making payment, Please try again');
                    }
                }).catch(e => {
                    Alert.alert('Error in requesting payment');
                })
        } catch {
            Alert.alert("Error making payment, Please try again")
        }
    }

    const backToCart = () => {
        props.navigation.goBack();
    }

    const setPaymentMethod = (card, cash, momo) => {
        setCard(card);
        setCash(cash);
        setMomo(momo);
        if (momo) {
            setMobile('+250')
        }
    }

    const MobilePay = (data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID) => {
        let currency = 'rwf';
        
        axios.get(`https://arcane-ocean-58349.herokuapp.com/createStripePaymentIntent/${navigatedPrice}/${currency}/${token.tokenId}`)
    }

    const navigateMeAway = () => {
        let method = "";
        let { pointsUID } = props;
        let points = props.data[0].points;
        if (navigatedPrice < price) points = 0;
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let fullDate = currentDate.getDate() + '-' + month + ' at ' + currentDate.getHours() + ":" + currentDate.getMinutes();
        if (cash) {
            method = "Customer will pay with cash";
            props.makeOrder({ data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID });
            props.navigation.navigate("Menu");
        } else if (card) {
            method = "Customer Paid with Credit card";
            CardForm(data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID);
        } else if (momo) {
            if (mobile.length < 13) {
                Alert.alert("Please enter a valid phone number")
            } else {
                method = "Customer Paid with MTN mobile money";
                MobilePay(data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID);
            }
        } else {
            Alert.alert("Please select a payment method")
        }
    }

    const showMobileInput = () => {
        if (momo) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Input
                        maxLength={13}
                        placeholder='Please enter your phone number'
                        inputContainerStyle={styles.textInputContainer}
                        inputStyle={styles.textInputStyle}
                        onChangeText={(text) => setMobile(text)}
                        value={mobile}
                        textAlign={'center'}
                        placeholderTextColor={Colors.mainForeGround}
                    />
                </View>
            )
        } else {
            return <View />
        }
    }

    const showPoints = () => {
        let p = props.data[0].points;
        if (p != 0) return (
            <TouchableOpacity
                onPress={() => setTotalPrice()}
            >
                <Text style={[styles.footerStyle, styles.redeemStyle, { color: Colors.mainBackGround }]}>Redeem {p} Yummy points for a {p} RWF discount</Text>
            </TouchableOpacity>
        )
    }

    const setTotalPrice = () => {
        if (redeem) {
            setRedeem(false);
            setNavigatedPrice(price)
        } else {
            setRedeem(true);
            setNavigatedPrice(price -= props.data[0].points)
        }
    }

    if (!loaded) {
        return <Spinner size={'large'} />
    } else {
        return (

            <View style={styles.container}>
                <HeaderArrow HeaderText={"Checkout"} HeaderStyle={{ backgroundColor: 'transparent' }}
                    navigateMeBack={() => backToCart()}
                />
                <Text style={[styles.footerStyle, styles.HeaderOptionStyle]}>Delivery Method:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.clearContainer, {
                        backgroundColor: deliver ? null : Colors.mainHeader,
                    }]}
                        onPress={() => setDeliver(false)}
                    >
                        <Text style={[styles.footerStyle, { color: deliver ? Colors.mainHeader : Colors.mainBackGround }]}>Pick up at the restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clearContainer, {
                        backgroundColor: !deliver ? null : Colors.mainHeader,
                    }]}
                        onPress={() => setDeliver(true)}
                    >
                        <Text style={[styles.footerStyle, { color: !deliver ? Colors.mainHeader : Colors.mainBackGround }]}>Deliver to my address</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.footerStyle, styles.HeaderOptionStyle]}>Payment Method:</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.clearContainer, {
                        backgroundColor: card ? Colors.mainHeader : null,
                        flexDirection: 'row',
                    }]}
                        onPress={() => setPaymentMethod(true, false, false)}
                    >
                        <Icon
                            name={'credit-card'}
                            size={25}
                            color={card ? Colors.mainBackGround : Colors.mainHeader}
                        />
                        <Text style={[styles.footerStyle, { color: card ? Colors.mainBackGround : Colors.mainHeader }]}>Credit or debit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clearContainer, {
                        backgroundColor: cash ? Colors.mainHeader : null,
                        flexDirection: 'row',
                    }]}
                        onPress={() => setPaymentMethod(false, true, false)}
                    >
                        <Icon2
                            name={'cash'}
                            size={25}
                            color={cash ? Colors.mainBackGround : Colors.mainHeader}
                        />
                        <Text style={[styles.footerStyle, { color: cash ? Colors.mainBackGround : Colors.mainHeader }]}>Cash</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.clearContainer, {
                        backgroundColor: momo ? Colors.mainHeader : null,
                        flexDirection: 'row',
                    }]}
                        onPress={() => setPaymentMethod(false, false, true)}
                    >
                        <Icon
                            name={'device-mobile'}
                            size={25}
                            color={momo ? Colors.mainBackGround : Colors.mainHeader}
                        />
                        <Text style={[styles.footerStyle, { color: momo ? Colors.mainBackGround : Colors.mainHeader }]}>MTN Mobile money</Text>
                    </TouchableOpacity>
                    {showMobileInput()}
                </View>
                <TouchableOpacity style={styles.buttonContainerStyle}
                    onPress={() => navigateMeAway()}
                >
                    <Icon4
                        name={'arrow-right-circle'}
                        size={25}
                        color={Colors.mainHeader}
                    />
                    <Text style={[styles.footerStyle, { fontWeight: 'bold' }]}>Proceed</Text>
                </TouchableOpacity>
                <Text style={[styles.footerStyle, styles.totalPrice]}>Total: {navigatedPrice} RWF</Text>
                {showPoints()}
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBackGround,
    }, headerTextStyle: {
        color: Colors.mainForeGround,
        fontSize: '20rem',
        fontWeight: 'bold'
    }, footerStyle: {
        fontSize: '12rem',
        fontWeight: 'bold',
        color: Colors.mainHeader,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderRadius: '10rem',
        padding: '5rem',
        marginHorizontal: 0
    }, clearContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5rem',
        backgroundColor: 'transparent',
        borderRadius: '10rem',
        marginBottom: '10rem',
        marginHorizontal: '5rem'
    }, HeaderOptionStyle: {
        color: Colors.mainForeGround,
        fontWeight: 'bold',
        fontSize: '15rem'
    }, buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, textInputStyle: {
        fontSize: '13rem',
        color: Colors.mainForeGround,
        height: '15rem',
    }, textInputContainer: {
        width: '70%'
    }, totalPrice: {
        margin: '10rem',
        color: Colors.mainFooter,
        fontWeight: 'bold',
        fontSize: '18rem'
    }, redeemStyle: {
        backgroundColor: Colors.mainFooter,
        marginHorizontal: entireScreenWidth * 0.2
    }
})

const mapStateToProps = ({ FetchedDatabase, SignInReducer }) => {
    const data = _.map(FetchedDatabase.data, (val, uid) => {
        return { ...val, uid }
    })
    return {
        data,
        user: SignInReducer.user,
        pointsUID: SignInReducer.uid,
    }
}

export default connect(mapStateToProps, { makeOrder, Credential })(Checkout);