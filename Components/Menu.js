import  React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {fetchAll} from '../actions';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet'
import {Colors} from './Colors';
import Spinner from './common/Spinner';
import {withNavigation} from 'react-navigation';

function Menu(props){

    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        props.fetchAll();
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
                    <Text style={[styles.categoryStyle, {color: Colors.mainHeader, textAlign: 'center'}]}>
                        Login Here for more of Yummy n Fresh
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    if(loaded){     
        return(
            <View style={{flex: 1, backgroundColor: Colors.mainBackGround, marginBottom: 10}}>
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
        alignSelf: 'center',
        color: Colors.mainFooter,
        textAlign: 'center'
    },imageDims:{
        height: '120rem',
        width: '120rem',
        borderRadius: '20rem',
    },catTitle:{
        fontSize: '12rem',
        color: Colors.mainForeGround,
        alignSelf: 'center'
    },singleItemContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3rem'
    }
})

const mapStateToProps =({FoodsReducer, SignInReducer}) =>{
    return{
        foods: FoodsReducer.allFoods,
        categories: FoodsReducer.allCategories,
        user: SignInReducer.user
    }
}

export default withNavigation(connect(mapStateToProps, {fetchAll}) (Menu));