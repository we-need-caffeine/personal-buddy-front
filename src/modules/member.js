import { createAction, handleActions } from 'redux-actions'

const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER"
const SET_USER_STATUS = "user/USER_STATUS"

export const setPreviousUrl = createAction(SET_PREVIOUS_URL, (previousUrl) => previousUrl);
export const setUser = createAction(SET_USER, (curruentUser) => curruentUser);
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin);

const userInitalValue = {
    currentUser : {
        id : 0,
        memberEmail : "",
        memberPassword : "",
        memberName : "",
        memberBirth : "",
        memberGender : "",
        memberPhone : "",
        memberNickName : "",
        memberStatusMessage : "",
        memberImgName : "",
        memberImgPath : "",
        memberPoint : "",
        memberAdmin : "",
        memberCreateDate : "",
        memberTermServiceAgree : "",
        memberTermInformationAgree : "",
        memberTermLocationAgree : "",
        memberTermPromotionAgree : "",
        memberProvider : "",
    },
    isLogin : false,
    previousUrl : "",
};
 
const member = handleActions({

    [SET_PREVIOUS_URL] : (state , action) => ({...state, previousUrl: action.payload}),
    [SET_USER] : (state, action) => ({...state, currentUser: action.payload}),
    [SET_USER_STATUS] : (state, action) => ({...state, isLogin: action.payload})

}, userInitalValue );

export default member;
