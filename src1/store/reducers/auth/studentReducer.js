import {
  STUDENT_LOGIN,
  STUDENT_SIGNUP,
  STUDENT_REQUEST_TEACHER,
  SEARCH_TEACHER,
  GET_STUDENT_PROFILE,
  STUDENT_MISTAKE_BY_STATUS,
  STUDENT_MISTAKE_BY_CHAPTER,
  UPDATE_MISTAK_BY_TEACHER,
  USER_DATA,
} from '../../actions/types';
import {AsyncStorage} from 'react-native';
const state = {
  studentSignUp: {},
  studentLogin: {},
  searchTeacher: {},
  sendRequestToTeacher: {},
  studentProfile: {},
  studentMistakeStatusListRes: [],
  studentMistakeChapterListRes: [],
  upDateStatus: {},
  userData: {},
};

function studentReducer(mState = {...state}, action) {
  switch (action.type) {
    case STUDENT_SIGNUP:
      mState.userData = {};
      mState.userData = action.payload;
      console.log(action.payload);
      return clone(mState);
    case STUDENT_SIGNUP:
      mState.studentSignUp = {};
      mState.studentSignUp = action.payload;
      return clone(mState);

    case STUDENT_LOGIN:
      mState.studentLogin = {};
      if (action.payload.success === true) {
        AsyncStorage.setItem('Login', JSON.stringify(action.payload)).then(
          user => console.log(user),
        );
      }
      mState.studentLogin = action.payload;
      return clone(mState);

    case SEARCH_TEACHER:
      mState.searchTeacher = {};
      mState.searchTeacher = action.payload;
      return clone(mState);

    case STUDENT_REQUEST_TEACHER:
      mState.sendRequestToTeacher = {};
      mState.sendRequestToTeacher = action.payload;
      return clone(mState);

    case GET_STUDENT_PROFILE:
      mState.studentProfile = {};
      mState.studentProfile = action.payload;
      return clone(mState);

    case STUDENT_MISTAKE_BY_STATUS:
      mState.studentMistakeStatusListRes = [];
      action.payload.forEach(element => {
        mState.studentMistakeStatusListRes.push(element);
      });
      return clone(mState);

    case STUDENT_MISTAKE_BY_CHAPTER:
      mState.studentMistakeChapterListRes = [];
      action.payload.forEach(element => {
        mState.studentMistakeChapterListRes.push(element);
      });
      return clone(mState);
    case UPDATE_MISTAK_BY_TEACHER:
      // mState.studentRequestList = {};
      console.log(action.payload.msg);

      mState.studentMistakeStatusListRes = mState.studentMistakeStatusListRes.filter(
        list => list._id !== action.payload._data.mistake._id,
      );
      mState.upDateStatus = action.payload.msg;
      return clone(mState);
    default:
      return clone(mState);
  }
}
const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default studentReducer;
