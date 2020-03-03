import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Container, Content, Icon, Text, Spinner} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import CustomHeader from '../components/header/customHeader';
import BackarrowHeader from '../components/header/backarrowHeader';
import MistakesHistoryComponent from '../components/mistakesHistoryComponent/mistakesHistoryComponent';
import {connect} from 'react-redux';
import {getMistakeByStatus} from '../store/actions/studentAction';
import {updateMistakeStatus} from '../store/actions/teacherAction';
import {WithoutClick} from '../store/actions/quranAction';
class HomeScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem('Login').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        if (userData.teacher) {
          const StudentID = this.props.navigation.getParam('studentID', 0);
          this.props.getMistakeByStatus(StudentID, 'NEW', this);

          this.setState({
            status: 'teacher',
            studentID: StudentID,
          });
        } else if (userData.student) {
          this.props.getMistakeByStatus(userData.student._id, 'NEW', this);
          this.setState({
            status: 'student',
            studentID: userData.student._id,
          });
        } else {
        }
      }
    });
  }
  state = {
    status: '',
    studentID: 0,
    flag: false,
    spinnerMove: false,
  };
  render() {
    const date = new Date();
    const currentDate =
      date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

    if (this.state.flag) {
      Alert.alert(this.props.upDateStatusRes);
      this.setState({flag: false});
    }
    return (
      <Container style={styles.container}>
        {this.state.status === 'student' ? (
          <CustomHeader
            title="Recent Mistakes"
            ShowSearchButton
            navigation={this.props.navigation}
          />
        ) : (
          false
        )}
        {this.state.status === 'teacher' ? (
          <BackarrowHeader
            Title="Recent Mistakes"
            onPress={() =>
              this.props.navigation.navigate(this.props.urlToBackScreen)
            }
          />
        ) : (
          false
        )}
        <View style={{height: 20}} />
        <View style={styles.mainViewStyle}>
          <TouchableOpacity
            style={styles.innerViewStyle}
            onPress={() => {
              this.props.WithoutClick('false');
              this.props.navigation.navigate('SScreen', {
                Student: this.state.studentID,
              });
            }}>
            <View style={styles.flexPart1}>
              <View style={styles.dotStyle} />
            </View>
            <View style={styles.flexPart2}>
              <Text style={{color: LIGHT_BROWN}}>Reciet Quran</Text>
            </View>
            <View style={styles.flexPart3}>
              <Icon
                name="play-circle-o"
                type="FontAwesome"
                style={{color: LIGHT_BROWN, fontSize: 22}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.textViewStyle}>
          <Text style={{color: LIGHT_BROWN, fontSize: 20}}>
            Recent Mistakes
          </Text>
        </View>
        <Content>
          {this.state.spinnerMove ? (
            <Spinner color={LIGHT_BROWN} />
          ) : this.props.mistakList.length > 0 ? (
            this.props.mistakList.map(std => (
              <MistakesHistoryComponent
                ShowTick
                onTab={() => {
                  this.props.navigation.navigate('SScreen', {
                    mistake: std,
                    isMistake: true,
                  });
                }}
                onPress={() =>
                  this.props.updateMistakeStatus(
                    std._id,
                    'CORRECTED',
                    currentDate.toString(),
                    this,
                  )
                }
                date={std.mistakeDate}
                key={std._id}
                ID={std._id}
                mistakes={'Page' + ' ' + std.chapter + '  Verse ' + std.verse}
                misExplanation={std.description}
              />
            ))
          ) : (
            <View
              style={{
                marginTop: 30,
                height: 50,
                width: '85%',
                backgroundColor: 'white',
                borderColor: LIGHT_BROWN,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderRadius: 10,

                alignSelf: 'center',
              }}>
              <Text style={{paddingLeft: 10, color: DARK_BROWN}}>
                No Mistaks Marked Yet
              </Text>
            </View>
          )}
        </Content>
        {this.state.status === 'student' ? (
          <CustomFooter navigation={this.props.navigation} />
        ) : (
          false
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  mistakList: state.StudentReducer.studentMistakeStatusListRes,
  urlToBackScreen: state.TeacherReducer.backFromHomScreenRes,
  upDateStatusRes: state.StudentReducer.upDateStatus,
});

export default connect(mapStateToProps, {
  getMistakeByStatus,
  WithoutClick,
  updateMistakeStatus,
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  dotStyle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: LIGHT_BROWN,
  },
  flexPart2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 13,
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
});
