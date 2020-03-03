import {
  SHOW_QURAN,
  GET_SURAH_DATA,
  WITHOUT_CLICK,
  SHOW_QURAN_CHAPTER_WISE,
  SET_QURAN_PAGE,
  INITIALIZE_QURAN,
  MARK_AYAH,
  JUZ_LIST,
  CHAPTER_LIST,
  INIT_QURAN_CONTEXT,
} from './types';
import {BASE_URL} from '../BASE_URL';
import axios from 'axios';
import QuranPages from '../../businessLogic/pages';

export const getSurahData = (chapter, context) => dispatch => {
  context.setState({spinnerMove: true});
  axios
    .post(BASE_URL + 'quran/get-meta', {chapter})
    .then(res => {
      dispatch({
        type: GET_SURAH_DATA,
        payload: res.data.meta,
      });
      context.setState({spinnerMove: false});
    })
    .catch(err => {
      console.log(err.data);
    });
};
export const showQuran = (verse, chapter) => dispatch => {
  axios
    .post(BASE_URL + 'quran/get-verses', {verse, chapter})
    .then(res => {
      dispatch({
        type: SHOW_QURAN,
        payload: res.data.verse,
      });
    })
    .catch(err => {
      console.log(err.data);
    });
};
export const WithoutClick = data => dispatch => {
  dispatch({
    type: WITHOUT_CLICK,
    payload: data,
  });
};
export const showQuarnPageWise = startPageNo => dispatch => {
  axios
    .get(
      'https://search-quran.herokuapp.com/quran/search/page/' +
        startPageNo +
        '',
    )
    .then(res => {
      // console.log(res.data);

      dispatch({
        type: SHOW_QURAN_CHAPTER_WISE,
        payload: {id: startPageNo, pageData: res.data.ayahs},
      });
    })
    .catch(err => {
      console.log(err);
    });
};
// export const showQuarnPageWise = COMPLETE_QURAN => dispatch => {
//   dispatch({
//     type: SHOW_QURAN_CHAPTER_WISE,
//     payload: COMPLETE_QURAN,
//   });
// };

let ayahs = [
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e2687a3680db71f04cfc5f4',
    number: 1,
    text: '\ufeffبِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    numberInSurah: 1,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
    isSurahStart: true,
    isJuzStart: true,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a15fa2602d3548447a95',
    number: 2,
    text: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
    numberInSurah: 2,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a15fa2602d3548447a94',
    number: 3,
    text: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    numberInSurah: 3,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a15fa2602d3548447a93',
    number: 4,
    text: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
    numberInSurah: 4,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a15fa2602d3548447a91',
    number: 5,
    text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    numberInSurah: 5,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a160a2602d3548447a96',
    number: 6,
    text: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    numberInSurah: 6,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
  },
  {
    surah: {
      number: 1,
      name: 'سُورَةُ ٱلْفَاتِحَةِ',
      englishName: 'Al-Faatiha',
      englishNameTranslation: 'The Opening',
      revelationType: 'Meccan',
      numberOfAyahs: 7,
    },
    _id: '5e26a15fa2602d3548447a92',
    number: 7,
    text:
      'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
    numberInSurah: 7,
    juz: 1,
    manzil: 1,
    page: 1,
    ruku: 1,
    hizbQuarter: 1,
    sajda: false,
    __v: 0,
    isLastRukuhAyat: true,
  },
];

export const loadQuranPage = (pageNo, mistakes) => dispatch => {
  // const state = {
  //   type: SET_QURAN_PAGE,
  //   payload: {
  //     pages: new QuranPages().setAyats(pageNo, ayahs),
  //     mistakes: mistakes,
  //   },
  // };
  // dispatch(state);
  axios
    .get(`https://search-quran.herokuapp.com/quran/search/page/${pageNo}`)
    .then(res => {
      const state = {
        type: SET_QURAN_PAGE,
        payload: {
          pages: new QuranPages().setAyats(pageNo, res.data.ayahs),
          mistakes: mistakes,
        },
      };
      dispatch(state);
    })
    .catch(err => {
      console.log(err);
    });
};

export const initializePages = () => dispatch => {
  let pages = [];
  for (let index = 1; index <= 10; index++) {
    pages.push(new QuranPages().setPage(index));
  }
  console.log(pages);
  dispatch({
    type: INITIALIZE_QURAN,
    payload: pages,
  });
};

export const markAyah = (
  pageNo,
  ayahNo,
  markedValue,
  data,
  context,
) => dispatch => {
  const state = {mistake: data};
  console.log(state);
  axios
    .post(BASE_URL + 'teacher/mistake/issue-mistake', state)
    .then(res => {
      console.log(res.data);
      context.HideModal();
      context.setState({modalVisible: false, description: ''});
      const state = {
        type: MARK_AYAH,
        payload: {pageNo: pageNo, ayahNo: ayahNo, markedValue: markedValue},
      };
      dispatch(state);
      context.setState({flag: true});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const juzList = () => dispatch => {
  axios
    .get('https://search-quran.herokuapp.com/quran/search/juz')
    .then(res => {
      const state = {
        type: JUZ_LIST,
        payload: res.data.juzList,
      };
      dispatch(state);
      context.setState({flag: true});
    })
    .catch(err => {
      console.log(err.res.data);
    });
};
export const chapterList = () => dispatch => {
  axios
    .get('https://search-quran.herokuapp.com/quran/search/chapter')
    .then(res => {
      const state = {
        type: CHAPTER_LIST,
        payload: res.data.surahList,
      };
      dispatch(state);
    })
    .catch(err => {
      console.log(err.res.data);
    });
};

export const initQuranContext = context => dispatch => {
  const state = {
    type: INIT_QURAN_CONTEXT,
    payload: context,
  };
  dispatch(state);
};
