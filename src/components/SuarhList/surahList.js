import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Icon} from 'native-base';
import {DARK_BROWN, LIGHT_BROWN} from '../../../src/themes/color';
export default class SurahList extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={{height: 20}} />
        <View
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 45,
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Text>{this.props.id}</Text> */}
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: LIGHT_BROWN, fontSize: 20}}>
                {this.props.name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 60,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() =>
                  this.props.navigation.navigate(
                    'SScreen',
                    //  {
                    //   ID: this.props.id,
                    //   stdID: this.props.studentID,
                    //   surahName: this.props.name,
                    //   show: this.props.show,
                    // }
                  )
                }>
                <Icon
                  name={'arrow-right'}
                  type={'FontAwesome'}
                  style={{
                    color: DARK_BROWN,
                    fontSize: 22,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
