import produce from "immer";

export const initialState = {
    user:null,
    signUpFailReason = "",
    isSignedUpSuccess = false,
    isSigningUp = false
}

export const SIGN_UP_REQUEST ="SIGN_UP_REQUEST"; 
export const SIGN_UP_SUCCESS ="SIGN_UP_SUCCESS"; 
export const SIGN_UP_FAILURE ="SIGN_UP_FAILURE"; 

export default (state=initialState,action) =>{
    return produce(state,draft=> {
        switch(action.type){
            case SIGN_UP_REQUEST: {
                draft.isSigningUp = false,
                draft.isSigningUp = true,
                draft.signUpFailReason = "";
            }
            case SIGN_UP_SUCCESS: {
                draft.isSigningUp = false,
                draft.isSignedUpSuccess = trues;
                draft.signUpFailReason = "";
            }
            case SIGN_UP_FAILURE: {
                draft.isSigningUp = false,
                draft.isSignedUpSuccess = false,
                draft.signUpFailReason = action.data;
            }
            
        }
    })
}