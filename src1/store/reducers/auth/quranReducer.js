import {
  SHOW_QURAN,
  GET_SURAH_DATA,
  WITHOUT_CLICK,
  SHOW_QURAN_CHAPTER_WISE,
  SET_QURAN_PAGE,
  INITIALIZE_QURAN,
  MARK_AYAH,
  STUDENT_MISTAKE_BY_STATUS,
  JUZ_LIST,
  CHAPTER_LIST,
} from '../../actions/types';

const state = {
  suarhData: [],
  completeSurah: [],
  withoutClick: '',
  pageWiseQuran: [],
  completeQuran: [],
  juzList: [],
  chapterList: [],
};
import PageClass from '../../../businessLogic/pages';
function AppReducer(mState = {...state}, action) {
  switch (action.type) {
    case GET_SURAH_DATA:
      mState.suarhData = [];
      action.payload.forEach(element => {
        mState.suarhData.push(element);
      });
      return clone(mState);
    case SHOW_QURAN:
      mState.completeSurah = [];

      let data = [];
      data = action.payload;
      data.splice(0, 1);

      data.forEach(element => {
        mState.completeSurah.push(element);
      });
      return clone(mState);
    case WITHOUT_CLICK:
      mState.withoutClick = '';
      mState.withoutClick = action.payload;

      return clone(mState);
    case SHOW_QURAN_CHAPTER_WISE:
      mState.completeQuran.push(
        new PageClass().setAyats(action.payload.id, action.payload.pageData),
      );

      return clone(mState);

    case SET_QURAN_PAGE:
      const page = action.payload.pages;
      const mistakes = action.payload.mistakes;

      let pIndex = mState.completeQuran.findIndex(
        q => page.pageNo === q.pageNo,
      );

      if (pIndex >= 0) {
        mState.completeQuran[pIndex] = page;
        AppReducer(mState, {
          type: 'LOAD_MISTAKES_',
          payload: {index: pIndex, mmistakes: mistakes},
        });
      }

      return clone(mState);
    case 'LOAD_MISTAKES_':
      const {index, mmistakes} = action.payload;

      mState.completeQuran[index].singlePage.forEach(ayah => {
        mmistakes.forEach((mistake, index1) => {
          if (ayah.number === mistake.verse) {
            mState.completeQuran[index].singlePage[index1].marked = true;
            mState.completeQuran[index].singlePage[index1].mistake = mistake;
          }
        });
      });
      return clone(mState);
    case INITIALIZE_QURAN:
      mState.completeQuran = action.payload;

      return clone(mState);
    case MARK_AYAH:
      const {pageNo, ayahNo, markedValue} = action.payload;
      const pageIndex = mState.completeQuran.findIndex(
        q => q.pageNo === pageNo,
      );

      if (pageIndex >= 0) {
        const ayahIndex = mState.completeQuran[pageIndex].singlePage.findIndex(
          a => a.number === ayahNo,
        );
        if (ayahIndex >= 0) {
          mState.completeQuran[pageIndex].singlePage[
            ayahIndex
          ].marked = markedValue;
        }
      }
      return clone(mState);
    case STUDENT_MISTAKE_BY_STATUS:
      let mistakeList = action.payload;

      mistakeList.forEach(mistake => {
        let mistakePageIndex = mState.completeQuran.findIndex(
          q => q.pageNo === mistake.chapter,
        );
        if (mistakePageIndex >= 0) {
          let mistakeIndex = mState.completeQuran[
            mistakePageIndex
          ].singlePage.findIndex(a => a.number === mistake.verse);
          if (mistakeIndex >= 0) {
            mState.completeQuran[mistakePageIndex].singlePage[
              mistakeIndex
            ].marked = true;
            mState.completeQuran[mistakePageIndex].singlePage[
              mistakeIndex
            ].mistake = mistake;
          } else {
          }
        }
      });
      return clone(mState);
    case JUZ_LIST:
      mState.juzList = [];
      action.payload.forEach(item => mState.juzList.push(item));

      return clone(mState);
    case CHAPTER_LIST:
      mState.chapterList = [];
      action.payload.forEach(item => mState.chapterList.push(item));

      return clone(mState);
    default:
      return clone(mState);
  }
}
const clone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export default AppReducer;
