const INITIAL_STATE={
    allFoods: [],
    allCategories: [],
    addError:'',
    totalPrice: 0,
}

export default(state={INITIAL_STATE}, action)=>{
    if(action.type === "assign_all_foods"){
        return {...state, allFoods: action.payload}
    } else if(action.type === "assign_all_categories"){
        return {...state, allCategories: action.payload}
    }else if(action.type === "My_Order_Success" || action.type === "My_Order_Fail" || action.type === 'remove'){
        return{...state, addError: action.payload}
    }else if(action.type === "erase_error"){
        return {...state, addError: ''}
    }
    return state;
}