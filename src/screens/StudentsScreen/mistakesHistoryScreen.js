import React, { Component } from "react";
import { StyleSheet, AsyncStorage, StatusBar } from "react-native";
import { Container, Header, Content, Text } from "native-base";
import { SCREEN_BG_COLOR, DARK_BROWN } from "../../themes/color";
import CustomFooter from "../../components/footer/customFooter";
import MistakesHistoryComponent from "../../components/mistakesHistoryComponent/mistakesHistoryComponent";
import { connect } from "react-redux";
import { getMistakeByStatus } from "../../store/actions/studentAction";
class MistakesHistoryScreen extends Component {
  componentDidMount() {
    AsyncStorage.getItem("Login").then(user => {
      if (user) {
        let userData = JSON.parse(user);
        if (userData.teacher) {
          this.setState({
            status: "teacher"
          });
        } else if (userData.student) {
          this.setState({
            status: "student"
          });
          this.props.getMistakeByStatus(userData.student._id, "CORRECTED");
        } else {
          console.log("user.teacher114");
        }
      }
    });
  }
  state = {
    status: ""
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <Text
            style={{ fontSize: 20, color: DARK_BROWN, textAlign: "center" }}
          >
            Mistakes History
          </Text>
        </Header>
        <StatusBar backgroundColor={DARK_BROWN} barStyle="light-content" />
        <Content>
          {this.props.mistakList.map(std => (
            <MistakesHistoryComponent
              notPress={true}
              date={std.mistakeDate}
              key={std._id}
              ID={std._id}
              mistakes={
                "Surah" + " " + std.chapter + "Verse number " + std.verse
              }
              misExplanation={std.description}
            />
          ))}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  mistakList: state.StudentReducer.studentMistakeStatusListRes
});
export default connect(mapStateToProps, {
  getMistakeByStatus
})(MistakesHistoryScreen);
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
