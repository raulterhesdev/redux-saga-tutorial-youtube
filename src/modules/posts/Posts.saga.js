import { takeEvery, all, call, put, takeLeading } from 'redux-saga/effects';
import {
  GET_POSTS,
  getPostsSuccess,
  getPostsFailed,
  ADD_POST,
  addPostFailed,
  addPostSuccess,
} from './Posts.actions';
import { getPosts, addPost } from '../../utils/api';

function* getPostsSaga() {
  try {
    const data = yield call(getPosts);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailed(error.message));
  }
}

function* getPostsWatcher() {
  yield takeEvery(GET_POSTS, getPostsSaga);
}

function* addPostSaga(action) {
  try {
    const data = yield call(addPost, action.payload);
    yield put(addPostSuccess({ ...action.payload, ...data }));
  } catch (error) {
    yield put(addPostFailed(error.message));
  }
}

function* addPostWatcher() {
  yield takeLeading(ADD_POST, addPostSaga);
}

export default function* postsSaga() {
  yield all([getPostsWatcher(), addPostWatcher()]);
}
