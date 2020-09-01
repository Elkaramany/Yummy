import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import FetchedDatabase from './FetchedDatabase';
import FoodsReducer from './FoodsReducer';
import FetchedOrders from './FetchedOrders';
import CardReducer from './CardReducer';

export default combineReducers({
    SignInReducer,
    FetchedDatabase,
    FoodsReducer,
    FetchedOrders,
    CardReducer,
})