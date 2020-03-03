import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import { TouchableOpacity } from "react-native";
import { DARK_BROWN, SCREEN_BG_COLOR } from "../../themes/color";
export default class CustomFooter extends Component {
  render() {
    return (
      <Footer style={{ backgroundColor: SCREEN_BG_COLOR }}>
        <FooterTab
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={this.props.HomeScreen}
          >
            <Icon name="home" style={{ color: DARK_BROWN }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={this.props.MistakesHistoryScreen}
          >
            <Icon
              name="history"
              type="FontAwesome"
              style={{ color: DARK_BROWN, fontSize: 22 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={this.props.UserProfileScreen}
          >
            <Icon name="person" style={{ color: DARK_BROWN }} />
          </TouchableOpacity>
        </FooterTab>
      </Footer>
    );
  }
}
