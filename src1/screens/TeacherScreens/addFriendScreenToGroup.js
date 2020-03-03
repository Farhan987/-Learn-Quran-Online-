import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import {
  Container,
  Content,
  Header,
  Text,
  View,
  Icon,
  Button,
} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN} from '../../themes/color';
import AddFriendGroupComponent from '../../components/groupBar/groupMemberList';

import GroupBar from '../../components/groupBar/addFriendComponent';
import {connect} from 'react-redux';
import {
  teacherStudentsList,
  backFromHomeScreen,
} from '../../store/actions/teacherAction';
class AddFriendScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem('Login').then(user => {
      if (JSON.parse(user)) {
        let userData = JSON.parse(user);
        if (userData.teacher) {
          this.setState({
            _id: userData.teacher._id,
            status: 'teacher',
          });
        } else if (userData.student) {
          this.setState({
            _id: userData.student._id,
            status: 'student',
          });
        } else {
          console.log('user.teacher114');
        }
      }
    });
  }
  state = {
    _id: '',
    requestStatus: 'ACCEPTED',
    flag: false,
  };
  render() {
    // const studenList = this.props.navigation.getParam('stdList', []);
    // let groupID = this.props.navigation.getParam('groupID', '');
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <View style={styles.viewStyle1}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MakeGroupScreen')}>
              <Icon
                name="arrow-back"
                style={{color: LIGHT_BROWN, paddingLeft: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle2}>
            <Text style={{fontSize: 17, color: DARK_BROWN, marginLeft: 7}}>
              Add Friend
            </Text>
          </View>

          <View style={styles.viewStyle3}>
            <TouchableOpacity
              onPress={() => {
                this.props.teacherStudentsList(
                  this.state._id,
                  this.state.requestStatus,
                );
                this.setState({flag: true});
              }}
              bordered
              success
              style={{
                borderRadius: 5,
                height: 30,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: LIGHT_BROWN,
              }}>
              <Text style={{fontSize: 13, color: LIGHT_BROWN}}>
                Add Student
              </Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Content>
          <View style={{height: 30}} />
          {this.state.flag ? (
            <View style={styles.textViewStyle}>
              <Text style={{color: 'white', fontSize: 16, paddingLeft: 10}}>
                Add Students to Groups
              </Text>
            </View>
          ) : (
            false
          )}
          {this.state.flag
            ? this.props.teacherFriends.map(friend => (
                <GroupBar
                  groupStudentList={this.props.listOfStudent.stdList}
                  groupIdd={this.props.listOfStudent.groupID}
                  frnd={friend}
                />
              ))
            : false}

          <View style={{height: 20}}></View>
          <View style={styles.textViewStyle}>
            <Text style={{color: 'white', fontSize: 16, paddingLeft: 10}}>
              Group Members
            </Text>
          </View>

          {this.props.listOfStudent.stdList.map(std => (
            <TouchableOpacity
              onPress={() => {
                this.props.backFromHomeScreen('AddFriendScreenToGroup');
                this.props.navigation.navigate('RecentMistake', {
                  studentID: std._id,
                });
              }}>
              <AddFriendGroupComponent
                students={std}
                IconName="arrow-forward"
                type="FontAwesome"
                fontSize={18}
              />
            </TouchableOpacity>
          ))}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  teacherFriends: state.TeacherReducer.teacherStudents,
  listOfStudent: state.TeacherReducer.listOfgroupStudents,
});

export default connect(mapStateToProps, {
  teacherStudentsList,
  backFromHomeScreen,
})(AddFriendScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
  },
  viewStyle1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewStyle2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mainViewStyle: {
    height: 50,
    justifyContent: 'center',
  },
  innerViewStyle: {
    height: 51,
    width: '90%',
    alignSelf: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#EAEAEA",
    // backgroundColor: "white"
  },

  textViewStyle: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: DARK_BROWN,
    borderRadius: 5,
  },
});
