import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Alert} from 'react-native';
import {Container, Content, Item, Icon, Input, View} from 'native-base';
import {SCREEN_BG_COLOR, LIGHT_BROWN} from '../themes/color';
import CustomFooter from '../components/footer/customFooter';
import SearchGroupComponent from '../components/groupBar/searchgroupComponent';
import {
  searchTeacher,
  sendRequestToTeacher,
} from '../store/actions/studentAction';
import {initializePages} from '../store/actions/quranAction';
import StudentRequestTeacher from '../businessLogic/requestToTeacher';
import {connect} from 'react-redux';

class SearchQuariScreen extends Component {
  state = {requestStatus: 'PENDING', studentId: '', flag: false};
  componentDidMount() {
    this.props.initializePages();
    this.props.searchTeacher('');
    AsyncStorage.getItem('Login').then(user => {
      if (user) {
        let Student = JSON.parse(user);
        let stduentID = Student.student._id;
        this.setState({studentId: stduentID});
      }
    });
  }
  render() {
    if (this.state.flag) {
      Alert.alert(this.props.studentRequestStatus.msg);
      this.setState({flag: false});
    }

    return (
      <Container style={styles.container}>
        <View
          searchBar
          rounded
          style={{
            backgroundColor: 'white',
            height: 60,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,

            alignItems: 'center',
          }}>
          <Item
            style={{
              height: 50,
              borderRadius: 15,
              backgroundColor: SCREEN_BG_COLOR,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Icon name="search" size={15} />
            <Input
              placeholder="Search Teacher"
              style={{color: LIGHT_BROWN}}
              onChangeText={text => this.props.searchTeacher(text)}
            />
          </Item>
          <View style={{height: 50}} />
          {/* <Button transparent>
            <Text>Search</Text>
          </Button> */}
        </View>
        <Content>
          {this.props.teacherSearchData._data
            ? this.props.teacherSearchData._data.teachers.map(teacher => (
                <SearchGroupComponent
                  key={teacher._id}
                  name={teacher.fullName}
                  onPress={() => {
                    this.props.sendRequestToTeacher(
                      new StudentRequestTeacher(
                        this.state.studentId,
                        teacher._id,
                        this.state.requestStatus,
                      ),
                      this,
                    );
                    // this.props.navigation.navigate('');
                  }}
                  IconName="user-plus"
                  type="FontAwesome"
                  fontSize={18}
                  navigation={this.props.navigation}
                />
              ))
            : false}
        </Content>
        <CustomFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  teacherSearchData: state.StudentReducer.searchTeacher,
  studentRequestStatus: state.StudentReducer.sendRequestToTeacher,
});
export default connect(mapStateToProps, {
  searchTeacher,
  sendRequestToTeacher,
  initializePages,
})(SearchQuariScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: SCREEN_BG_COLOR,
  },
});
