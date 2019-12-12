import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Icon } from "native-base";
import { DARK_BROWN, LIGHT_BROWN } from "../../themes/color";
export default class GroupBar extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 20 }} />
        <View
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
                {this.props.name ? this.props.name : "Group Name"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity>
                {this.props.showImage ? (
                  <Image source={require("../../images/user_check.png")} />
                ) : (
                  <Icon
                    name={
                      this.props.IconName
                        ? this.props.IconName
                        : "arrow-forward"
                    }
                    type={this.props.type ? this.props.type : ""}
                    style={{
                      color: DARK_BROWN,
                      fontSize: this.props.fontSize ? this.props.fontSize : 22
                    }}
                  />
                  // <Image source={require("../../images/add-user.png")} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
