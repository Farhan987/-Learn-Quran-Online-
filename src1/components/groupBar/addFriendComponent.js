import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Alert} from 'react-native';
import {Text, Icon} from 'native-base';
import {DARK_BROWN, LIGHT_BROWN} from '../../themes/color';
import {
  getTeacherFriendsProfile,
  addStudentToGroup,
} from '../../store/actions/teacherAction';
import {connect} from 'react-redux';
class AddFriendGroupComponent extends Component {
  state = {
    api: false,
  };
  componentDidMount() {
    this.props.getTeacherFriendsProfile(this.props.frnd.student);
  }
  addtoGroup = () => {
    this.setState({api: false});
    if (this.props.groupStudentList.length > 0) {
      // console.lohg(this.props.groupStudentList);
      const data = this.props.groupStudentList.findIndex(a => {
        if (a._id === this.props.frnd.student._id) {
          this.setState({api: true});
        }
      });

      if (this.state.api === true) {
        this.props.addStudentToGroup(
          this.props.frnd.student,
          this.props.groupIdd,
        );
        Alert.alert('Successfully Added to Group');
      } else {
        Alert.alert('Already in Group');
      }
    } else {
      this.props.addStudentToGroup(
        this.props.frnd.student,
        this.props.groupIdd,
      );
      Alert.alert('Successfully Added to Group');
    }
  };

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
                {this.props.frnd.student.fullName}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.props.showImage ? (
                <TouchableOpacity onPress={() => this.props.onPress()}>
                  <Image source={require('../../images/user_check.png')} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this.addtoGroup()}>
                  <Icon
                    name={
                      this.props.IconName ? this.props.IconName : 'user-plus'
                    }
                    type={this.props.type ? this.props.type : 'FontAwesome'}
                    style={{
                      color: DARK_BROWN,
                      fontSize: this.props.fontSize ? this.props.fontSize : 22,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
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
})(AddFriendGroupComponent);
