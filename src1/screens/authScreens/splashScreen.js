import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  AsyncStorage,
} from 'react-native';

class SplashScreen extends Component {
  componentDidMount() {
    console.log('InDidMount');
    setTimeout(() => {
      AsyncStorage.getItem('Login')
        .then(user => {
          const data = JSON.parse(user);

          if (data) {
            if (data.teacher) {
              console.log('teacher');
              this.props.navigation.navigate('TeacherScreens');
            } else if (data.student) {
              console.log('student');

              this.props.navigation.navigate('StudentScreens');
            }
          } else {
            this.props.navigation.navigate('LoginScreen');
          }
        })
        .catch(err => {
          this.props.navigation.navigate('LoginScreen');
        });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/splash_bg.png')}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../images/HifzApp.png')}
            style={{height: 150, width: 170}}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
