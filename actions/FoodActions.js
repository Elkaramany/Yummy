import axios from 'axios';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
import {API} from '@env'

export const fetchAll = ()=>{
    return(dispatch)=>{
        getAllFoods(dispatch);
        getAllCategories(dispatch);
        getAllSides(dispatch);
        getAllDressings(dispatch);
    }
}

const getAllFoods = (dispatch) =>{
    axios.get(`${API}/food/fetch_all_foods`).then((item) =>{
        dispatch({type: 'assign_all_foods', payload: item.data})
    })
}

const getAllCategories = (dispatch) =>{
    axios.get(`${API}/food/fetch_all_categories`).then((item) =>{
        dispatch({type: 'assign_all_categories', payload: item.data})
    })
}

const getAllSides = (dispatch) =>{
    axios.get(`${API}/food/fetch_all_sides`).then((item) =>{
        dispatch({type: 'assign_all_sides', payload: item.data})
    })
}
const getAllDressings = (dispatch) =>{
    axios.get(`${API}/food/fetch_all_dressings`).then((item) =>{
        dispatch({type: 'assign_all_dressings', payload: item.data})
    })
}

export const AddUserFood = (item) =>{
    return(dispatch)=>{
        const {currentUser} = auth();
        database().ref(`/users/${currentUser.uid}/MyOrder`).push(item).then(() =>{
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
        database().ref(`/users/${uid}/MyOrder`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_MyOrder_success', payload: snapshot.val()})
        })
    }
}

export const deleteSingleFood =(uid)=>{
    return async (dispatch)=>{
        const {currentUser} = auth(); 
        database().ref(`/users/${currentUser.uid}/MyOrder/${uid}`).remove().catch(() =>{
            Alert.alert('Error removing the item');
        })
    }
}

export const deleteAllCart =()=>{
    return async (dispatch)=>{
        const {currentUser} = auth(); 
        database().ref(`/users/${currentUser.uid}/MyOrder`).remove().catch(() =>{
            Alert.alert('Error clearing the cart');
        })
    }
}

export const makeOrder=({data, navigatedPrice, deliver, address, method, fullDate, region, points, pointsUID, status=''})=>{
    return(dispatch)=>{
        const {currentUser} = auth();
        database().ref(`/orders/AllOrders`).push({data, navigatedPrice , deliver, address, method, fullDate, region, status}).then(() =>{
            Alert.alert('Your order was made successfully');
            database().ref(`/users/${currentUser.uid}/MyOrder`).remove();
            let finalPoint = Math.floor(navigatedPrice / 1000);
            finalPoint += points;
            database().ref(`/users/${currentUser.uid}/Address/${pointsUID}/points`).set(finalPoint);
            dispatch({type: 'My_Order_Success', payload: ''})
        }).catch(()=>{
            Alert.alert('Error confirming order');
        })
    }
}

export const fetchAllOrders =()=>{
    return(dispatch)=>{
        database().ref(`/orders/AllOrders`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_AllOrders_Success', payload: snapshot.val()})
        })
    }
}

export const fetchAllTransactions =()=>{
    return(dispatch)=>{
        database().ref(`/orders/History`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_AllTransactions_Success', payload: snapshot.val()})
        })
    }
}

export const OrderFinished =(uid)=>{
    return async (dispatch)=>{
        database().ref(`/orders/AllOrders/${uid}`).remove();
    }
}

export const Transaction=(order)=>{
    return(dispatch)=>{
        database().ref(`/orders/AllOrders/${order.uid}`).remove().then(() =>{
            database().ref(`/orders/History`).push(order)
        }).catch(() =>{
            Alert.alert("Error in completing this process")
        })
    }
}
