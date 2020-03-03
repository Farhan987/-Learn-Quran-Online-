import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, Content, Text, Spinner} from 'native-base';
import {SCREEN_BG_COLOR, DARK_BROWN, LIGHT_BROWN} from '../themes/color';

import {showQuran, getSurahData} from '../store/actions/quranAction';
import {connect} from 'react-redux';
import SurahList from '../components/SuarhList/surahList';
import Header from '../components/header/backarrowHeader';
class HomeScreen extends Component {
  componentDidMount() {
    this.props.getSurahData(0, this);

    AsyncStorage.getItem('Login').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        if (userData.teacher) {
          this.setState({
            status: 'teacher',
          });
        } else if (userData.student) {
          console.log('student');
          this.setState({
            status: 'student',
          });
        } else {
          console.log('user.teacher114');
        }
      }
    });
  }
  state = {
    status: '',
    spinnerMove: false,
  };

  render() {
    const StudentID = this.props.navigation.getParam('Student', '');

    return (
      <Container style={styles.container}>
        <Header
          Title="Surah List"
          onPress={() => this.props.navigation.goBack()}
        />
        <Content>
          <View style={{height: 20}} />
          {this.state.spinnerMove ? (
            <Spinner color={LIGHT_BROWN} />
          ) : (
            this.props.suarhDataList.map(surahData => (
              <View key={surahData.id}>
                <SurahList
                  studentID={StudentID}
                  key={surahData.id}
                  id={surahData.id}
                  name={'سُورَة‎' + ' ' + surahData.arname}
                  navigation={this.props.navigation}
                />
              </View>
            ))
          )}
        </Content>
        {/* <CustomFooter navigation={this.props.navigation} /> */}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  suarhDataList: state.QuranReducer.suarhData,
});
export default connect(mapStateToProps, {showQuran, getSurahData})(HomeScreen);
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
  headerStyle: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
