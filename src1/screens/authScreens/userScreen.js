import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Icon, Text, Button, Container, Content} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR} from '../../themes/color';
import CustomFooter from '../../components/footer/customFooter';
import {connect} from 'react-redux';
import {teacherStudentsList} from '../../store/actions/teacherAction';
import {WithoutClick} from '../../store/actions/quranAction';
import {backFromHomeScreen} from '../../store/actions/teacherAction';
class UserProfileScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem('Login').then(user => {
      if (user) {
        let userData = JSON.parse(user);

        if (userData.student) {
          this.setState({
            fullName: userData.student.fullName,
            userName: userData.student.userName,
            id: userData.student._id,
            status: 'student',
          });
        } else {
          console.log('user.teacher114');
        }
      }
    });
  }
  state = {
    fullName: '',
    userName: '',
    id: '',
    status: '',
    requestStatus: 'ACCEPTED',
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.logoStyle}
              source={require('../../images/Hifz.png')}
            />
          </View>
          <View style={{height: 60}} />
          <View
            style={{
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: DARK_BROWN, fontWeight: 'bold'}}>
              {this.state.fullName}
            </Text>
          </View>
          <View style={{height: 40}} />
          {this.state.status === 'teacher' ? (
            <TouchableOpacity
              style={styles.boxViewStyle}
              onPress={() => {
                this.props.WithoutClick('true');
                this.props.backFromHomeScreen('HomeScreen');
                this.props.navigation.navigate('SScreen', {
                  disable: 'true',
                });
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  note
                  style={{fontSize: 16, marginLeft: 10, color: LIGHT_BROWN}}>
                  Quran
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="FontAwesome"
                  style={{fontSize: 15, color: LIGHT_BROWN}}
                  name="arrow-right"
                />
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}
          <View style={{height: 20}} />
          {this.state.status === 'teacher' ? (
            <TouchableOpacity
              style={styles.boxViewStyle}
              onPress={() => this.props.navigation.navigate('MakeGroupScreen')}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  note
                  style={{fontSize: 16, marginLeft: 10, color: LIGHT_BROWN}}>
                  Groups
                </Text>
              </View>

              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="FontAwesome"
                  style={{fontSize: 15, color: LIGHT_BROWN}}
                  name="arrow-right"
                />
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}

          <View style={{height: 20}} />
          {this.state.status === 'teacher' ? (
            <TouchableOpacity
              style={styles.boxViewStyle}
              onPress={() => {
                this.props.teacherStudentsList(
                  this.state.id,
                  this.state.requestStatus,
                );
                this.props.navigation.navigate('StudentListScreen');
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  note
                  style={{fontSize: 16, marginLeft: 10, color: LIGHT_BROWN}}>
                  Students List
                </Text>
              </View>

              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="FontAwesome"
                  style={{fontSize: 15, color: LIGHT_BROWN}}
                  name="arrow-right"
                />
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}
          <View style={{height: 20}} />
          {this.state.status === 'teacher' ? (
            <TouchableOpacity
              style={styles.boxViewStyle}
              onPress={() =>
                this.props.navigation.navigate('FriendRequestScreen')
              }>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  note
                  style={{fontSize: 16, marginLeft: 10, color: LIGHT_BROWN}}>
                  Students Request
                </Text>
              </View>

              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="FontAwesome"
                  style={{fontSize: 15, color: LIGHT_BROWN}}
                  name="arrow-right"
                />
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}
          <View style={{height: 20}} />
          <View style={styles.buttonViewStyle}>
            <Button
              iconRight
              style={styles.buttonStyle}
              onPress={() =>
                AsyncStorage.removeItem('Login')
                  .then(() => {
                    console.log('logout');
                    this.props.navigation.navigate('LoginScreen');
                  })
                  .catch(err => console.log('error'))
              }>
              <Icon
                name="sign-out"
                type="FontAwesome"
                style={{marginLeft: 10, color: LIGHT_BROWN}}
              />
              <Text style={{color: LIGHT_BROWN}}>Logout</Text>
            </Button>
          </View>
        </Content>
        {this.state.status === 'teacher' ? (
          false
        ) : (
          <CustomFooter navigation={this.props.navigation} />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  // teacherLoginData: state.TeacherReducer.teacherLogin,
  studentRequestsToTeacher: state.TeacherReducer.studentRequestList,
});
export default connect(mapStateToProps, {
  teacherStudentsList,
  backFromHomeScreen,
  WithoutClick,
})(UserProfileScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
  },
  imageViewStyle: {
    height: 170,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6E5849',
  },
  logoStyle: {
    height: 100,
    width: 100,

    zIndex: 999,
    alignSelf: 'center',
    marginTop: 150,
  },
  boxViewStyle: {
    height: 50,
    width: '85%',
    backgroundColor: 'white',
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonViewStyle: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    borderRadius: 10,
  },
});
