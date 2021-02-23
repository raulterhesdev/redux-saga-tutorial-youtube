// export default function* () {
//   console.log('I am redux-saga');
// }

import { all } from 'redux-saga/effects';
import postsSaga from '../modules/posts/Posts.saga';

export default function* () {
  yield all([postsSaga()]);
}
