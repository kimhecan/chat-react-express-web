// 초깃값
const initialState = {
    isLoggedIn: false,
    user: null,
}

//액션이름
export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

//액션생성자
export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    }
}
export const loginAction = (data) => {
    return {
        type: LOG_IN,
        data: data,
    }
}

export const logoutAction = {
    type: LOG_OUT,
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            }
        }
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;