import React, { Component } from "react";
import { StyleSheet, AsyncStorage, View, StatusBar } from "react-native";
import { Container, Content, Text, Spinner } from "native-base";
import { SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN } from "../../themes/color";
import BackarrowHeader from "../../components/header/backarrowHeader";
import FriendRequestComponent from "../../components/friendRequestBar/friendRequestComponent";
import { connect } from "react-redux";
import { studentRequestStatus } from "../../store/actions/teacherAction";

class FriendRequestScreen extends Component {
  state = { teacherId: "", requestStatus: "PENDING", spinnerMove: false };

  componentDidMount() {
    AsyncStorage.getItem("Login").then(user => {
      if (user) {
        let Teacher = JSON.parse(user);
        let TeacherID = Teacher.teacher._id;
        this.props.studentRequestStatus(
          TeacherID,
          this.state.requestStatus,
          this
        );
        this.setState({ teacherId: TeacherID });
      }
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <BackarrowHeader
          Title={"Friend Request"}
          onPress={() => this.props.navigation.navigate("TeacherMainScreen")}
        />
        <StatusBar backgroundColor={DARK_BROWN} barStyle="light-content" />
        <Content>
          {this.state.spinnerMove ? (
            <Spinner color="brown" />
          ) : this.props.studentRequestsToTeacher.length > 0 ? (
            this.props.studentRequestsToTeacher.map(requests => (
              <FriendRequestComponent
                r={requests}
                navigation={this.props.navigation}
              />
            ))
          ) : (
            <View
              style={{
                marginTop: 30,
                height: 50,
                width: "85%",
                backgroundColor: "white",
                borderColor: LIGHT_BROWN,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "flex-start",
                borderRadius: 10,

                alignSelf: "center"
              }}
            >
              <Text style={{ paddingLeft: 10, color: DARK_BROWN }}>
                No Previous Request Exist
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
  studentRequestsToTeacher: state.TeacherReducer.studentRequestList
});

export default connect(mapStateToProps, { studentRequestStatus })(
  FriendRequestScreen
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR
  },
  headerStyle: {
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
