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
    const [cities, setCities] = useState([{name: "Gasabo"}, {name: "Kicukiro"}, {name: "Nyarugenge"}
    ,{name: 'City Centre'},{name: 'Free Trade zone'},{name: 'Gaculiro'},{name: 'Gikondo'},{name: 'Gishushu'}
    ,{name: 'Gisozi'},{name: 'Kabeza'},{name: 'Kacyiru'},{name: 'Kagugu'},{name: 'Kanombe'},{name: 'Kibagabaga'}
    ,{name: 'Kimihurura'},{name: 'Kimironko'},{name: 'Kinamba'},{name: 'Kinyinya'},{name: 'Kiyovu'},{name: 'Nyamirambo'}
    ,{name: 'Nyarutarama'},{name: 'Rebero'},{name: 'Remera'}
    ]);

    useEffect(() =>{
        if(props.user && loaded){
            const {data, Credential} = props;
            data.map(d =>{
                Credential({prop: "FirstName", value: d.FirstName})
                Credential({prop: "LastName", value: d.LastName})
                Credential({prop: "City", value: d.City})
                Credential({prop: "Address1", value: d.Address1})
                Credential({prop: "Address2", value: d.Address2})
                Credential({prop: "uid", value: d.uid})
                Credential({prop: "points", value: d.points})
            })
        }
        props.fetchAll(); 
    }, [])

    useEffect(()=>{
        if(props.foods){
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
        if(props.user){
            return(
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('Settings')}
                >
                    <Text style={[styles.categoryStyle, styles.loginStyle]}>Delivering to {props.City}</Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <View style={[styles.categoryStyle, styles.loginStyle]}>
                <CityPicker title={'Delivering to  '} arr={cities} value={selectedCity} 
                setValue={(item) => setSelectedCity(item)}
                pickerWidth={'70%'}
                />
                </View>
            )
        }
    }

    if(loaded){     
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
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

const mapStateToProps =({FoodsReducer, SignInReducer, FetchedDatabase}) =>{
    const data = _.map(FetchedDatabase.data, (val, uid) =>{
        return {...val, uid}
    })
    return{
        foods: FoodsReducer.allFoods,
        categories: FoodsReducer.allCategories,
        user: SignInReducer.user,
        City: SignInReducer.City,
        data,
    }
}

export default withNavigation(connect(mapStateToProps, {fetchAll, Credential}) (Menu));