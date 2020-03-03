import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  showQuran,
  getSurahData,
  showQuarnPageWise,
  loadQuranPage,
  markAyah,
} from '../../store/actions/quranAction';
import {connect} from 'react-redux';
import {ArabicNumbers} from 'react-native-arabic-numbers';
class QuranPage extends Component {
  state = {
    verse: [
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ' +
        '(1111) ',
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ' +
        '(1112) ',
      ,
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ' +
        '(1113) ',
      ,
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ' +
        '(1114) ',
      ,
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ' +
        '(1115) ',
    ],
    lines: [],
    fontSize: 18,
  };
  componentDidMount() {
    console.log('123');
    // console.log('mounting page');
    //// MISTAKE LIST
    let mistakes = this.props.mistakList;
    this.props.loadQuranPage(this.props.page.pageNo, mistakes);
    /// mistakes
  }

  /////// LOGIC FUNCTIONS //////////
  getAvailableAyahNo = text => {
    let ayah = '';
    let ayahNos = [];
    for (let index = text.length - 1; index >= 0; index--) {
      if (text[index] === '(') {
        ayahNos.push(ayah.trimEnd().trimStart());
        ayah = '';
      } else if (text[index] === ')') {
        ayahNos.push(ayah.trimEnd().trimStart());
        ayah = '';
      } else {
        ayah = text[index] + ayah;
      }
      // else if (text[index] === ' ' && ayah.length > 0) {
      //   ayahNos.push(ayah);
      //   ayah = '';
      // }
    }
    console.log('========');
    console.log(this.props.page.pageNo);
    console.log(ayahNos);
    return ayahNos;
  };

  onTextLayout = ({nativeEvent: {lines}}) => {
    let pageLines = [];
    if (lines.length > 0) {
      this.handleScroll();
      for (let index = 0; index < lines.length; index++) {
        const sLine = lines[index];
        pageLines.push({
          no: index + 1,
          ayahs: this.getAvailableAyahNo(sLine.text),
          isRuku: false,
          isSajda: false,
        });
      }
      this.setState({lines: pageLines}, () => {
        if (pageLines.length > 0) {
          let meta = this.getMetaData();

          this.setRukuAyah(meta.rukuAyahNos);
        }
      });
    }
  };

  setRukuAyah = ayahsNos => {
    let lines = [...this.state.lines];
    console.log('=====Lines=====');
    console.log(lines);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (line.ayahs.length === 1) {
        for (let index1 = 0; index1 < ayahsNos.length; index1++) {
          // const aNo = ayahsNos[index1].numberInSurah;
          const aNo = ArabicNumbers(ayahsNos[index1].number);
          if (line.ayahs[0] == aNo) {
            lines[index].isRuku = true;
            lines[index].no = ayahsNos[index1].rNumber;
            break;
          }
        }
      } else {
        for (let index1 = 0; index1 < ayahsNos.length; index1++) {
          // const a = ayahsNos[index1].numberInSurah;
          const a = ArabicNumbers(ayahsNos[index1].number);
          for (let aIndex = 0; aIndex < line.ayahs.length; aIndex++) {
            const aNo = line.ayahs[aIndex];
            if (aNo == a) {
              lines[index].isRuku = true;
              lines[index].no = ayahsNos[index1].rNumber;
              break;
            }
          }
          if (line.ayahs[0] == a) {
            lines[index].isRuku = true;
            lines[index].no = ayahsNos[index1].rNumber;
          }
        }
      }
    }
    this.setState({lines: lines});
  };

  setSajdaAyah = ayahsNos => {
    let lines = [...this.state.lines];
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (line.ayahs.length === 1) {
        for (let index1 = 0; index1 < ayahsNos.length; index1++) {
          const aNo = ayahsNos[index1].number;
          if (line.ayahs[0] === aNo) {
            lines[index].isSajda = true;
            break;
          }
        }
      } else {
        for (let index1 = 0; index1 < ayahsNos.length; index1++) {
          const a = ayahsNos[index1].number;
          for (let aIndex = 0; aIndex < line.ayahs.length; aIndex++) {
            const aNo = line.ayahs[aIndex];
            if (aNo === a) {
              lines[index].isSajda = true;
              break;
            }
          }
          if (line.ayahs[0] === a) {
            lines[index].isSajda = true;
          }
        }
      }
    }
    this.setState({lines: lines});
  };
  ////// END LOGIC /////////
  getMetaData = () => {
    let page = [...this.props.page.singlePage];
    let surahs = [];
    let sajdas = [];
    let rukuAyahNos = [];
    for (let index = 0; index < page.length; index++) {
      const ayah = page[index];
      if (ayah.isLastRukuhAyat) {
        rukuAyahNos.push({number: ayah.numberInSurah, rNumber: ayah.ruku});
        // rukuAyahNos.push({number: ayah.number, rNumber: ayah.ruku});
      }
      if (ayah.isSurahStart) {
        surahs.push(ayah);
      }
      if (ayah.sajda) {
        sajdas.push(ayah.number);
      }
    }

    return {surahs, sajdas, rukuAyahNos};
  };

  handleScroll = () => {
    let scrollable = this.props.scrollable;
    let pageNo = scrollable.pageNo;
    if (this.props.page.pageNo === pageNo) {
      this.props.scrollToIndex1(this.props.page.pageNo - 1);
    }
  };

  render() {
    const fontSize = this.state.fontSize;
    const lineHeight = fontSize * 2.5;
    return (
      <View style={{width: '100%'}}>
        <View style={{height: 6}} />
        {/* {this.props.page.singlePage.map(item =>
          item.isSurahStart ? (
            <View>
              <Text style={{alignSelf: 'center', fontSize: 30}}>
                {item.isSurahStart ? item.surah.name : ''}
              </Text>
              <View style={{height: 20}} />
            </View>
          ) : (
            false
          ),
        )} */}

        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text
            onTextLayout={this.onTextLayout}
            style={{width: '94%', textAlign: 'center'}}>
            <Text
              style={{
                fontSize: fontSize,
                lineHeight: lineHeight,
              }}>
              {this.props.page.singlePage.map((item, index) =>
                item.isSurahStart ? (
                  <React.Fragment>
                    <Text style={{alignSelf: 'center', fontSize: 30}}>
                      {item.isSurahStart ? item.surah.name + '\n' : ''}
                    </Text>

                    <Text
                      onPress={() => {
                        if (this.props.disabled) {
                        }
                        if (this.props.disabled === 'false') {
                          if (item.marked === false) {
                            this.props.onMarkMistake(
                              this.props.page.pageNo,
                              item.number,
                              !item.marked,
                            );
                          }
                          if (item.marked === true) {
                            Alert.alert('Already Marked');
                          }
                        }
                      }}
                      style={{
                        // fontFamily: 'HelveticaNeue-Medium',
                        color: item.marked ? '#FFAA1D' : 'grey',
                      }}
                      key={index}>
                      {item.isSurahStart
                        ? item.text +
                          '( ' +
                          ArabicNumbers(item.numberInSurah) +
                          ' \n'
                        : ' '}
                    </Text>
                  </React.Fragment>
                ) : (
                  <Text
                    onPress={() => {
                      if (this.props.disabled) {
                      }
                      if (this.props.disabled === 'false') {
                        if (item.marked === false) {
                          this.props.onMarkMistake(
                            this.props.page.pageNo,
                            item.number,
                            !item.marked,
                          );
                        }
                        if (item.marked === true) {
                          Alert.alert('Already Marked');
                        }
                      }
                    }}
                    style={{
                      // fontFamily: 'HelveticaNeue-Medium',
                      color: item.marked ? '#FFAA1D' : 'grey',
                    }}
                    key={index}>
                    {item.text +
                      ' ( ' +
                      ArabicNumbers(item.numberInSurah) +
                      ' ) '}
                  </Text>
                ),
              )}
            </Text>
          </Text>
          <View style={{width: '6%'}}>
            {this.state.lines.map((l, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  height: lineHeight,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: l.isRuku ? 'green' : 'white',
                  }}>
                  {ArabicNumbers(l.no)}
                </Text>
                <Text
                  style={{
                    color: l.isRuku ? 'green' : 'white',
                  }}>
                  ع
                </Text>
              </View>
            ))}
          </View>
        </View>
        {this.props.page.singlePage.length > 0 ? (
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 20}}>
              ______________ {this.props.page.pageNo} ______________
            </Text>
          </View>
        ) : (
          false
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  completeSurahData: state.QuranReducer.completeSurah,
  withOutClick: state.QuranReducer.withoutClick,
  issueMistakeMsg: state.TeacherReducer.issueMistakByTeacherRes,
  pageWiseQuranPage: state.QuranReducer.pageWiseQuran,
  completeQuran: state.QuranReducer.completeQuran,
  mistakList: state.StudentReducer.studentMistakeStatusListRes,
});
export default connect(mapStateToProps, {
  showQuran,
  getSurahData,
  loadQuranPage,
  showQuarnPageWise,
  markAyah,
})(QuranPage);
