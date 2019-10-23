// 초깃값
const initialState = {
  userId: null,
  password:null,
  userName: null,
  click: null,
  isLoggingIn: false,
};

// 액션이름
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const CLICK_BTN = 'CLICK_BTN';
export const CLICK_BTN2 = 'CLICK_BTN2';

// 액션생성자라는 순수함수의  반환을 받아서 리듀서라고 부르는 순수함수로 데이터를 처리힌다



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpData: action.data,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        result: action.data
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        userId: action.data.userId,
        userName: action.data.userName,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        userId: null,
        
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        userId: action.data.userId,
        userName: action.data.userName
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      };
    }

    case CLICK_BTN: {
      return {
        ...state,
        click: true
      }
    }
    case CLICK_BTN2: {
      return {
        ...state,
        click: false
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
