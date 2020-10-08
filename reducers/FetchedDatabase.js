const INITIAL_STATE={
    data: null,
    admin: null,
    allOrders: null,
    allTransactions: null
}

export default (state={INITIAL_STATE}, action)=>{
    if(action.type === 'fetch_data_success'){
        return {...state, data: action.payload}
    }else if(action.type === 'fetch_admin_success'){
        return {...state, admin: action.payload}
    }else if(action.type === "sign_me_out_success"){
        return {...state, ...INITIAL_STATE};
    }else if(action.type === "fetch_AllOrders_Success"){
        return{...state, allOrders:action.payload}
    }else if(action.type === "fetch_AllTransactions_Success"){
        return{...state, allTransactions:action.payload}
    }return state
}