const INITIAL_STATE={
    Number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
}

export default (state={INITIAL_STATE}, action)=>{
    if(action.type === 'Credential_In_Card'){
        return{...state, [action.payload.prop] : action.payload.value}
    }
    return state;
}