import {
  TEACHER_LOGIN,
  TEACHER_SIGNUP,
  STUDENT_REQUEST_STATUS,
  TEACHER_REQUEST_RESPONSE,
  TEACHER_STUDENTS_LIST,
  TEACHER_FRIENDS_PROFILE,
  CREATE_NEW_GROUP,
  TEACHER_CREATED_GROUPS_LIST,
  ADD_STUDENT_TO_GROUP,
  ISSUE_MISTAK_BY_TEACHER,
  UPDATE_MISTAK_BY_TEACHER,
  BACK_FROM_HOME_SCREEN,
  LIST_OF_STUDENT_IN_GROUP,
} from './types';
import {BASE_URL} from '../BASE_URL';
import axios from 'axios';

export const teacherSignUp = (
  fullName,
  userName,
  email,
  password,
  context,
) => dispatch => {
  axios
    .post(BASE_URL + 'teacher/auth/signup', {
      teacher: {fullName, userName, email, password},
    })
    .then(res => {
      context.setState({
        SignUpSuccessFull: res.data.success,
        flag: !res.data.success,
      });
      dispatch({
        type: TEACHER_SIGNUP,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.data);
    });
};
export const teacherLogin = (email, password, context) => dispatch => {
  context.setState({spinnermove: true});
  console.log({email, password});
  axios
    .post(BASE_URL + 'teacher/auth/login', {
      email,
      password,
    })
    .then(res => {
      console.log(res.data);

      dispatch({
        type: TEACHER_LOGIN,
        payload: res.data,
      });
      context.setState({
        SignUpSuccessFull: res.data.success,
        flag: !res.data.success,
        spinnermove: false,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const studentRequestStatus = (
  teacherId,
  requestStatus,
  context,
) => dispatch => {
  context.setState({spinnerMove: true});
  axios
    .post(BASE_URL + 'teacher/request/find-request-where', {
      teacher: teacherId,
      requestStatus,
    })
    .then(res => {
      context.setState({spinnerMove: false});
      dispatch({
        type: STUDENT_REQUEST_STATUS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.res);
    });
};

export const teacherRequestResponse = (
  requestId,
  requestStatus,
) => dispatch => {
  axios
    .post(BASE_URL + 'teacher/request/accept-request', {
      request: {
        _id: requestId,
        requestStatus: requestStatus,
      },
    })
    .then(res => {
      dispatch({
        type: TEACHER_REQUEST_RESPONSE,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const teacherStudentsList = (teacherId, requestStatus) => dispatch => {
  axios
    .post(BASE_URL + 'teacher/request/find-request-where', {
      teacher: teacherId,
      requestStatus,
    })
    .then(res => {
      dispatch({
        type: TEACHER_STUDENTS_LIST,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const getTeacherFriendsProfile = studentId => dispatch => {
  axios
    .post(BASE_URL + 'student/auth/profile', {
      studentId,
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: TEACHER_FRIENDS_PROFILE,
        payload: res.data._data.student,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const createNewGroup = (
  title,
  admin,
  description,
  context,
) => dispatch => {
  axios
    .post(BASE_URL + 'teacher/groups/create-group', {
      group: {
        title: title,
        groupAdmin: admin,
        description: description,
      },
    })
    .then(res => {
      dispatch({
        type: CREATE_NEW_GROUP,
        payload: res.data,
      });
      context.setState({flag: true});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const teacherCreatedGroupsList = (teacherId, context) => dispatch => {
  context.setState({spinnerMove: true});
  axios
    .post(BASE_URL + 'teacher/groups/my-groups', {
      teacherId,
    })
    .then(res => {
      dispatch({
        type: TEACHER_CREATED_GROUPS_LIST,
        payload: res.data._data.groups,
      });
      context.setState({spinnerMove: false});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const addStudentToGroup = (studentId, groupId) => dispatch => {
  axios
    .post(BASE_URL + 'teacher/groups/add-student', {
      studentId,
      groupId,
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_STUDENT_TO_GROUP,
        payload: res.data.msg,
      });
    })
    .catch(err => {
      console.log(err.res.data);
    });
};
// export const issueMistake = (data, context) => dispatch => {

//   const state = {mistake: data};
//   axios
//     .post(BASE_URL + 'teacher/mistake/issue-mistake', state)
//     .then(res => {
//       console.log('console.log');
//       console.log(res.data);

//       dispatch({
//         type: ISSUE_MISTAK_BY_TEACHER,
//         payload: res.data,
//       });
//       if (res.data.success === true) {
//         console.log(context.state.modalVisible);
//         context.setState({modalVisible: false, description: ''});
//       }
//       context.setState({flag: true});
//     })
//     .catch(err => {
//       console.log(err.res.data);
//     });
// };
export const backFromHomeScreen = data => dispatch => {
  dispatch({
    type: BACK_FROM_HOME_SCREEN,
    payload: data,
  });
};

export const updateMistakeStatus = (
  _id,
  mistakeStatus,
  correctionDate,
  context,
) => dispatch => {
  const date = JSON.stringify(correctionDate);
  // console.log(_id);
  // console.log(mistakeStatus);
  // console.log(date);
  axios
    .post(BASE_URL + 'teacher/mistake/update-status', {
      mistake: {_id, mistakeStatus, date},
    })
    .then(res => {
      console.log();
      dispatch({
        type: UPDATE_MISTAK_BY_TEACHER,
        payload: res.data,
      });
      context.setState({flag: true});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const listOfStudentInGroup = data => dispatch => {
  dispatch({
    type: LIST_OF_STUDENT_IN_GROUP,
    payload: data,
  });
};
