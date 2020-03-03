import {
  STUDENT_LOGIN,
  STUDENT_SIGNUP,
  SEARCH_TEACHER,
  STUDENT_REQUEST_TEACHER,
  GET_STUDENT_PROFILE,
  STUDENT_MISTAKE_BY_STATUS,
  STUDENT_MISTAKE_BY_CHAPTER,
  USER_DATA,
} from './types';
import {BASE_URL} from '../BASE_URL';
import axios from 'axios';
export const studentSignUp = (
  fullName,
  userName,
  email,
  password,
  context,
) => dispatch => {
  axios
    .post(BASE_URL + 'student/auth/signup', {
      student: {fullName, userName, email, password},
    })
    .then(res => {
      context.setState({
        SignUpSuccessFull1: res.data.success,
        flag1: !res.data.success,
      });
      dispatch({
        type: STUDENT_SIGNUP,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const studentLogin = (email, password, context) => dispatch => {
  axios
    .post(BASE_URL + 'student/auth/login', {
      email,
      password,
    })
    .then(res => {
      context.setState({
        SignUpSuccessFull1: res.data.success,
        flag1: !res.data.success,
      });
      dispatch({
        type: STUDENT_LOGIN,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.data);
    });
};
export const searchTeacher = userName => dispatch => {
  axios
    .post(BASE_URL + 'teacher/auth/search', {
      userName,
    })
    .then(res => {
      dispatch({
        type: SEARCH_TEACHER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.data);
    });
};

export const sendRequestToTeacher = (requestData, context) => dispatch => {
  axios
    .post(BASE_URL + 'student/request/send-request', {
      request: requestData,
    })
    .then(res => {
      dispatch({
        type: STUDENT_REQUEST_TEACHER,
        payload: res.data,
      });

      context.setState({flag: true});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const getStudentProfile = studentId => dispatch => {
  axios
    .post(BASE_URL + 'student/auth/profile', {
      studentId,
    })
    .then(res => {
      dispatch({
        type: GET_STUDENT_PROFILE,
        payload: res.data._data.student,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};
export const getMistakeByStatus = (studentId, Status, context) => dispatch => {
  context.setState({spinnerMove: true});
  axios
    .post(BASE_URL + 'student/mistake/get-mistakes', {
      mistake: {student: studentId, mistakeStatus: Status},
    })
    .then(res => {
      // console.log(res.data);
      context.setState({spinnerMove: false});
      dispatch({
        type: STUDENT_MISTAKE_BY_STATUS,
        payload: res.data._data.mistakes,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};
export const getMistakeByChapter = (studentId, Status, chapter) => dispatch => {
  axios
    .post(BASE_URL + 'student/mistake/get-mistakes-by-chapter', {
      mistake: {student: studentId, mistakeStatus: Status, chapter: chapter},
    })
    .then(res => {
      dispatch({
        type: STUDENT_MISTAKE_BY_CHAPTER,
        payload: res.data._data.mistakes,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};
export const userData = data => dispatch => {
  dispatch({
    type: USER_DATA,
    payload: data,
  });
};
