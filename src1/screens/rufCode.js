/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class App extends Component {
  state = {
    myList: [
      {_id: 0, text: 'my name is ata muhiul din', heighlighted: false},
      {_id: 1, text: 'my name is Ali', heighlighted: false},
      {_id: 2, text: 'my name is Akmal', heighlighted: false},
      {_id: 3, text: 'my name is Usman', heighlighted: false},
      {_id: 4, text: 'my name is Akram', heighlighted: false},
      {_id: 4, text: 'my name is Akram', heighlighted: false},
      {_id: 4, text: 'my name is Akram', heighlighted: false},
    ],
  };
  toggleHeighlighted = _id => {
    const index = this.state.myList.findIndex(t => t._id === _id);
    if (index >= 0) {
      let myList = [...this.state.myList];
      myList[index].heighlighted = !myList[index].heighlighted;
      this.setState({myList: myList});
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{width: '80%', alignSelf: 'center', textAlign: 'center'}}>
          {this.state.myList.map(t => (
            <Text
              onPress={() => this.toggleHeighlighted(t._id)}
              key={t._id}
              style={{
                color: t.heighlighted ? '#FFAA1D' : 'black',
                fontSize: 25,
              }}>
              {t.text}
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderColor: 'red',
                  borderWidth: 1,
                  borderRadius: 50,
                }}></View>
            </Text>
          ))}
        </Text>
      </View>
    );
  }
}
export default App;
