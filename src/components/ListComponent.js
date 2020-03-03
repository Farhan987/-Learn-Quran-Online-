import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  FooterTab,
  Footer,
  Icon,
} from 'native-base';

export default class CustomDrawerBar extends Component {
  render() {
    return (
      <View style={styles.mainViewStyle}>
       

        <View style={styles.textViewStyle}>
          <Text style={{color: '#656565'}}>{this.props.text}</Text>
        </View>

        <TouchableOpacity
          style={styles.iconStyle2}
          onPress={this.props.onPress}>
          <Icon
            style={{color: '#656565', fontSize: 13}}
            name="chevron-right"
            type="FontAwesome"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 150,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  viewStyle: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mainViewStyle: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconStyle1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textViewStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
