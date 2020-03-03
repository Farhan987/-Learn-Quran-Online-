import {combineReducers} from 'redux';
import QuranReducer from './auth/quranReducer';
import StudentReducer from './auth/studentReducer';
import TeacherReducer from './auth/teacherReducer';
import QuranContextReducer from './auth/quranNavigator';
const rootReducer = combineReducers({
  QuranReducer,
  StudentReducer,
  TeacherReducer,
  QuranContextReducer,
});
export default rootReducer;
