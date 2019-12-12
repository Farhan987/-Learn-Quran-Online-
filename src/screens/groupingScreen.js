import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {SCREEN_BG_COLOR} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import CustomHeader from '../components/header/customHeader';
import GroupBar from '../components/groupBar/groupComponent';
export default class GroupingScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Groups" />
        <Content>
          <GroupBar />
          <GroupBar />
          <GroupBar />
          <GroupBar />
          <GroupBar />
          <GroupBar />
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
});
