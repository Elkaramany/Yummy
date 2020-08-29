import firebase from 'firebase';

export const Credential = ({prop, value}) =>{
    return{
        type: 'Credential_In',
        payload: {prop,value}
    }
}

export const TryLogin = ({email, password}) =>{
return(dispatch)=>{
    dispatch({type: 'login_started'})
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        dispatch({type: 'login_success', payload: user})
    }).catch(()=>{
        dispatch({type: 'login_failed'})
    })
}
}

export const createAccount = ({email, password, City, Address1, Address2, FirstName, LastName, AdminStatus}) =>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (user)=>{
            const {currentUser} = await firebase.auth();
            firebase.database().ref(`/users/${currentUser.uid}/Address`).push({City, Address1, Address2, FirstName, LastName, AdminStatus}).then(() =>{
                dispatch({type: 'create_account_success', payload: user})
            })
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}

export const createAccount2 = ({email, password, AdminName, AdminStatus}) =>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (user)=>{
            const {currentUser} = await firebase.auth();
            firebase.database().ref(`/users/${currentUser.uid}/Address`).push({AdminName, AdminStatus}).then(() =>{
                dispatch({type: 'create_account_success', payload: user})
            })
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}

export const signMeOut = () =>{
    return(dispatch)=>{
        firebase.auth().signOut().then(() =>{
            dispatch({type: 'sign_me_out_success'})
        }).catch(() =>{
            dispatch({type: 'sign_me_out_fail', payload: 'Sign Out Failed'})
        })
    }
}

export const fetchData = () => {
    return async (dispatch)=>{
        const {currentUser} = firebase.auth(); 
        firebase.database().ref(`/users/${currentUser.uid}/Address`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_data_success', payload: snapshot.val()})
        })
    }
}

export const EditInfo = ({City, Address1, Address2, FirstName, LastName, AdminStatus, uid}) =>{
    return(dispatch) =>{
        dispatch({type: 'edit_start'});
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/Address/${uid}`)
        .set({City, Address1, Address2, FirstName, LastName, AdminStatus})
        .then(()=>{
            dispatch({type: 'edit_success', payload: 'Edit was successful'})
        }).catch(()=>{
            dispatch({type: 'edit_fail', payload: 'Edit Failed '})
        })
    }
}

export const EditInfoAdmin = ({AdminName, AdminStatus, uid}) =>{
    return(dispatch) =>{
        dispatch({type: 'edit_start'});
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/Address/${uid}`)
        .set({AdminName, AdminStatus})
        .then(()=>{
            dispatch({type: 'edit_success', payload: 'Edit was successful'})
        }).catch(()=>{
            dispatch({type: 'edit_fail', payload: 'Edit Failed '})
        })
    }
}