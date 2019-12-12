import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon, Text, Button, Container, Content} from 'native-base';
import {LIGHT_BROWN, DARK_BROWN, SCREEN_BG_COLOR} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';

export default class UserProfileScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.logoStyle}
              source={require('../images/profile.jpg')}
            />
          </View>
          <View style={{height: 60}} />
          <View
            style={{
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: DARK_BROWN, fontWeight: 'bold'}}>
              Farhan Akram
            </Text>
          </View>

          <View style={{height: 40}} />
          <View style={styles.boxViewStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                note
                style={{fontSize: 16, marginLeft: 10, color: LIGHT_BROWN}}>
                Mistakes History
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 10}}>
                5
              </Text>
            </View>
          </View>

          <View style={{height: 20}} />
          <View style={styles.buttonViewStyle}>
            <Button iconRight style={styles.buttonStyle}>
              <Icon
                name="sign-out"
                type="FontAwesome"
                style={{marginLeft: 10, color: LIGHT_BROWN}}
              />
              <Text style={{color: LIGHT_BROWN}}>Logout</Text>
            </Button>
          </View>
        </Content>
        <CustomFooter />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
  },
  imageViewStyle: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6E5849',
  },
  logoStyle: {
    height: 120,
    width: 120,
    borderRadius: 100,
    zIndex: 999,
    alignSelf: 'center',
    marginTop: 150,
  },
  boxViewStyle: {
    height: 50,
    width: '85%',
    backgroundColor: 'white',
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonViewStyle: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: LIGHT_BROWN,
    borderWidth: 1,
    borderRadius: 10,
  },
});
