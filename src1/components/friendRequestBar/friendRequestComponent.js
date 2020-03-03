import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from 'native-base';
import {DARK_BROWN} from '../../themes/color';
import {connect} from 'react-redux';
import {getStudentProfile} from '../../store/actions/studentAction';
import {teacherRequestResponse} from '../../store/actions/teacherAction';
class FriendRequestComponent extends Component {
  state = {requestStatus1: 'ACCEPTED', requestStatus2: 'REJECTED'};
  componentDidMount() {
    this.props.getStudentProfile(this.props.r.student);
  }
  render() {
    return (
      <React.Fragment>
        <View style={{height: 15}} />
        <View
          style={{
            height: 170,
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 170,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: DARK_BROWN,
              backgroundColor: 'white',
            }}>
            <View style={{height: 5}} />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 1.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../images/profile.jpg')}
                  style={{height: 70, width: 70, borderRadius: 100}}
                />
              </View>
              <View
                style={{
                  flex: 3,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {this.props.studentProfileDetail.fullName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>7 years old student of level 1 from gatwala</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => {
                    this.props.teacherRequestResponse(
                      this.props.r._id,
                      this.state.requestStatus2,
                    );
                    this.props.navigation.navigate('');
                  }}
                  danger
                  style={{
                    borderRadius: 5,
                    width: 140,
                    justifyContent: 'center',
                    backgroundColor: DARK_BROWN,
                  }}>
                  <Text> Reject </Text>
                </Button>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => {
                    this.props.teacherRequestResponse(
                      this.props.r._id,
                      this.state.requestStatus1,
                    );
                    this.props.navigation.navigate('');
                  }}
                  success
                  style={{
                    borderRadius: 5,
                    width: 140,
                    justifyContent: 'center',
                  }}>
                  <Text> Accept </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentProfileDetail: state.StudentReducer.studentProfile,
});

export default connect(mapStateToProps, {
  getStudentProfile,
  teacherRequestResponse,
})(FriendRequestComponent);
