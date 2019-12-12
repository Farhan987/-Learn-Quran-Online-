import React, { Component } from "react";
import { View } from "react-native";
import { Text, Icon, Button } from "native-base";
import { DARK_BROWN, LIGHT_BROWN } from "../../themes/color";
export default class MistakesHistoryComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 15 }} />
        <View
          style={{
            height: 90,
            justifyContent: "center"
          }}
        >
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
              <View
                style={{
                  flex: 4,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ color: LIGHT_BROWN }}>Mistakes 1</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 10 }}>10/11/2019</Text>
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
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text style={{ fontSize: 10 }}>
                  This mistsake is in surah fateha...Proper pronunciation is
                  required
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
                  <Button
                    bordered
                    success
                    style={{
                      height: 30,
                      width: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10
                    }}
                  >
                    <Icon
                      name="check"
                      type="FontAwesome"
                      style={{ color: "#54B929" }}
                    />
                  </Button>
                </View>
              ) : (
                false
              )}
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
