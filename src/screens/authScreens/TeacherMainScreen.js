import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Icon, Text, Button, Container, Content } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR } from "../../themes/color";
import CustomFooter from "../../components/footer/customFooter";
import { connect } from "react-redux";
import { initializePages } from "../../store/actions/quranAction";
import { teacherStudentsList } from "../../store/actions/teacherAction";
import { WithoutClick } from "../../store/actions/quranAction";
import { backFromHomeScreen } from "../../store/actions/teacherAction";
class StudentMainScreen extends Component {
  componentDidMount() {
    this.props.initializePages();

    AsyncStorage.getItem("Login").then(user => {
      if (user) {
        let userData = JSON.parse(user);

        if (userData.teacher) {
          this.setState({
            fullName: userData.teacher.fullName,
            userName: userData.teacher.userName,
            id: userData.teacher._id,
            status: "teacher"
          });
        } else {
        }
      }
    });
  }
  state = {
    fullName: "",
    userName: "",
    id: "",
    status: "",
    requestStatus: "ACCEPTED"
  };
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor={DARK_BROWN} barStyle="light-content" />
        <Content>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.logoStyle}
              source={require("../../images/Hifz.png")}
            />
          </View>
          <View style={{ height: 60 }} />
          <View
            style={{
              height: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: DARK_BROWN, fontWeight: "bold" }}>
              {this.state.fullName}
            </Text>
          </View>
          <View style={{ height: 40 }} />

          <TouchableOpacity
            style={styles.boxViewStyle}
            onPress={() => {
              this.props.WithoutClick("true");
              this.props.backFromHomeScreen("TeacherMainScreen");
              console.log("adsadsa");
              this.props.navigation.navigate("SScreen", {
                data: "true"
              });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text
                note
                style={{ fontSize: 16, marginLeft: 10, color: LIGHT_BROWN }}
              >
                Quran
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20
              }}
            >
              <Icon
                type="FontAwesome"
                style={{ fontSize: 15, color: LIGHT_BROWN }}
                name="arrow-right"
              />
            </View>
          </TouchableOpacity>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.boxViewStyle}
            onPress={() => this.props.navigation.navigate("MakeGroupScreen")}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text
                note
                style={{ fontSize: 16, marginLeft: 10, color: LIGHT_BROWN }}
              >
                Groups
              </Text>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20
              }}
            >
              <Icon
                type="FontAwesome"
                style={{ fontSize: 15, color: LIGHT_BROWN }}
                name="arrow-right"
              />
            </View>
          </TouchableOpacity>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.boxViewStyle}
            onPress={() => {
              this.props.teacherStudentsList(
                this.state.id,
                this.state.requestStatus
              );
              this.props.navigation.navigate("StudentListScreen");
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text
                note
                style={{ fontSize: 16, marginLeft: 10, color: LIGHT_BROWN }}
              >
                Students List
              </Text>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20
              }}
            >
              <Icon
                type="FontAwesome"
                style={{ fontSize: 15, color: LIGHT_BROWN }}
                name="arrow-right"
              />
            </View>
          </TouchableOpacity>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.boxViewStyle}
            onPress={() =>
              this.props.navigation.navigate("FriendRequestScreen")
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <Text
                note
                style={{ fontSize: 16, marginLeft: 10, color: LIGHT_BROWN }}
              >
                Students Request
              </Text>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "flex-end",
                paddingRight: 20
              }}
            >
              <Icon
                type="FontAwesome"
                style={{ fontSize: 15, color: LIGHT_BROWN }}
                name="arrow-right"
              />
            </View>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
          <View style={styles.buttonViewStyle}>
            <Button
              iconRight
              style={styles.buttonStyle}
              onPress={() =>
                AsyncStorage.removeItem("Login")
                  .then(() => {
                    this.props.navigation.navigate("LoginScreen");
                  })
                  .catch(err => "error")
              }
            >
              <Icon
                name="sign-out"
                type="FontAwesome"
                style={{ marginLeft: 10, color: LIGHT_BROWN }}
              />
              <Text style={{ color: LIGHT_BROWN }}>Logout</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  // teacherLoginData: state.TeacherReducer.teacherLogin,
  studentRequestsToTeacher: state.TeacherReducer.studentRequestList
});
export default connect(mapStateToProps, {
  teacherStudentsList,
  backFromHomeScreen,
  WithoutClick,
  initializePages
})(StudentMainScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR
  },
  imageViewStyle: {
    height: 170,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6E5849"
  },
  logoStyle: {
    height: 100,
    width: 100,

    zIndex: 999,
    alignSelf: "center",
    marginTop: 150
  },
  boxViewStyle: {
    height: 50,
    width: "85%",
    backgroundColor: "white",
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  buttonViewStyle: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    width: 150,
    height: 50,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    borderRadius: 10
  }
});
