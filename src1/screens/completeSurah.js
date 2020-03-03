import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  FlatList,
  Alert,
} from 'react-native';
import {Container, Text, Input, Button, Item, Content} from 'native-base';
import MyIssueMistake from '../businessLogic/MyIssueMistake';
import {
  showQuran,
  getSurahData,
  showQuarnPageWise,
} from '../store/actions/quranAction';
import {connect} from 'react-redux';
import SingleAya from '../components/SuarhList/singleAya';
import Header from '../components/header/backarrowHeader';
import {LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR} from '../themes/color';
import {issueMistake} from '../store/actions/teacherAction';
import {ArabicNumbers} from 'react-native-arabic-numbers';
class HomeScreen extends Component {
  state = {
    surahNo: 0,
    surahName: '',
    studentID: '',
    modalVisible: false,
    description: '',
    AyaNo: 0,
    teacherID: '',
    MisTakeStatus: 'NEW',
    status: '',
    flag: false,
    errorAdded: false,
  };
  componentDidMount() {
    AsyncStorage.getItem('Login').then(user => {
      const users = JSON.parse(user);
      var i = 0;
      // for (i = 0; i <= 614; i++) {
      this.props.showQuarnPageWise(1);
      // }

      if (users.teacher) {
        let chapter = this.props.navigation.getParam('ID', 0);
        const studentID = this.props.navigation.getParam('stdID', '');

        this.setState({
          surahNo: chapter,
          studentID: studentID,
          teacherID: users.teacher._id,
        });
      } else if (users.student) {
        this.setState({status: 'student'});
      }
    });
    const SurahName = this.props.navigation.getParam('surahName', '');
    this.setState({surahName: SurahName});
    let chapter = this.props.navigation.getParam('ID', 0);
    this.props.showQuran(0, chapter);
  }

  toggleHeighlighted = _id => {
    const index = this.state.myList.findIndex(t => t._id === _id);
    if (index >= 0) {
      let myList = [...this.state.myList];
      myList[index].heighlighted = !myList[index].heighlighted;
      this.setState({myList: myList});
    }
  };
  setModalVisible() {
    this.setState({modalVisible: true});
  }
  HideModal = () => {
    this.setState({modalVisible: false, description: ''});
  };

  issueMistakeofStudent = () => {
    this.props.issueMistake(
      new MyIssueMistake(
        this.state.surahNo,
        this.state.AyaNo,
        this.state.description,
        this.state.teacherID,
        this.state.MisTakeStatus,
        this.state.studentID,
      ),
      this,
    );
  };
  render() {
    console.log(this.props.pageWiseQuranPage);
    if (this.state.flag) {
      Alert.alert(this.props.issueMistakeMsg.msg);

      if (this.props.issueMistakeMsg.success === true) {
        this.setState({modalVisible: false, description: ''});
      }
      this.setState({flag: false});
    }

    return (
      <Container style={styles.container}>
        <Header
          Title={this.state.surahName}
          onPress={() => this.props.navigation.navigate('SurahScreen')}
        />
        <Content>
          <View style={{height: 20}} />
          {this.props.pageWiseQuranPage.length > 0 ? (
            <Text
              style={{width: '100%', alignSelf: 'center', textAlign: 'center'}}>
              {this.props.pageWiseQuranPage.map((item, index) =>
                index === 0 ? (
                  false
                ) : (
                  <Text
                    // onPress={() => this.toggleHeighlighted(item)}
                    key={item.number}
                    style={{
                      // color: t.heighlighted ? '#FFAA1D' : 'black',

                      fontSize: 30,
                    }}>
                    {item.text}
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: 'SinhalaSangamMN-Bold',
                      }}>
                      ({ArabicNumbers(index + 1)})
                    </Text>
                  </Text>
                ),
              )}
            </Text>
          ) : (
            false
          )}

          {/* // <SingleAya name={item} /> */}

          {this.state.status === 'student' ? (
            this.props.completeSurahData.map((item, index) => (
              <SingleAya key={index} name={item} />
            ))
          ) : (
            <View>
              {this.props.withOutClick === 'true'
                ? this.props.completeSurahData.map((item, index) => (
                    <SingleAya name={item} key={index} />
                  ))
                : false}
              {this.props.withOutClick === 'false'
                ? this.props.completeSurahData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setModalVisible();
                        this.setState({AyaNo: index});
                      }}>
                      <SingleAya name={item} />
                    </TouchableOpacity>
                  ))
                : false}
            </View>
          )}
          {/* <FlatList
          data={this.props.completeSurahData}
          renderItem={({item, index}) =>
            this.state.status === 'student' ? (
              <SingleAya name={item} />
            ) : (
              <View>
                {this.props.withOutClick === 'true' ? (
                  <SingleAya name={item} />
                ) : (
                  false
                )}
                {this.props.withOutClick === 'false' ? (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setModalVisible();
                      this.setState({AyaNo: index});
                    }}>
                    <SingleAya name={item} />
                  </TouchableOpacity>
                ) : (
                  false
                )}
              </View>
            )
          }
          // keyExtractor={item => item.id}
          // extraData={selected}
        /> */}

          {this.state.status === 'student' ? (
            false
          ) : (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderColor: LIGHT_BROWN,
                    borderRadius: 10,
                    borderWidth: 1,
                    width: '90%',
                  }}>
                  <View style={styles.cancleModalView}>
                    <TouchableOpacity
                      onPress={() => this.HideModal()}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text style={{fontSize: 20, color: 'white'}}>x</Text>
                    </TouchableOpacity>
                  </View>
                  <Item regular style={styles.textInputStyle}>
                    <Input
                      style={{width: '90%', height: 40}}
                      placeholder="Description"
                      style={{color: LIGHT_BROWN}}
                      value={this.state.description}
                      onChangeText={text => this.setState({description: text})}
                    />
                  </Item>

                  <View style={{height: 10}}></View>
                  <Button
                    style={styles.buttonStyle}
                    onPress={() => this.issueMistakeofStudent()}>
                    <Text>Mark Mistake</Text>
                  </Button>
                </View>
              </View>
            </Modal>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  completeSurahData: state.QuranReducer.completeSurah,
  withOutClick: state.QuranReducer.withoutClick,
  issueMistakeMsg: state.TeacherReducer.issueMistakByTeacherRes,
  pageWiseQuranPage: state.QuranReducer.pageWiseQuran,
});
export default connect(mapStateToProps, {
  showQuran,
  getSurahData,
  issueMistake,
  showQuarnPageWise,
})(HomeScreen);
const styles = StyleSheet.create({
  container: {
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
