import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, View} from 'react-native';
import {Container, Content, Spinner, Text} from 'native-base';
import {SCREEN_BG_COLOR, LIGHT_BROWN, DARK_BROWN} from '../../themes/color';
import CustomFooter from '../../components/footer/customFooter';
import CustomHeader from '../../components/header/customHeader';
import SecondGroupBar from '../../components/groupBar/secondgroupComponent';
import {connect} from 'react-redux';
import {
  teacherCreatedGroupsList,
  listOfStudentInGroup,
} from '../../store/actions/teacherAction';

class GroupingScreen extends Component {
  state = {teacherId: '', spinnerMove: false};

  componentDidMount() {
    AsyncStorage.getItem('Login').then(user => {
      if (user) {
        let Teacher = JSON.parse(user);
        let TeacherID = Teacher.teacher._id;
        this.props.teacherCreatedGroupsList(TeacherID, this);
        this.setState({teacherId: TeacherID});
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader
          leftClick
          onPress={() => this.props.navigation.navigate('TeacherMainScreen')}
          title="Groups"
          navigation={this.props.navigation}
        />
        <Content>
          {this.state.spinnerMove ? (
            <Spinner color={LIGHT_BROWN} />
          ) : this.props.createdGroupsListt.length > 0 ? (
            this.props.createdGroupsListt.map(gl => (
              <SecondGroupBar
                key={gl._id}
                groupsList={gl}
                onPress={() => {
                  this.props.navigation.navigate('AddFriendScreenToGroup');
                  this.props.listOfStudentInGroup({
                    stdList: gl.students,
                    groupID: gl._id,
                  });
                }}
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
                No Groups Available
              </Text>
            </View>
          )}
        </Content>
        {/* <CustomFooter navigation={this.props.navigation} /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  createdGroupsListt: state.TeacherReducer.teacherCreatedGroupsResponse,
});

export default connect(mapStateToProps, {
  teacherCreatedGroupsList,
  listOfStudentInGroup,
})(GroupingScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
  },
});
