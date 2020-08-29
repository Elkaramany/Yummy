export default (state={}, action)=>{
    if(action.type === 'fetch_MyOrder_success'){
        return action.payload
    }else if(action.type === "sign_me_out_success"){
        return state={};
    }return state
}