import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
import { View, TouchableOpacity } from "react-native";
import { DARK_BROWN, LIGHT_BROWN } from "../../themes/color";

export default class HeaderIconButtonTextButtonExample extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: "white", flexDirection: "row" }}>
        <View
          style={{ flex: 0.5, alignSelf: "center", justifyContent: "center" }}
        >
          <TouchableOpacity transparent onPress={this.props.onPress}>
            <Icon
              name="arrow-back"
              style={{ color: LIGHT_BROWN, fontSize: 35 }}
              onPress={this.props.onPress}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 15, color: DARK_BROWN }}>
            {this.props.Title}
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </Header>
    );
  }
}
