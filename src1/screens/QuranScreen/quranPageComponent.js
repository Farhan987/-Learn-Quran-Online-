import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import {ArabicNumbers} from 'react-native-arabic-numbers';
import {Container, Text, Input, Button, Item, Content} from 'native-base';
import {COMPLETE_QURAN} from '../../themes/completeQuran';
import {
  showQuran,
  getSurahData,
  showQuarnPageWise,
  loadQuranPage,
  markAyah,
} from '../../store/actions/quranAction';
import {connect} from 'react-redux';

import {LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR} from '../../themes/color';

class QuranPageComponent extends Component {
  componentDidMount() {
    //// MISTAKE LIST
    let mistakes = this.props.mistakList;
    this.props.loadQuranPage(this.props.page.pageNo, mistakes);
    /// mistakes
  }
  // toggleHeighlighted = _id => {
  //   const index = this.props.page.singlePage.findIndex(t => t._id === _id);
  //   if (index >= 0) {
  //     let myList = [...this.props.page.singlePage];
  //     myList[index].heighlighted = !this.props.page.singlePage[index]
  //       .heighlighted;
  //     // this.setState({myList: myList});
  //   }
  // };
  render() {
    return (
      <React.Fragment>
        <View style={{height: 6}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 12}}>
            {this.props.page.singlePage.map(item =>
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
            )}
            <Content>
              {this.props.page.singlePage.length > 0 ? (
                <Text
                  style={{
                    fontWeight: '300',
                    width: '100%',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {this.props.page.singlePage.map((item, index) => (
                    <Text
                      onPress={() => {
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
                      }}
                      key={item.number}
                      style={{
                        fontWeight: '300',
                        color: item.marked ? '#FFAA1D' : 'black',
                        fontSize: 30,
                        wordSpacing: 20,
                        lineHeight: 40,
                      }}>
                      {/* {item.isLastRukuhAyat === true ? (
                        <View
                          style={{
                            position: 'absolute',
                            width: 20,
                            height: 50,
                            left: 2,
                            backgroundColor: 'red',
                          }}>
                          <Text
                            style={{
                              color: 'red',
                            }}>
                            R
                          </Text>
                        </View>
                      ) : (
                        false
                      )} */}{' '}
                      {item.text}{' '}
                      <Text
                        ref={e => (this.endAyahRef = e)}
                        style={{
                          fontWeight: '300',
                          color: item.marked ? '#FFAA1D' : 'black',
                          fontSize: 20,
                          fontFamily: 'SinhalaSangamMN-Bold',
                          borderWidth: 4,
                          borderRadius: 10,
                        }}>
                        ({ArabicNumbers(item.number)})
                      </Text>
                    </Text>
                  ))}
                </Text>
              ) : (
                false
              )}
            </Content>
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
          {/* <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}>
            {this.props.page.singlePage.map((item, index) =>
              item.isLastRukuhAyat === false ? <Text>R</Text> : <Text></Text>,
            )}
          </View> */}
        </View>
      </React.Fragment>
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
})(QuranPageComponent);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG_COLOR,
  },
  mainViewStyle: {
    height: 50,
    justifyContent: 'center',
  },
  innerViewStyle: {
    height: 45,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DARK_BROWN,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  flexPart1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: LIGHT_BROWN,
    marginLeft: 10,
  },
  flexPart2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexPart3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewStyle: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  buttonStyle: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: DARK_BROWN,
    alignSelf: 'center',
    borderRadius: 6,
  },
  textInputStyle: {
    backgroundColor: '#FCF6E1',
    borderColor: '#FCF6E1',
    borderRadius: 6,
    width: '80%',
    alignSelf: 'center',
  },
  cancleModalView: {
    height: 30,
    width: 30,
    position: 'relative',
    backgroundColor: LIGHT_BROWN,
    borderRadius: 30,
    alignSelf: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: -40,
    marginRight: -10,
  },
});
