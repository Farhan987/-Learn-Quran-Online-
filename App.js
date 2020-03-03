import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AppContainer from './src/navigation/navigation';
import store from './src/store/index';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
