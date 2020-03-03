import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container, Text, Content} from 'native-base';
import {chapterList} from '../../../store/actions/quranAction';
import SurahList from '../../../components/ListComponent';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import {LIGHT_BROWN} from '../../../themes/color';

class SurahNameDrawer extends Component {
  componentDidMount() {
    this.props.chapterList();
  }
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  moveToIndex = index => {
    this.props.contextQuran.scrollToIndex1(index);
  };

  render() {
    return (
      <Container
        style={{
          borderRadius: 10,
        }}>
        <View style={{flex: 1, borderRadius: 30}}>
          <View
            style={{
              elevation: 1,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.6,
              borderBottomColor: 'brown',
              backgroundColor: '#dcb975',
            }}>
            <Text style={{color: 'white'}}>Surah List</Text>
          </View>
          <View style={{height: 6}}></View>
          <Content>
            {this.props.SurahList.map((item, index) => (
              <View
                style={{
                  height: 40,
                  width: '100%',
                }}
                key={item._id}>
                <TouchableOpacity
                  onPress={() => this.moveToIndex(item.page - 1)}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View
                    style={{
                      width: '70%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'HelveticaNeue-Medium',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 16,
                        paddingTop: 2,
                        alignSelf: 'center',
                      }}>
                      {item.surah.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{height: 10}}></View>
                <View
                  style={{
                    backgroundColor: LIGHT_BROWN,
                    height: 1,
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <Text>1</Text>
                </View>
              </View>
            ))}
          </Content>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  SurahList: state.QuranReducer.chapterList,
  contextQuran: state.QuranContextReducer.context,
});
export default connect(mapStateToProps, {chapterList})(SurahNameDrawer);
const styles = StyleSheet.create({
  upperMainViewStyle: {
    height: 130,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
