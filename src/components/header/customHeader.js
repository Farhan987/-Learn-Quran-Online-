import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Header, Button, Left, Right, Text, Body, Icon } from "native-base";
import { DARK_BROWN, SCREEN_BG_COLOR } from "../../themes/color";
export default class CustomHeader extends Component {
  render() {
    return (
      <Header
        style={{
          backgroundColor: "white",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        }}
      >
        <Left>
          <Text style={{ fontSize: 20, color: DARK_BROWN }}>
            {this.props.title}
          </Text>
        </Left>

        <Right>
          {this.props.ShowSearchButton ? (
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                backgroundColor: SCREEN_BG_COLOR,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50
              }}
            >
              <Icon name="search" style={{ color: DARK_BROWN }} />
            </TouchableOpacity>
          ) : (
            <Button bordered success style={{ borderRadius: 5, height: 40 }}>
              <Text>Make Group</Text>
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}
