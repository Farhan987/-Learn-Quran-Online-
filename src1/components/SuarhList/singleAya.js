import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Icon} from 'native-base';
import {DARK_BROWN, LIGHT_BROWN} from '../../../src/themes/color';
export default class SurahList extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{height: 15}} />

        <View
          style={{
            minHeight: 50,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: DARK_BROWN,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
              paddingLeft: 10,
            }}>
            <Text style={{color: LIGHT_BROWN, textAlign: 'right'}}>
              {this.props.name ? this.props.name : 'Group Name'}
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
