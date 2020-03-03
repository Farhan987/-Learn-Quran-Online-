import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import {
  Container,
  Text,
  Input,
  Button,
  Item,
  Spinner,
  Footer,
  Icon,
} from 'native-base';
import QuranPage from './quranPage';
import {
  showQuran,
  getSurahData,
  showQuarnPageWise,
  markAyah,
  initQuranContext,
} from '../../store/actions/quranAction';
import Header from '../../components/header/backarrowHeader';
import {connect} from 'react-redux';
import {COMPLETE_QURAN} from '../../themes/completeQuran';
import {LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR} from '../../themes/color';
import MyIssueMistake from '../../businessLogic/MyIssueMistake';
class SurahData extends Component {
  componentDidMount() {
    this.props.initQuranContext(this);
    AsyncStorage.getItem('Login').then(user => {
      const users = JSON.parse(user);
      if (users.teacher) {
        const StudentID = this.props.navigation.getParam('Student', '');
        this.setState({
          studentID: StudentID,
          teacherID: users.teacher._id,
        });
      } else if (users.student) {
        this.setState({status: 'student'});
      }
    });
    let mistake = this.props.navigation.getParam('mistake', {});
    let isMistake = this.props.navigation.getParam('isMistake', {});

    if (isMistake === true) {
      // this.setState({spinnerModal: false})
      this.setState({spinnerModal: true});
      this.setState({scrollPage: mistake.chapter});
    } else {
      this.setState({scrollPage: -1});
    }
  }

  state = {
    status: '',
    spinnerMove: false,
    surahNo: 0,
    surahName: '',
    studentID: '',
    modalVisible: false,
    description: '',

    teacherID: '',
    MisTakeStatus: 'NEW',
    status: '',
    flag: false,
    errorAdded: false,
    PageNo: 0,
    AyahNo: 0,
    IsMaked: false,
    scrollPage: -1,
    spinnerModal: false,
    counterPage: 1,
  };
  setSpinnerModal = () => {
    this.setState({spinnerModal: !this.state.spinnerModal});
  };
  setModalVisible = (pageNo, ayahNo, mark) => {
    if (this.state.IsMaked === true) {
    } else {
      this.setState({
        PageNo: pageNo,
        AyahNo: ayahNo,
        IsMaked: mark,
        modalVisible: true,
      });
    }
  };
  HideModal = () => {
    this.setState({
      PageNo: 0,
      AyahNo: 0,
      IsMaked: false,
      modalVisible: false,
      description: '',
    });
  };
  issueMistakeofStudent = () => {
    if (this.state.IsMaked === true) {
      this.props.markAyah(
        this.state.PageNo,
        this.state.AyahNo,
        this.state.IsMaked,
        new MyIssueMistake(
          this.state.PageNo,
          this.state.AyahNo,
          this.state.description,
          this.state.teacherID,
          this.state.MisTakeStatus,
          this.state.studentID,
        ),
        this,
      );
    } else {
      Alert.alert('Already Highlited');
    }
  };
  scrollToIndex1 = index => {
    this.quranPages.scrollToIndex({index: index});
    this.setState({spinnerModal: false});
    this.setState({counterPage: index});
  };
  increaseCount = () => {
    let c = this.state.counterPage;
    let show = c - 1;
    let x = c + 1;
    if (c > 604) {
      Alert.alert('Page not exisit');
    } else {
      console.log(show);
      console.log(x);
      this.scrollToIndex1(show);
      // this.setState({scrollPage: show});
      this.setState({counterPage: x});
    }
  };
  decreaseCount = () => {
    let c = this.state.counterPage;
    console.log(c);
    if (c <= 1) {
      Alert.alert('This is the starting Page');
    } else {
      let x = c - 1;
      this.scrollToIndex1(x);
      this.setState({counterPage: x});
    }
  };
  setCount = count => {
    if (count > 604) {
      Alert.alert('Page not exist');
    } else {
      this.setState({counterPage: count});
      this.scrollToIndex1(count);
    }
  };
  render() {
    const disabled = this.props.navigation.getParam('disable', 'false');

    return (
      <Container style={styles.container}>
        <Header
          Title="Quran"
          onPress={() =>
            this.props.navigation.navigate(this.props.BackToPrevious)
          }
        />
        <FlatList
          ref={e => (this.quranPages = e)}
          data={this.props.completeQuran}
          renderItem={({item, index}) => (
            <QuranPage
              disabled={disabled}
              onMarkMistake={this.setModalVisible}
              key={index}
              page={item}
              scrollable={{pageNo: this.state.scrollPage}}
              scrollToIndex1={this.scrollToIndex1}
            />
          )}
          keyExtractor={item => item.id}
        />
        <View style={{height: 50, flexDirection: 'row'}}>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Item
              regular
              style={[styles.textInputStyle, {height: 40, width: 70}]}>
              <Input
                defaultValue={String(this.state.counterPage)}
                keyboardType="numeric"
                placeholder="P.No"
                value={this.state.counterPage}
                style={{color: LIGHT_BROWN}}
                onChangeText={text => this.setCount(text)}>
                {/* {this.state.counterPage} */}
              </Input>
            </Item>
          </View>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.decreaseCount()}>
                <Icon
                  name="arrow-left"
                  type="FontAwesome"
                  style={{color: LIGHT_BROWN, fontSize: 20}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.increaseCount()}>
                <Icon
                  name="arrow-right"
                  type="FontAwesome"
                  style={{color: LIGHT_BROWN, fontSize: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.status === 'student' ? (
          false
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 150,
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.spinnerModal}
          onRequestClose={() => {
            this.setState({spinnerModal: false});
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner color="brown" />
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  completeSurahData: state.QuranReducer.completeSurah,
  withOutClick: state.QuranReducer.withoutClick,
  issueMistakeMsg: state.TeacherReducer.issueMistakByTeacherRes,
  pageWiseQuranPage: state.QuranReducer.pageWiseQuran,
  completeQuran: state.QuranReducer.completeQuran,
  BackToPrevious: state.TeacherReducer.backFromHomScreenRes,
});
export default connect(mapStateToProps, {
  showQuran,
  getSurahData,
  markAyah,
  showQuarnPageWise,
  initQuranContext,
})(SurahData);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
