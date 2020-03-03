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
  BACK_FROM_HOME_SCREEN,
  LIST_OF_STUDENT_IN_GROUP,
  STUDENT_NOT_IN_GROUP,
  TEACHER_FRIENDS_PROFILE1,
  STUDENT_ID
} from "../../actions/types";

const state = {
  teacherSignUp: {},
  teacherLogin: {},
  login: {},
  studentRequestList: [],
  requestResponse: {},
  teacherStudents: [],
  teacherFriendsProfile: {},
  createNewGroupResponse: {},
  teacherCreatedGroupsResponse: [],
  addStudentToGroupRes: {},
  issueMistakByTeacherRes: {},
  backFromHomScreenRes: "",
  studentListStatus: false,
  listOfgroupStudents: [],
  studentNotInGroupList: [],
  studentID: "",
  groupID: ""
};
import { AsyncStorage } from "react-native";
function AppReducer(mState = { ...state }, action) {
  switch (action.type) {
    case TEACHER_SIGNUP:
      mState.teacherSignUp = {};
      mState.teacherSignUp = action.payload;
      return clone(mState);

    case TEACHER_LOGIN:
      mState.teacherLogin = {};

      if (action.payload.success === true) {
        AsyncStorage.setItem(
          "Login",
          JSON.stringify(action.payload)
        ).then(user => console.log("Done"));
      }
      mState.teacherLogin = action.payload;
      return clone(mState);
    case STUDENT_REQUEST_STATUS:
      mState.studentRequestList = [];
      action.payload.requestList.forEach(element => {
        mState.studentRequestList.push(element);
      });
      return clone(mState);
    case STUDENT_NOT_IN_GROUP:
      mState.studentNotInGroupList = [];

      action.payload.requestList.forEach(element => {
        mState.studentNotInGroupList.push(element);
      });

      return clone(mState);
    case TEACHER_REQUEST_RESPONSE:
      mState.requestResponse = action.payload;
      let filterRequest = mState.studentRequestList.filter(
        list => list._id !== action.payload.request._id
      );
      mState.studentRequestList = filterRequest;
      return clone(mState);

    case TEACHER_STUDENTS_LIST:
      mState.teacherStudents = [];
      mState.studentListStatus = action.payload.success;
      action.payload.requestList.forEach(element => {
        mState.teacherStudents.push(element);
      });
      return clone(mState);

    case TEACHER_FRIENDS_PROFILE:
      mState.teacherFriendsProfile = {};
      let stdId = action.payload._id;

      const index00 = mState.teacherStudents.findIndex(
        ts => ts.student === stdId
      );
      if (index00 >= 0) {
        mState.teacherStudents[index00].student = action.payload;
      }

      return clone(mState);
    case TEACHER_FRIENDS_PROFILE1:
      let stdId1 = action.payload._id;

      const index000 = mState.studentNotInGroupList.findIndex(
        ts => ts.student === stdId1
      );
      if (index000 >= 0) {
        mState.studentNotInGroupList[index000].student = action.payload;
      }

      return clone(mState);

    case CREATE_NEW_GROUP:
      mState.createNewGroupResponse = {};
      mState.createNewGroupResponse = action.payload;
      mState.teacherCreatedGroupsResponse.push(action.payload._data.group);
      return clone(mState);

    case TEACHER_CREATED_GROUPS_LIST:
      mState.teacherCreatedGroupsResponse = [];

      action.payload.forEach(item =>
        mState.teacherCreatedGroupsResponse.push(item)
      );
    case STUDENT_ID:
      mState.studentID = "";
      mState.studentID = action.payload;

      return clone(mState);
    case ADD_STUDENT_TO_GROUP:
      const groups1 = mState.studentNotInGroupList.filter(
        list => action.payload.studentID === list.student._id
      );

      const groups = mState.studentNotInGroupList.filter(
        list => action.payload.studentID !== list.student._id
      );
      mState.studentNotInGroupList = [];
      groups.forEach(element => {
        mState.studentNotInGroupList.push(element);
      });

      groups1.forEach(element => {
        mState.listOfgroupStudents.push(element);
      });
      // mState.studentNotInGroupList = groups;
      // mState.studentRequestList = groups;
      mState.addStudentToGroupRes = {};
      mState.addStudentToGroupRes = action.payload;
      return clone(mState);
    case ISSUE_MISTAK_BY_TEACHER:
      mState.issueMistakByTeacherRes = {};
      mState.issueMistakByTeacherRes = action.payload;
      return clone(mState);
    case BACK_FROM_HOME_SCREEN:
      mState.backFromHomScreenRes = "";

      mState.backFromHomScreenRes = action.payload;
      return clone(mState);
    case LIST_OF_STUDENT_IN_GROUP:
      mState.listOfgroupStudents = [];
      mState.groupID = action.payload.groupID;

      action.payload.stdList.map(element =>
        mState.listOfgroupStudents.push(element)
      );
      console.log(mState.listOfgroupStudents);

      return clone(mState);

    default:
      return clone(mState);
  }
}

const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AppReducer;
