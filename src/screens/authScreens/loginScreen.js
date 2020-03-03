import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import { Item, Input, Button, Text, Spinner } from "native-base";
import { LIGHT_BROWN, DARK_BROWN, TITLE_COLOR } from "../../themes/color";
import { connect } from "react-redux";
import { teacherLogin } from "../../store/actions/teacherAction";
import { studentLogin } from "../../store/actions/studentAction";
import { StackActions, NavigationActions } from "react-navigation";
class LoginScreen extends Component {
  state = {
    //variables
    // showall:true for teacher
    //showall:false for student
    showAll: false,
    EmailAddress: "",
    Password: "",
    spinnermove: false,
    //validations
    emailValidate: true,
    passwordvalidate: true,
    // for teacher
    flag: false,
    SignUpSuccessFull: false,
    //for student
    flag1: false,
    SignUpSuccessFull1: false
  };
  //Email Validation
  emailValidation = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ emailValidate: false });
      this.setState({ EmailAddress: text });
    } else {
      this.setState({ emailValidate: true });
      this.setState({ EmailAddress: text });
    }
  };
  //Password Validation
  passwordValidation = text => {
    if (text.length < 7) {
      this.setState({ passwordvalidate: false });
      this.setState({ Password: text });
    } else {
      this.setState({ passwordvalidate: true });
      this.setState({ Password: text });
    }
  };

  onLogin = () => {
    this.setState({ spinnermove: true });

    if (
      this.state.EmailAddress === "" ||
      this.state.Password === "" ||
      this.state.emailValidate === false ||
      this.state.passwordvalidate === false
    ) {
      if (this.state.EmailAddress === "") {
        this.setState({ spinnermove: false });
        Alert.alert("Email is required");
      } else if (this.state.Password === "") {
        this.setState({ spinnermove: false });
        Alert.alert("Enter a valid Password");
      }
    } else {
      // this.setState({spinnermove: false});
      if (this.state.showAll === false) {
        this.props.studentLogin(
          this.state.EmailAddress,
          this.state.Password,
          this
        );
      } else {
        this.props.teacherLogin(
          this.state.EmailAddress,
          this.state.Password,
          this
        );
      }
    }
  };
  render() {
    //Teacher Log
    if (this.state.SignUpSuccessFull === true) {
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({routeName: 'TeacherScreens'})],
      // });
      this.props.navigation.navigate("TeacherScreens");
      // this.props.navigation.navigate('UserProfileScreen');
      this.setState({ SignUpSuccessFull: false });
      this.setState({
        spinnermove: false,
        EmailAddress: "",
        Password: ""
      });
    }
    if (this.state.flag) {
      if (this.props.teacherLoginData.success == true) {
        this.setState({ flag: false, spinnermove: false });
      }
      if (this.props.teacherLoginData.success == false) {
        Alert.alert(this.props.teacherLoginData.mgs);
        this.setState({ flag: false, spinnermove: false });
      }
    }
    //Student Log
    if (this.state.SignUpSuccessFull1 === true) {
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({routeName: 'StudentScreens'})],
      // });
      this.props.navigation.navigate("StudentScreens");
      this.setState({ SignUpSuccessFull1: false });
      this.setState({
        spinnermove: false,
        EmailAddress: "",
        Password: ""
      });
    }
    if (this.state.flag1) {
      if (this.props.studentLoginData.success == true) {
        Alert.alert("Login Successfully");

        this.setState({ flag1: false });
      }
      if (this.props.studentLoginData.success == false) {
        Alert.alert(this.props.studentLoginData.mgs);
        this.setState({ flag1: false, spinnermove: false });
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={DARK_BROWN} barStyle="light-content" />
        <ImageBackground
          resizeMode="stretch"
          source={require("../../images/auth_bg.png")}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View style={styles.pageTitleStyle}>
            <Text style={styles.pageTitleTextStyle}>Login</Text>
          </View>
          <View style={{ height: 30 }} />
          <View style={{ height: 50 }}>
            <Item regular style={styles.textInputStyle}>
              <Input
                placeholder="Enter Email"
                keyboardType="email-address"
                style={{ color: LIGHT_BROWN }}
                onChangeText={text => this.emailValidation(text)}
              />
            </Item>
            <View style={{ height: 30, paddingLeft: "8%" }}>
              {this.state.emailValidate ? (
                <Text />
              ) : (
                <Text style={{ marginLeft: 15, color: "red", marginTop: 4 }}>
                  Please Enter your Email
                </Text>
              )}
            </View>
          </View>
          <View style={{ height: 30 }} />
          <View style={{ height: 50 }}>
            <Item regular style={styles.textInputStyle}>
              <Input
                secureTextEntry
                placeholder="Password"
                style={{ color: LIGHT_BROWN }}
                onChangeText={text => this.passwordValidation(text)}
              />
            </Item>
            <View style={{ height: 30, paddingLeft: "8%" }}>
              {this.state.passwordvalidate ? (
                <Text />
              ) : (
                <Text style={{ marginLeft: 15, color: "red", marginTop: 4 }}>
                  Password can not be less then 7 char
                </Text>
              )}
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            {this.state.showAll ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showAll: false });
                }}
              >
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            )}
            <View style={{ width: 20 }} />
            <Text style={{ fontSize: 17, color: "#656565" }}>Student</Text>
            <View style={{ width: 30 }} />

            <View style={{ width: 10 }} />
            {this.state.showAll ? (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showAll: true });
                }}
              >
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            )}
            <View style={{ width: 10 }} />
            <Text style={{ fontSize: 17, color: "#656565" }}>Teacher</Text>
          </View>
          <View style={{ height: 50 }}>
            {this.state.spinnermove ? (
              <Spinner color="brown" />
            ) : (
              <Button style={styles.buttonStyle} onPress={() => this.onLogin()}>
                <Text>Login</Text>
              </Button>
            )}
          </View>
          <View
            style={{ height: 50, flexDirection: "row", alignSelf: "center" }}
          >
            <Text style={styles.signUpText}>Create your account</Text>
            <View style={{ width: 10 }} />
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("SignupScreen")}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  teacherLoginData: state.TeacherReducer.teacherLogin,
  studentLoginData: state.StudentReducer.studentLogin
});
export default connect(mapStateToProps, { teacherLogin, studentLogin })(
  LoginScreen
);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageTitleStyle: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  pageTitleTextStyle: {
    color: TITLE_COLOR,
    fontSize: 20,
    fontWeight: "bold"
  },
  textInputStyle: {
    backgroundColor: "#FCF6E1",
    borderColor: "#FCF6E1",
    borderRadius: 6,
    width: "80%",
    alignSelf: "center"
  },
  buttonStyle: {
    height: 50,
    width: "80%",
    justifyContent: "center",
    backgroundColor: DARK_BROWN,
    alignSelf: "center",
    borderRadius: 6
  },
  signUpText: {
    justifyContent: "center",
    color: "#6E5849",
    alignSelf: "center",
    borderRadius: 6,
    fontSize: 16
  },
  radioButtonUnfilled: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: LIGHT_BROWN,
    borderRadius: 10
  },
  radioButtonFilled: {
    backgroundColor: DARK_BROWN,
    height: 4,
    width: 4,
    borderRadius: 10,
    padding: 3
  }
});
