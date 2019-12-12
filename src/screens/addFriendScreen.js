import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Text,
  View,
  Icon,
  Item,
  Input,
} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import GroupBar from '../components/groupBar/groupComponent';
export default class AddFriendScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <View style={styles.viewStyle1}>
            <Text style={{fontSize: 20, color: DARK_BROWN, marginLeft: 7}}>
              Make a Group
            </Text>
          </View>
          <View style={styles.viewStyle2}>
            <Text style={{color: DARK_BROWN, fontSize: 18}}>1</Text>
          </View>

          <View style={styles.viewStyle3}>
            <Button
              bordered
              success
              style={{borderRadius: 5, height: 35, marginLeft: 15}}>
              <Text>Add</Text>
            </Button>
          </View>
        </Header>
        <Content>
          <View style={{height: 20}} />
          <View style={styles.mainViewStyle}>
            <View style={styles.innerViewStyle}>
              <Item>
                <Icon name="person" style={{color: LIGHT_BROWN}} />
                <Input
                  placeholder="Enter your group name"
                  style={{color: LIGHT_BROWN}}
                />
              </Item>
            </View>
          </View>

          <View style={styles.textViewStyle}>
            <Text style={{color: LIGHT_BROWN, fontSize: 20}}>
              Add People from your friend list
            </Text>
          </View>

          <GroupBar
            name="Salman"
            IconName="user-plus"
            type="FontAwesome"
            fontSize={18}
          />
          <GroupBar name="Farhan" showImage fontSize={18} />
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
    flexDirection: 'row',
  },
  viewStyle1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  viewStyle3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  mainViewStyle: {
    height: 50,
    justifyContent: 'center',
  },
  innerViewStyle: {
    height: 51,
    width: '90%',
    alignSelf: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#EAEAEA",
    // backgroundColor: "white"
  },

  textViewStyle: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
