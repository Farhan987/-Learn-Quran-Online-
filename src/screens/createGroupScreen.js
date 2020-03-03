import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Header,
  Button,
  Text,
  View,
  Icon,
  Item,
  Spinner,
  Input
} from "native-base";
import { SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN } from "../themes/color";
import CustomFooter from "../components/footer/customFooter";
import SecondGroupBar from "../components/groupBar/secondgroupComponent";
import { createNewGroup } from "../store/actions/teacherAction";
import { connect } from "react-redux";
class CreateGroupScreen extends Component {
  state = {
    title: "",
    description: "",
    teacherId: "",
    flag: false,
    spinnerMove: false
  };

  componentDidMount() {
    AsyncStorage.getItem("Login").then(user => {
      if (user) {
        let Teacher = JSON.parse(user);
        let TeacherID = Teacher.teacher._id;
        this.setState({ teacherId: TeacherID });
      }
    });
  }

  render() {
    if (this.state.flag) {
      Alert.alert(this.props.createdGroupResponse.msg);
      this.props.navigation.goBack();
      this.setState({ flag: false });
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <View style={styles.viewStyle1}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back"
                style={{ color: LIGHT_BROWN, paddingLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewStyle2}>
            <Text style={{ fontSize: 20, color: DARK_BROWN, marginLeft: 7 }}>
              Make a Group
            </Text>
          </View>

          <View style={styles.viewStyle3} />
        </Header>
        <StatusBar backgroundColor={DARK_BROWN} barStyle="light-content" />
        <Content>
          <View style={{ height: 40 }} />
          <View style={styles.mainViewStyle}>
            <View style={styles.innerViewStyle}>
              <Item>
                <Input
                  placeholder="Enter your group title"
                  style={{ color: LIGHT_BROWN }}
                  onChangeText={text => this.setState({ title: text })}
                />
              </Item>
            </View>
          </View>

          <View style={{ height: 20 }} />
          <View style={styles.mainViewStyle}>
            <View style={styles.innerViewStyle}>
              <Item>
                <Input
                  placeholder="Enter your group description"
                  style={{ color: LIGHT_BROWN }}
                  onChangeText={text => this.setState({ description: text })}
                />
              </Item>
            </View>
          </View>

          <View style={{ height: 30 }} />
          <View
            style={{
              height: 60,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.state.spinnerMove ? (
              <Spinner color={DARK_BROWN} />
            ) : (
              <Button
                onPress={() => {
                  this.props.createNewGroup(
                    this.state.title,
                    this.state.teacherId,
                    this.state.description,
                    this
                  );
                }}
                style={{
                  borderRadius: 5,
                  backgroundColor: DARK_BROWN,
                  height: 40,
                  width: 120,
                  justifyContent: "center"
                }}
              >
                <Text>Add</Text>
              </Button>
            )}
          </View>
        </Content>
        {/* <CustomFooter navigation={this.props.navigation} /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  createdGroupResponse: state.TeacherReducer.createNewGroupResponse
});

export default connect(mapStateToProps, { createNewGroup })(CreateGroupScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
    justifyContent: "center"
  },
  headerStyle: {
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: "row"
  },
  viewStyle1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  viewStyle2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  mainViewStyle: {
    height: 50,
    justifyContent: "center"
  },
  innerViewStyle: {
    height: 51,
    width: "90%",
    alignSelf: "center"
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#EAEAEA",
    // backgroundColor: "white"
  },

  textViewStyle: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  }
});
