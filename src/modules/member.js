import { createAction, handleActions } from 'redux-actions'

const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER"
const SET_USER_STATUS = "user/USER_STATUS"

export const setPreviousUrl = createAction(SET_PREVIOUS_URL, (previousUrl) => previousUrl);
export const setUser = createAction(SET_USER, (currentUser) => currentUser);
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin);

const UserInitialValue = {
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
        memberPoint : 0,
        memberAdmin : 0,
        memberCreateDate : "",
        memberTermServiceAgree : 0,
        memberTermInformationAgree : 0,
        memberTermLocationAgree : 0,
        memberTermPromotionAgree : 0,
        memberProvider : "",
    },
    isLogin : false,
    previousUrl : "",
};
 
const member = handleActions({

    [SET_PREVIOUS_URL] : (state = UserInitialValue, action) => ({...state, previousUrl: action.payload}),
    [SET_USER] : (state = UserInitialValue, action) => ({...state, currentUser: action.payload}),
    [SET_USER_STATUS] : (state = UserInitialValue, action) => ({...state, isLogin: action.payload})

}, UserInitialValue );

export default member;
