import axios from 'axios';
import firebase from 'firebase';
import {Alert} from 'react-native';


export const getAllFoods = () =>{
    return(dispatch)=>{
        axios.get("https://arcane-ocean-58349.herokuapp.com/food?item=fetch_all_foods").then((item) =>{
            dispatch({type: 'assign_all_foods', payload: item.data})
        })
    }
}

export const getAllCategories = () =>{
    return(dispatch)=>{
        axios.get("https://arcane-ocean-58349.herokuapp.com/food?item=fetch_all_categories").then((item) =>{
            dispatch({type: 'assign_all_categories', payload: item.data})
        })
    }
}

export const AddUserFood = (item) =>{
    return(dispatch)=>{
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/MyOrder`).push(item).then(() =>{
            dispatch({type: 'My_Order_Success', payload: "added to your cart"})
        }).catch(() =>{
            dispatch({type: 'My_Order_Fail', payload: "Error adding the item"})
        })
    }
}

export const ResetError =() =>{
    return(dispatch) =>{
        dispatch({type: 'erase_error'})
    }
}

export const fetchMyOrders = (uid) => {
    return async (dispatch)=>{
        firebase.database().ref(`/users/${uid}/MyOrder`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_MyOrder_success', payload: snapshot.val()})
        })
    }
}

export const deleteSingleFood =(uid)=>{
    return async (dispatch)=>{
        const {currentUser} = firebase.auth(); 
        firebase.database().ref(`/users/${currentUser.uid}/MyOrder/${uid}`).remove().then(() =>{
            Alert.alert('Item removed successfully');
        }).catch(() =>{
            Alert.alert('Error removing the item');
        })
    }
}

export const deleteAllCart =()=>{
    return async (dispatch)=>{
        const {currentUser} = firebase.auth(); 
        firebase.database().ref(`/users/${currentUser.uid}/MyOrder`).remove().then(() =>{
            Alert.alert('Cart cleared successfully');
        }).catch(() =>{
            Alert.alert('Error clearing the cart');
        })
    }
}

export const makeOrder=({data, price , deliver, address})=>{
    return(dispatch)=>{
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/orders/AllOrders`).push({data, price , deliver, address}).then(() =>{
            firebase.database().ref(`/users/${currentUser.uid}/MyOrder`).remove();
            Alert.alert('Your order was made successfully');
            dispatch({type: 'order_success'})
        }).catch(()=>{
            Alert.alert('Error making yout order');
            dispatch({type: 'order_fail'})
        })
    }
}
