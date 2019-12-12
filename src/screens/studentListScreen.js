import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {SCREEN_BG_COLOR} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import CustomHeader from '../components/header/customHeader';
import GroupBar from '../components/groupBar/groupComponent';
export default class StudentListScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="Students" />
        <Content>
          <GroupBar name="Salman" />
          <GroupBar name="Farhan" />
          <GroupBar name="Zohaib" />
          <GroupBar name="Umair" />
          <GroupBar name="Dawood" />
          <GroupBar name="Shoaib" />
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
