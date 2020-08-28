export default (state={}, action)=>{
    if(action.type === 'fetch_MyOrder_success'){
        return action.payload
    }return state
}