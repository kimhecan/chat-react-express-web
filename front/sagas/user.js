import { all, delay, fork, put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
         SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
         LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
         LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE
         } from '../reducers/user';

axios.defaults.baseURL = 'http://localhost:3065/api';


function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}


function* signUp(action) { //action에 id, password, name이 들어있음
    try {
        const result = yield call(signUpAPI, action.data); //call이 첫번째는 함수고 두번째는 인자(action.data를 넣어주면 signUpAPI에 인자 signUpData로 전달됨
        if(typeof result.data === 'string') {
            return alert(result.data);
        }
        yield alert('가입이 완료되었습니다.');
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data
        });
        
        
        
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        })
        
    }
}

function signUpAPI(signUpData) {  
    return axios.post('/user/', signUpData);
}


// 1번액션이 발생했는지 지켜보다가 발생하면 login함수 실행
function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login); //해당 액션이 dispatch되면 제너레이터를 next()하는 이펙트
}


// 2번 대기후 LOGIN성공 액션을 실행한다.
function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        console.log(result.data);
        
        yield put({
            type: LOG_IN_SUCCESS,
            result: result.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

// 3번 서버에 요청을 보낸다.
function loginAPI(loginData) {
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    });
}


function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}


function* logOut() {
    try {
      yield call(logOutAPI);
      yield put({ // put은 dispatch 동일
        type: LOG_OUT_SUCCESS,
      });
    } catch (e) { // loginAPI 실패
      console.error(e);
      yield put({
        type: LOG_OUT_FAILURE,
        error: e,
      });
    }
  }

function logOutAPI() {
    // 서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
      withCredentials: true,
    });
}



function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}


function* loadUser() {
    try {
      const result = yield call(loadUserAPI);
      yield put({ // put은 dispatch 동일
        type: LOAD_USER_SUCCESS,
        data: result.data,
      });
    } catch (e) { // loginAPI 실패
      console.error(e);
      yield put({
        type: LOAD_USER_FAILURE,
        error: e,
      });
    }
  }

function loadUserAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/user/',{
      withCredentials: true,
    });
}


export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
    ])
}