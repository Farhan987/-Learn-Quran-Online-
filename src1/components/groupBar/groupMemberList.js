import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Icon} from 'native-base';
import {DARK_BROWN, LIGHT_BROWN} from '../../themes/color';
import {
  getTeacherFriendsProfile,
  addStudentToGroup,
} from '../../store/actions/teacherAction';
import {connect} from 'react-redux';
class GroupMemberList extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{height: 20}} />
        <View
          onPress={this.props.onPress}
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 45,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: DARK_BROWN,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="person" style={{color: DARK_BROWN, fontSize: 22}} />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={{color: LIGHT_BROWN}}>
                {this.props.students.fullName}
              </Text>
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={'arrow-forward'}
                type={''}
                style={{
                  color: DARK_BROWN,
                  fontSize: 22,
                }}
              />
            </View> */}
          </View>
        </View>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  studentToGroup: state.TeacherReducer.addStudentToGroupRes,
});

export default connect(mapStateToProps, {
  getTeacherFriendsProfile,
  addStudentToGroup,
})(GroupMemberList);
