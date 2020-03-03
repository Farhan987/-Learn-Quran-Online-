import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Icon, Text, Spinner } from "native-base";
import { SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN } from "../../themes/color";
import CustomFooter from "../../components/footer/customFooter";
import { connect } from "react-redux";
import HomeScreen from "./homeScreen";
import MistakeHistoryScreen from "./mistakesHistoryScreen";
import UserProfileScreen from "../authScreens/userScreen";
class FooterScreen extends Component {
  state = {
    status: "",
    studentID: 0,
    flag: false,
    spinnerMove: false,
    homeScree: true,
    mistakeHistoryScree: false,
    userProfileScree: false
  };

  render() {
    return (
      <Container style={styles.container}>
        {this.state.homeScree ? (
          <HomeScreen navigation={this.props.navigation} />
        ) : (
          false
        )}
        {this.state.mistakeHistoryScree ? (
          <MistakeHistoryScreen navigation={this.props.navigation} />
        ) : (
          false
        )}
        {this.state.userProfileScree ? (
          <UserProfileScreen navigation={this.props.navigation} />
        ) : (
          false
        )}
        <CustomFooter
          h={this.state.homeScree}
          HomeScreen={() =>
            this.setState({
              homeScree: true,
              mistakeHistoryScree: false,
              userProfileScree: false
            })
          }
          MistakesHistoryScreen={() =>
            this.setState({
              homeScree: false,
              mistakeHistoryScree: true,
              userProfileScree: false
            })
          }
          UserProfileScreen={() =>
            this.setState({
              homeScree: false,
              mistakeHistoryScree: false,
              userProfileScree: true
            })
          }
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  mistakList: state.StudentReducer.studentMistakeStatusListRes,
  urlToBackScreen: state.TeacherReducer.backFromHomScreenRes,
  upDateStatusRes: state.TeacherReducer.upDateStatus
});

export default connect(mapStateToProps, {})(FooterScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR
  },
  mainViewStyle: {
    height: 50,
    justifyContent: "center"
  },
  innerViewStyle: {
    height: 45,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DARK_BROWN,
    flexDirection: "row",
    backgroundColor: "white"
  },
  flexPart1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dotStyle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: LIGHT_BROWN,
    marginLeft: 10
  },
  flexPart2: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  flexPart3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textViewStyle: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  }
});
