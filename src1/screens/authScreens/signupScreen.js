import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Spinner} from 'native-base';
import {Item, Input, Button, Text} from 'native-base';
import {LIGHT_BROWN, DARK_BROWN, TITLE_COLOR} from '../../themes/color';
import {connect} from 'react-redux';
import {teacherSignUp, teacherLogin} from '../../store/actions/teacherAction';
import {studentLogin, studentSignUp} from '../../store/actions/studentAction';

class SignupScreen extends Component {
  state = {
    //variables
    // showall:true for teacher
    //showall:false for student
    showAll: false,
    Name: '',
    EmailAddress: '',
    UniqueUserName: '',
    Password: '',
    spinnermove: false,
    //validations
    NameValidate: true,
    emailValidate: true,
    uniqueValidate: true,
    passwordvalidate: true,

    // for teacher
    flag: false,
    SignUpSuccessFull: false,
    //for student
    flag1: false,
    SignUpSuccessFull1: false,
  };
  //Name Validation
  nameValidation = text => {
    if (text === '') {
      this.setState({NameValidate: false, Name: text});
    } else {
      this.setState({NameValidate: true, Name: text});
    }
  };
  //Email Validation
  emailValidation = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({emailValidate: false});
      this.setState({EmailAddress: text});
    } else {
      this.setState({emailValidate: true});
      this.setState({EmailAddress: text});
    }
  };
  //Password Validation
  passwordValidation = text => {
    if (text.length < 7) {
      this.setState({passwordvalidate: false});
      this.setState({Password: text});
    } else {
      this.setState({passwordvalidate: true});
      this.setState({Password: text});
    }
  };
  //UniqueUserName
  uniqueUserNameValidation = text => {
    if (text === '') {
      this.setState({uniqueValidate: false, UniqueUserName: text});
    } else {
      this.setState({uniqueValidate: true, UniqueUserName: text});
    }
  };

  //ConfirmPassword
  onSignUp = () => {
    this.setState({spinnermove: true});

    if (
      this.state.Name === '' ||
      this.state.EmailAddress === '' ||
      this.state.UniqueUserName === '' ||
      this.state.Password === '' ||
      this.state.NameValidate === false ||
      this.state.emailValidate === false ||
      this.state.uniqueValidate === false ||
      this.state.passwordvalidate === false
    ) {
      if (this.state.Name === '') {
        console.log(this.state.Name);
        this.setState({spinnermove: false});
        Alert.alert('Name is required');
      } else if (this.state.EmailAddress === '') {
        console.log(this.state.EmailAddress);
        this.setState({spinnermove: false});
        Alert.alert('Email is required');
      } else if (this.state.UniqueUserName === '') {
        console.log(this.state.UniqueUserName);
        this.setState({spinnermove: false});
        Alert.alert('Enter a unique User Name');
      } else if (this.state.Password === '') {
        console.log(this.state.Password);
        this.setState({spinnermove: false});
        Alert.alert('Enter a valid Password');
      }
    } else {
      console.log('I am in else');
      this.setState({spinnermove: false});
      if (this.state.showAll === false) {
        console.log('studentSignUp');
        this.props.studentSignUp(
          this.state.Name,
          this.state.UniqueUserName,
          this.state.EmailAddress,
          this.state.Password,
          this,
        );
      } else {
        console.log('teacherSignUp');
        this.props.teacherSignUp(
          this.state.Name,
          this.state.UniqueUserName,
          this.state.EmailAddress,
          this.state.Password,
          this,
        );
      }
    }
  };
  render() {
    //Teacher Log
    if (this.state.SignUpSuccessFull === true) {
      this.props.navigation.navigate('LoginScreen');
      this.setState({SignUpSuccessFull: false});
      this.setState({
        spinnermove: false,
        Name: '',
        EmailAddress: '',
        UniqueUserName: '',
        Password: '',
      });
    }
    if (this.state.flag) {
      if (this.props.teacherSignUpData.success == true) {
        Alert.alert('Account Created Successfully');
      }
      if (this.props.teacherSignUpData.success == false) {
        Alert.alert(this.props.teacherSignUpData.msg);
        this.setState({flag: false, spinnermove: false});
      }
    }
    //Student Log
    if (this.state.SignUpSuccessFull1 === true) {
      this.props.navigation.navigate('LoginScreen');
      this.setState({SignUpSuccessFull1: false});
      this.setState({
        spinnermove: false,
        Name: '',
        EmailAddress: '',
        UniqueUserName: '',
        Password: '',
      });
    }
    if (this.state.flag1) {
      if (this.props.studentSignUpData.success == true) {
        Alert.alert('Account Created Successfully');
      }
      if (this.props.studentSignUpData.success == false) {
        Alert.alert(this.props.studentSignUpData.msg);

        this.setState({flag1: false, spinnermove: false});
      }
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../images/auth_bg.png')}
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.pageTitleStyle}>
            <Text style={styles.pageTitleTextStyle}>Sign Up</Text>
          </View>
          <View style={{height: 30}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input
                placeholder="Enter Name"
                style={{color: LIGHT_BROWN}}
                onChangeText={text => this.nameValidation(text)}
              />
            </Item>
            <View style={{height: 30, paddingLeft: '8%'}}>
              {this.state.NameValidate ? (
                <Text />
              ) : (
                <Text style={{marginLeft: 15, color: 'red', marginTop: 4}}>
                  Please Enter your Name
                </Text>
              )}
            </View>
          </View>
          <View style={{height: 30}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input
                placeholder="Enter Email"
                style={{color: LIGHT_BROWN}}
                onChangeText={text => this.emailValidation(text)}
              />
            </Item>
            <View style={{height: 30, paddingLeft: '8%'}}>
              {this.state.emailValidate ? (
                <Text />
              ) : (
                <Text style={{marginLeft: 15, color: 'red', marginTop: 4}}>
                  Please Enter your Email
                </Text>
              )}
            </View>
          </View>
          <View style={{height: 30}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input
                placeholder="Enter Unique User Name"
                style={{color: LIGHT_BROWN}}
                onChangeText={text => this.uniqueUserNameValidation(text)}
              />
            </Item>
            <View style={{height: 30, paddingLeft: '8%'}}>
              {this.state.uniqueValidate ? (
                <Text />
              ) : (
                <Text style={{marginLeft: 15, color: 'red', marginTop: 4}}>
                  Please Unique User Name
                </Text>
              )}
            </View>
          </View>
          <View style={{height: 30}} />
          <View style={{height: 50}}>
            <Item regular style={styles.textInputStyle}>
              <Input
                secureTextEntry
                placeholder="Password"
                style={{color: LIGHT_BROWN}}
                onChangeText={text => this.passwordValidation(text)}
              />
            </Item>
            <View style={{height: 30, paddingLeft: '8%'}}>
              {this.state.passwordvalidate ? (
                <Text />
              ) : (
                <Text style={{marginLeft: 15, color: 'red', marginTop: 4}}>
                  Password can not be less then 7 char
                </Text>
              )}
            </View>
          </View>

          <View style={{height: 30}} />

          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {this.state.showAll ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({showAll: false});
                }}>
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            )}
            <View style={{width: 20}} />
            <Text style={{fontSize: 17, color: '#656565'}}>Student</Text>
            <View style={{width: 30}} />

            <View style={{width: 10}} />
            {this.state.showAll ? (
              <TouchableOpacity>
                <View
                  style={[
                    styles.radioButtonUnfilled,
                    {
                      borderColor: LIGHT_BROWN,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <View style={styles.radioButtonFilled} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({showAll: true});
                }}>
                <View style={styles.radioButtonUnfilled} />
              </TouchableOpacity>
            )}
            <View style={{width: 10}} />
            <Text style={{fontSize: 17, color: '#656565'}}>Teacher</Text>
          </View>
          {/* ///////// */}

          <View style={{height: 30}} />
          <View style={{height: 50}}>
            {this.state.spinnermove ? (
              <Spinner color="brown" />
            ) : (
              <Button
                style={styles.buttonStyle}
                onPress={() => this.onSignUp()}>
                <Text>Sign Up</Text>
              </Button>
            )}
          </View>
          <View style={{height: 50, flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <View style={{width: 10}}></View>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  teacherSignUpData: state.TeacherReducer.teacherSignUp,
  studentSignUpData: state.StudentReducer.studentSignUp,
});
export default connect(
  mapStateToProps,
  {teacherSignUp, studentSignUp},
)(SignupScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitleStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleTextStyle: {
    color: TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputStyle: {
    backgroundColor: '#FCF6E1',
    borderColor: '#FCF6E1',
    borderRadius: 6,
    width: '80%',
    alignSelf: 'center',
  },
  radioButtonUnfilled: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: LIGHT_BROWN,
    borderRadius: 10,
  },
  radioButtonFilled: {
    backgroundColor: DARK_BROWN,
    height: 4,
    width: 4,
    borderRadius: 10,
    padding: 3,
  },
  buttonStyle: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#6E5849',
    alignSelf: 'center',
    borderRadius: 6,
  },
  signUpText: {
    justifyContent: 'center',
    color: '#6E5849',
    alignSelf: 'center',
    borderRadius: 6,
    fontSize: 16,
  },
});
