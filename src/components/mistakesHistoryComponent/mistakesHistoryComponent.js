import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon, Button } from "native-base";
import { DARK_BROWN, LIGHT_BROWN } from "../../themes/color";

export default class MistakesHistoryComponent extends Component {
  render() {
    const dateTime = String(this.props.date).split("T");

    return (
      <React.Fragment>
        <View style={{ height: 15 }} />

        <View
          style={{
            height: 80,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: DARK_BROWN,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 2
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <View
                style={{
                  height: 15,
                  width: 15,
                  borderRadius: 30,
                  backgroundColor: LIGHT_BROWN,
                  marginLeft: 10
                }}
              />
            </View>

            {this.props.notPress ? (
              <Text style={{ color: LIGHT_BROWN }}>{this.props.mistakes}</Text>
            ) : (
              <TouchableOpacity
                onPress={
                  this.props.onTab ? () => this.props.onTab() : () => false
                }
                style={{
                  flex: 4,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ color: LIGHT_BROWN }}>
                  {this.props.mistakes}
                </Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 6
              }}
            >
              <Text style={{ fontSize: 13 }}>{dateTime[0]}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 2,
              marginLeft: "14%",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 3,
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Text
                style={{ fontSize: 15 }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {this.props.misExplanation}
              </Text>
            </View>
            {this.props.ShowTick ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  success
                  onPress={this.props.onPress}
                  style={{
                    height: 25,
                    backgroundColor: "#54B929",
                    width: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4
                  }}
                >
                  <Icon
                    name="check"
                    type="FontAwesome"
                    style={{
                      color: "white",
                      fontSize: 16,

                      alignSelf: "center"
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              false
            )}
          </View>
        </View>
      </React.Fragment>
    );
  }
}
