import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const Credential = ({prop, value}) =>{
    return{
        type: 'Credential_In',
        payload: {prop,value}
    }
}

export const TryLogin = ({email, password}) =>{
return(dispatch)=>{
    dispatch({type: 'login_started'})
    auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        dispatch({type: 'login_success', payload: user})
    }).catch(()=>{
        dispatch({type: 'login_failed'})
    })
}
}

export const createAccount = ({email, password, City, Address1, Address2, FirstName, LastName, AdminStatus, points = 0}) =>{
    return(dispatch)=>{
        dispatch({type: 'login_started'})
        auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            const {currentUser} = auth(); 
            database().ref(`/users/${currentUser.uid}/Address`).push({City, Address1, Address2, FirstName, LastName, points}).then(() =>{
                database().ref(`/users/${currentUser.uid}/Admin`).push({AdminStatus}).then(() =>{
                    dispatch({type: 'create_account_success'})
                }).catch(() =>{
                    dispatch({type: 'create_account_fail'})
                })
            })
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}

export const createAccount2 = ({email, password, AdminName, AdminStatus}) =>{
    return(dispatch)=>{
        dispatch({type: 'login_started'})
        auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            const {currentUser} = auth();
            database().ref(`/users/${currentUser.uid}/Address`).push({AdminName}).then(() =>{
                database().ref(`/users/${currentUser.uid}/Admin`).push({AdminStatus}).then(() =>{
                    dispatch({type: 'create_account_success'})
                }).catch(() =>{
                    dispatch({type: 'create_account_fail'})
                })
            })
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}

export const signMeOut = () =>{
    return(dispatch)=>{
        auth().signOut().then(() =>{
            dispatch({type: 'sign_me_out_success'})
        }).catch(() =>{
            dispatch({type: 'sign_me_out_fail', payload: 'Sign Out Failed'})
        })
    }
}

export const fetchData = (uid) => {
    return (dispatch)=>{
        database().ref(`/users/${uid}/Address`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_data_success', payload: snapshot.val()})
        })
    }
}

export const fetchAdmin = (uid) => {
    return (dispatch)=>{
        database().ref(`/users/${uid}/Admin`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_admin_success', payload: snapshot.val()})
        })
    }
}

export const EditInfo = ({City, Address1, Address2, FirstName, LastName, uid, points}) =>{
    return(dispatch) =>{
        dispatch({type: 'edit_start'});
        const {currentUser} = auth();
        database().ref(`/users/${currentUser.uid}/Address/${uid}`)
        .set({City, Address1, Address2, FirstName, LastName, points})
        .then(()=>{
            dispatch({type: 'edit_success', payload: 'Changes saved'})
        }).catch(()=>{
            dispatch({type: 'edit_fail', payload: 'Edit Failed '})
        })
    }
}

export const EditInfoAdmin = ({AdminName, uid}) =>{
    return(dispatch) =>{
        dispatch({type: 'edit_start'});
        const {currentUser} = auth();
        database().ref(`/users/${currentUser.uid}/Address/${uid}`)
        .set({AdminName})
        .then(()=>{
            dispatch({type: 'edit_success', payload: 'Edit was successful'})
        }).catch(()=>{
            dispatch({type: 'edit_fail', payload: 'Edit Failed '})
        })
    }
}

export const resetErrorMessage =()=>{
    return(dispatch)=>{
        dispatch({type: 'edit_out', payload: ''});
    }
}