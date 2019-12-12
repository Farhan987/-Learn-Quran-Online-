import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Button,
  Text,
} from 'native-base';
import {SCREEN_BG_COLOR, LIGHT_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import GroupBar from '../components/groupBar/groupComponent';
export default class SearchScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header
          searchBar
          rounded
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <Item style={{borderRadius: 30, backgroundColor: SCREEN_BG_COLOR}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" style={{color: LIGHT_BROWN}} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <GroupBar
            name="Salman"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar
            name="Farhan"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar
            name="Zohaib"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar
            name="Umair"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar
            name="Dawood"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar
            name="Shoaib"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
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
