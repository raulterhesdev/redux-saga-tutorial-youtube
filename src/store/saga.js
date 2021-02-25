import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/Auth.saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
