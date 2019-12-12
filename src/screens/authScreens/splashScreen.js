import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('LoginScreen'), 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/splash_bg.png')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../images/logo.png')}
            style={{height: 150, width: 150}}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
