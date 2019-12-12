import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, Text} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import MistakesHistoryComponent from '../components/mistakesHistoryComponent/mistakesHistoryComponent';
export default class MistakesHistoryScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <Text style={{fontSize: 20, color: DARK_BROWN, textAlign: 'center'}}>
            Mistakes History
          </Text>
        </Header>
        <Content>
          <MistakesHistoryComponent />
          <MistakesHistoryComponent />
          <MistakesHistoryComponent />
          <MistakesHistoryComponent />
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
  headerStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
