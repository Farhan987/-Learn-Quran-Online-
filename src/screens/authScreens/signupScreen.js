import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Button, Text} from 'native-base';
import {LIGHT_BROWN, DARK_BROWN, TITLE_COLOR} from '../../themes/color';

export default class SignupScreen extends Component {
  state = {showAll: true};
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/auth_bg.png')}
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.pageTitleStyle}>
            <Text style={styles.pageTitleTextStyle}>Sign Up</Text>
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

          <View style={{height: 20}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input
                placeholder="Confirm Password"
                style={{color: LIGHT_BROWN}}
              />
            </Item>
          </View>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {this.state.showAll ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({showAll: false});
                }}>
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            )}
            <View style={{width: 10}} />
            <Text style={{fontSize: 17, color: '#656565'}}>Student</Text>
            <View style={{width: 30}} />

            <View style={{width: 10}} />
            {this.state.showAll ? (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({showAll: true});
                }}>
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            )}
            <View style={{width: 10}} />
            <Text style={{fontSize: 17, color: '#656565'}}>Quari Sahab</Text>
          </View>
          {/* ///////// */}

          <View style={{height: 30}} />
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
  radioButtonUnfilled: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: LIGHT_BROWN,
    borderRadius: 10,
  },
  radioButtonFilled: {
    backgroundColor: DARK_BROWN,
    height: 4,
    width: 4,
    borderRadius: 10,
    padding: 3,
  },
  buttonStyle: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#6E5849',
    alignSelf: 'center',
    borderRadius: 6,
  },
});
