import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Item, Input, Button, Text} from 'native-base';
import {LIGHT_BROWN, DARK_BROWN, TITLE_COLOR} from '../../themes/color';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/auth_bg.png')}
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.pageTitleStyle}>
            <Text style={styles.pageTitleTextStyle}>Login</Text>
          </View>
          <View style={{height: 30}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input placeholder="Enter Name" style={{color: LIGHT_BROWN}} />
            </Item>
          </View>
          <View style={{height: 20}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input placeholder="Password" style={{color: LIGHT_BROWN}} />
            </Item>
          </View>

          <View style={{height: 45}} />
          <View style={{height: 50}}>
            <Button style={styles.buttonStyle}>
              <Text>Continue</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitleStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleTextStyle: {
    color: TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputStyle: {
    backgroundColor: '#FCF6E1',
    borderColor: '#FCF6E1',
    borderRadius: 6,
    width: '80%',
    alignSelf: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: DARK_BROWN,
    alignSelf: 'center',
    borderRadius: 6,
  },
});
