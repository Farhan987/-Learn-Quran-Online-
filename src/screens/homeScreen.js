import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container, Content, Icon, Text} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import CustomHeader from '../components/header/customHeader';
import MistakesHistoryComponent from '../components/mistakesHistoryComponent/mistakesHistoryComponent';
export default class HomeScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Home" ShowSearchButton />
        <Content>
          <View style={{height: 20}} />
          <View style={styles.mainViewStyle}>
            <View style={styles.innerViewStyle}>
              <View style={styles.flexPart1}>
                <View style={styles.dotStyle} />
              </View>
              <View style={styles.flexPart2}>
                <Text style={{color: LIGHT_BROWN}}>
                  Start Learning where you left
                </Text>
              </View>
              <View style={styles.flexPart3}>
                <TouchableOpacity>
                  <Icon
                    name="play-circle-o"
                    type="FontAwesome"
                    style={{color: LIGHT_BROWN, fontSize: 22}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={{color: LIGHT_BROWN, fontSize: 20}}>
              Recent Mistakes
            </Text>
          </View>

          <MistakesHistoryComponent ShowTick />
          <MistakesHistoryComponent ShowTick />
          <MistakesHistoryComponent ShowTick />
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
  mainViewStyle: {
    height: 50,
    justifyContent: 'center',
  },
  innerViewStyle: {
    height: 45,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DARK_BROWN,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  flexPart1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: LIGHT_BROWN,
    marginLeft: 10,
  },
  flexPart2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexPart3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewStyle: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
