import React, { Component } from "react";
import { View, TouchableOpacity, Image, AsyncStorage } from "react-native";
import { Text, Icon, Spinner } from "native-base";
import { DARK_BROWN, LIGHT_BROWN } from "../../themes/color";
import {
  getTeacherFriendsProfile,
  addStudentToGroup,
  getTeacherFriendsProfile1,
  teacherCreatedGroupsList
} from "../../store/actions/teacherAction";
import { connect } from "react-redux";
class AddFriendGroupComponent extends Component {
  state = {
    api: false,
    spinnerMove: false,
    success: false,
    _id: "",
    success: false
  };
  componentDidMount() {
    AsyncStorage.getItem("Login").then(user => {
      if (JSON.parse(user)) {
        let userData = JSON.parse(user);
        if (userData.teacher) {
          this.setState({
            _id: userData.teacher._id,
            status: "teacher"
          });
        } else if (userData.student) {
          this.setState({
            _id: userData.student._id,
            status: "student"
          });
        } else {
          console.log("user.teacher114");
        }
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ height: 20 }} />
        <View
          onPress={this.props.onPress}
          style={{
            height: 50,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              height: 45,
              width: "90%",
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: DARK_BROWN,
              flexDirection: "row",
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon name="person" style={{ color: DARK_BROWN, fontSize: 22 }} />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ color: LIGHT_BROWN }}>
                {this.props.frnd.student.fullName}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {this.props.showImage ? (
                <TouchableOpacity onPress={() => this.props.onPress()}>
                  <Image source={require("../../images/user_check.png")} />
                </TouchableOpacity>
              ) : this.state.spinnerMove ? (
                <Spinner />
              ) : (
                <TouchableOpacity onPress={this.props.onAdd}>
                  <Icon
                    name={
                      this.props.IconName ? this.props.IconName : "user-plus"
                    }
                    type={this.props.type ? this.props.type : "FontAwesome"}
                    style={{
                      color: DARK_BROWN,
                      fontSize: this.props.fontSize ? this.props.fontSize : 22
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
  studentToGroup: state.TeacherReducer.addStudentToGroupRes
});

export default connect(mapStateToProps, {
  getTeacherFriendsProfile,
  addStudentToGroup,
  teacherCreatedGroupsList
})(AddFriendGroupComponent);
