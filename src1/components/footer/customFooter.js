import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {DARK_BROWN, SCREEN_BG_COLOR} from '../../themes/color';
export default class CustomFooter extends Component {
  render() {
    return (
      <Footer style={{backgroundColor: SCREEN_BG_COLOR}}>
        <FooterTab
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <Button onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Icon name="home" style={{color: DARK_BROWN}} />
          </Button>
          <Button
            onPress={() =>
              this.props.navigation.navigate('MistakesHistoryScreen')
            }>
            <Icon
              name="history"
              type="FontAwesome"
              style={{color: DARK_BROWN, fontSize: 22}}
            />
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('UserProfileScreen')}>
            <Icon name="person" style={{color: DARK_BROWN}} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
