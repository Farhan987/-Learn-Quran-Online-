import {INIT_QURAN_CONTEXT} from '../../actions/types';

const state = {
  context: null,
};

const quranNavigatorReducer = (mState = state, action) => {
  switch (action.type) {
    case INIT_QURAN_CONTEXT:
      mState.context = action.payload;

      return mState;
    default:
      return mState;
  }
};

export default quranNavigatorReducer;
