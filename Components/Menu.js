import  React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {getAllCategories, getAllFoods} from '../actions';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet'
import {Colors} from './Colors';
import Spinner from './common/Spinner';
import {withNavigation} from 'react-navigation';

function Menu(props){

    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        props.getAllFoods();
        props.getAllCategories();
    },[])

    useEffect(()=>{
        if(props.foods){
            setLoaded(true);
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
                                    })}
                                    >
                                    <View style={{flex: 1, margin: 5, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.catTitle}>
                                        {recipe.name}
                                    </Text>
                                    <Image
                                    source={{uri: recipe.ImageLink}}
                                    style={styles.imageDims}
                                    />
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
                    <Text style={[styles.catTitle, {color: Colors.purple}]}>
                        Login Here for more of Yummy n Fresh
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    if(loaded){     
        return(
            <View style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
                {showLogin()}
                <FlatList 
                data={props.categories}
                renderItem={(renderItem)}
                keyExtractor={cat => cat.id}
                />
            </View>
        )
    }else{
        return(
            <View style={{flex: 1, backgroundColor: Colors.BrightYellow}}>
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
        fontSize: '15rem',
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.Tomato
    },imageDims:{
        height: '150rem',
        width: '150rem',
        borderRadius: '20rem',
    },catTitle:{
        fontSize: '15rem',
        color: Colors.DarkGreen,
        alignSelf: 'center'
    }
})

const mapStateToProps =({FoodsReducer, SignInReducer}) =>{
    return{
        foods: FoodsReducer.allFoods,
        categories: FoodsReducer.allCategories,
        user: SignInReducer.user
    }
}

export default withNavigation(connect(mapStateToProps, {getAllCategories, getAllFoods}) (Menu));