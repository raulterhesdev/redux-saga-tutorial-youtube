import {
  all,
  take,
  put,
  call,
  race,
  delay,
  fork,
  spawn,
  cancel,
} from 'redux-saga/effects';
import {
  AUTH_START,
  authSuccess,
  authFail,
  LOGOUT_START,
  logoutSuccess,
  logoutFail,
} from './Auth.actions';
import { registerUser, loginUser, logoutUser } from '../../utils/api';

function* authenticate({ email, password, isRegister }) {
  try {
    let data;
    if (isRegister) {
      data = yield call(registerUser, { email, password });
    } else {
      data = yield call(loginUser, { email, password });
    }
    yield put(authSuccess(data.user));
    return data.user.uid;
  } catch (error) {
    yield put(authFail(error.message));
  }
}

// function* authenticate({ email, password, isRegister }) {
//   try {
//     let data;
//     if (isRegister) {
//       data = yield call(registerUser, { email, password });
//       yield put(authSuccess(data.user));
//       return data.user.uid;
//     } else {
//       const { userData, timeout } = yield race({
//         userData: call(loginUser, { email, password }),
//         timeout: delay(1000),
//       });

//       if (userData) {
//         yield put(authSuccess(userData.user));
//         return userData.user.uid;
//       } else {
//         yield put(authFail('The request took too long and it was canceled'));
//       }
//     }
//   } catch (error) {
//     yield put(authFail(error.message));
//   }
// }

function* logout() {
  try {
    yield call(logoutUser);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFail());
  }
}

function* throwErrorSaga() {
  yield delay(1000);
  yield call(() => {
    throw Error('Random Error');
  });
}

function* longRunningYield() {
  yield delay(5000);
  yield console.log('Hi ');
}

function* authFlow() {
  while (true) {
    const { payload } = yield take(AUTH_START);
    const uid = yield call(authenticate, payload);
    const forkedTask = yield fork(longRunningYield);
    yield spawn(throwErrorSaga);
    if (uid) {
      yield take(LOGOUT_START);
      yield call(logout);
      yield cancel(forkedTask);
    }
  }
}

export default function* () {
  yield all([authFlow()]);
}
