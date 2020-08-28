export default (state={}, action)=>{
    if(action.type === 'fetch_data_success'){
        return action.payload
    }return state
}