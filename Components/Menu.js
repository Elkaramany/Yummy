import  React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {fetchAll, Credential} from '../actions';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet'
import {Colors} from './Colors';
import Spinner from './common/Spinner';
import {withNavigation} from 'react-navigation';
import CityPicker from './CustomPicker';

function Menu(props){

    const [loaded, setLoaded] = useState(false);
    const [selectedCity, setSelectedCity] = useState("No city selected")
    const [cities] = useState([{name: "Gasabo"}, {name: "Kicukiro"}, {name: "Nyarugenge"}]);

    useEffect(() =>{
        props.fetchAll();
        if(!props.user){
            props.Credential({prop: 'City', value: cities[1]})
        }
    }, [])

    useEffect(()=>{
        if(props.foods.length !== 0){
            setLoaded(true);
        }else{
            setLoaded(false);
        }

    },[props.foods])

    const renderItem =({item}) =>{
        return(
            <View style={styles.container}>
                <Text style={styles.categoryStyle}>{item.name}</Text>
                <ScrollView
                    horizontal
                    style={{flex: 1}}
                    >
                        {props.foods.map((recipe)=>{
                            if(recipe.category === item.name){
                                return(
                                    <TouchableOpacity
                                    key={recipe.id}
                                    onPress={() => props.navigation.navigate("FoodSpecific",{
                                        item: recipe,
                                        category: item,
                                    })}
                                    >
                                    <View style={styles.singleItemContainer}>
                                    <Image
                                    source={{uri: recipe.ImageLink}}
                                    style={styles.imageDims}
                                    />
                                    <Text style={styles.catTitle}>
                                        {recipe.name}
                                    </Text>
                                    </View>
                                    </TouchableOpacity>
                                )
                            }
                        }) }
                    </ScrollView>
            </View>
        )
    }

    const showLogin =()=>{
        if(!props.user){
            return(
                <TouchableOpacity
                onPress={() => props.navigation.navigate("Home")}
                >
                    <Text style={[styles.categoryStyle, styles.loginStyle]}>
                        Login Here for more of Yummy n Fresh
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    const showAddress =()=>{
        if(!props.user){
            return(
                <View style={[styles.categoryStyle, styles.loginStyle]}>
                <CityPicker title={'Delivering to  '} arr={cities} value={selectedCity} 
                setValue={(item) => setSelectedCity(item)}
                pickerWidth={'70%'}
                />
                </View>
            )
        }else{
            return (
                <Text style={[styles.categoryStyle, styles.loginStyle]}>
                        Delivering to {props.City}
                </Text>
            )
        }
    }

    if(loaded){     
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround, marginBottom: 10}}>
                {showAddress()}
                <FlatList 
                data={props.categories}
                renderItem={(renderItem)}
                keyExtractor={cat => cat.id}
                />
                {showLogin()}
            </View>
        )
    }else{
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
                <Spinner size={'large'} />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
container:{
        flex: 1,
        margin: '5rem',
        backgroundColor: 'transparent',
    },categoryStyle:{
        fontSize: '20rem',
        color: Colors.mainFooter,
        marginLeft: '12rem'
    },imageDims:{
        height: '120rem',
        width: '150rem',
        borderRadius: '20rem',
        alignSelf: 'center'
    },catTitle:{
        fontSize: '14rem',
        color: Colors.mainForeGround,
        marginLeft: '8rem',
        marginVertical: '10rem',
    },singleItemContainer:{
        justifyContent: 'center',
        marginHorizontal: '10rem',
        marginVertical: "5rem",
    },loginStyle:{
        color: Colors.mainHeader, 
        marginVertical: '10rem',
        textAlign: 'center'
    }
})

const mapStateToProps =({FoodsReducer, SignInReducer}) =>{
    return{
        foods: FoodsReducer.allFoods,
        categories: FoodsReducer.allCategories,
        user: SignInReducer.user,
        City: SignInReducer.City,
    }
}

export default withNavigation(connect(mapStateToProps, {fetchAll, Credential}) (Menu));