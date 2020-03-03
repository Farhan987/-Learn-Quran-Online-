import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Header, Button, Left, Right, Text, Body, Icon} from 'native-base';

import {DARK_BROWN, SCREEN_BG_COLOR, LIGHT_BROWN} from '../../themes/color';
export default class CustomHeader extends Component {
  render() {
    return (
      <Header
        style={{
          backgroundColor: 'white',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          flexDirection: 'row',
        }}>
        {this.props.leftClick ? (
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon
                name="arrow-back"
                onPress={this.props.onPress}
                style={{color: DARK_BROWN}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          false
        )}
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15, color: DARK_BROWN}}>
            {this.props.title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.props.ShowSearchButton ? (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SearchQuariScreen')
              }
              style={{
                width: 45,
                height: 45,
                backgroundColor: SCREEN_BG_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Icon name="search" style={{color: DARK_BROWN}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CreateGroupScreen')
              }
              bordered
              success
              style={{
                borderRadius: 5,
                height: 30,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: LIGHT_BROWN,
              }}>
              <Text style={{fontSize: 13, color: LIGHT_BROWN}}>Add Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </Header>
    );
  }
}
