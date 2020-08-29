const INITIAL_STATE={
    email: '',
    password: '',
    FirstName: '',
    LastName: '',
    user: null,
    errorMessage: '',
    loading: false,
    City: '',
    Address1: '',
    Address2: '',
    AdminToken: '',
    AdminName: '',
    uid: '',
    EditLoading: false,
    navigated: false,
}

export default (state={INITIAL_STATE}, action)=>{
    if(action.type === 'Credential_In'){
        return{...state, [action.payload.prop] : action.payload.value}
    }else if (action.type === 'login_success'){
        return {...state, ...INITIAL_STATE, user: action.payload}
    }else if(action.type === 'login_failed'){
        return{...state, ...INITIAL_STATE, loading: false, errorMessage: 'Email or password is incorrect'}
    }else if(action.type === 'create_account_success'){
        return {...state, ...INITIAL_STATE, loading: false, errorMessage: "Account created successfully, Please login"}
    }else if (action.type === 'create_account_fail'){
        return {...state, ...INITIAL_STATE, loading: false, errorMessage: 'Failed to create account with those credentials, Please try again with different ones!!'}
    }else if(action.type === 'login_started'){
        return{...state, loading: true}
    }else if(action.type === "edit_success" || action.type === "edit_fail" || action.type === 'sign_me_out_fail'){
        return{...state, EditLoading: false, errorMessage: action.payload}
    }else if(action.type === "edit_start"){
        return {...state, EditLoading: true}
    }else if(action.type === "sign_me_out_success"){
        return{...state, ...INITIAL_STATE}
    }
    return state;
}