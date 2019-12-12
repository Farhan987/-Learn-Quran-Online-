import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from './src/screens/authScreens/splashScreen';
import LoginScreen from './src/screens/authScreens/loginScreen';
import SignupScreen from './src/screens/authScreens/signupScreen';
import AddFriendScreen from './src/screens/addFriendScreen';
import GroupingScreen from './src/screens/groupingScreen';
import HomeScreen from './src/screens/homeScreen';
import MistakesHistoryScreen from './src/screens/mistakesHistoryScreen';
import SearchScreen from './src/screens/searchScreen';
import StudentListScreen from './src/screens/studentListScreen';
import UserProfileScreen from './src/screens/userScreen';
import AppContainer from './src/navigation/navigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
