import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text, Spinner} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN} from '../../themes/color';
import Header from '../../components/header/backarrowHeader';
import GroupBar from '../../components/groupBar/groupComponent';
import {connect} from 'react-redux';
import {
  getTeacherFriendsProfile,
  backFromHomeScreen,
} from '../../store/actions/teacherAction';

class StudentListScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header
          Title={'Student List'}
          onPress={() => this.props.navigation.navigate('TeacherMainScreen')}
        />
        <Content>
          {this.props.studentListStatusRes ? (
            this.props.teacherFriends.map(friend => (
              <GroupBar
                onPress={() => {
                  this.props.backFromHomeScreen('StudentListScreen');
                  this.props.navigation.navigate('RecentMistake', {
                    studentID: friend.student._id,
                  });
                }}
                frnd={friend}
              />
            ))
          ) : (
            <Spinner color="brown" />
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teacherFriends: state.TeacherReducer.teacherStudents,
  studentListStatusRes: state.TeacherReducer.studentListStatus,
});

export default connect(mapStateToProps, {
  getTeacherFriendsProfile,
  backFromHomeScreen,
})(StudentListScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
  },
  headerStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
