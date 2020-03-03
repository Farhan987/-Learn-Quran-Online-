import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import {
  loadQuranPage,
  initializePages
} from "../../store/actions/quranAction";
class QuranLoadingScreen extends Component {
  state = {
    progress: 0
  };

  componentDidMount() {
    //// check if maping is done
    console.log("START");
    let quran = this.props.quran;
    console.log(this.props.quran);
    if (quran.totalPages === 604) {
      /// looping
      console.log("PAGES 604 MAPED: Loading Qurna pages");
      this.loadQuranPages(quran);
    } else {
      /// load maping
      console.log("INITIALIZEING MAPS");
      this.props.initializePages();
      console.log("LOADING PAGES ");
      this.loadQuranPages(quran);
      /// looping
    }
    /// loop and check if loadded ? do nothing : call api and load and set loaded true
  }
  loadQuranPages = quran => {
    for (let index = 0; index < quran.completeQuran.length; index++) {
      const quranPage = quran.completeQuran[index];
      if (quranPage.loaded === false) {
        /// load page
        console.log(`PAGE: ${quranPage.pageNo} : LOADing`);
        this.props.loadQuranPage(quranPage.pageNo, this);
      } else {
        /// do nothing
        console.log(`PAGE: ${quranPage.pageNo} : LOADED`);
        this.setState({ progress: this.state.progress + 1 });
      }
      //   if (index === quran.completeQuran.length - 1) {
      //     this.props.navigation.navigate("StudentScreens");
      //   }
    }
  };

  moveToStudent = () => {
    this.props.navigation.navigate("StudentScreens");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading Quran e pak please wait</Text>
        <Text>Progress {this.state.progress}%</Text>
        <Button title="next" onPress={() => this.moveToStudent()} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  quran: state.QuranReducer
});
export default connect(mapStateToProps, { loadQuranPage, initializePages })(
  QuranLoadingScreen
);
