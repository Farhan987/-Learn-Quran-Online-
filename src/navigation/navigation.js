import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import SScreen from "../screens/QuranScreen/surahData";

import SplashScreen from "../screens/authScreens/splashScreen";
import LoginScreen from "../screens/authScreens/loginScreen";
import SignupScreen from "../screens/authScreens/signupScreen";
import HomeScreen from "../screens/StudentsScreen/homeScreen";
import UserProfileScreen from "../screens/authScreens/userScreen";
import RecentMistake from "../screens/RecentMistakScreen";
// import AddStudentToGroup from '../screens/addStudentToGroup';
import SearchQuariScreen from "../screens/searchQuariScreen";
import CreateGroupScreen from "../screens/createGroupScreen";
import MakeGroupScreen from "../screens/TeacherScreens/groupingScreen";
import MistakesHistoryScreen from "../screens/StudentsScreen/mistakesHistoryScreen";
import StudentListScreen from "../screens/TeacherScreens/studentListScreen";
import SurahScreen from "../screens/surahScreen";
import FriendRequestScreen from "../screens/TeacherScreens/friendRequestScreen";
import CompleteSurah from "../screens/completeSurah";
import AddFriendScreenToGroup from "../screens/TeacherScreens/addFriendScreenToGroup";
import SurahDrawerList from "../screens/QuranScreen/DrawerComponents/surahNameDrawer";
import JuzListDrawer from "../screens/QuranScreen/DrawerComponents/JuzListDrawer";
import TeacherMainScreen from "../screens/authScreens/TeacherMainScreen";
import FooterScreen from "../screens/StudentsScreen/FooterScreen";
import QuranLoadingScreen from "../screens/QuranScreen/quranLoadingScreen";
const QuarnNavigator = createStackNavigator(
  {
    SScreen: { screen: SScreen }
  },
  {
    initialRouteName: "SScreen",
    headerMode: "none"
  }
);
const SurahDrawer = createDrawerNavigator(
  { SScreen: { screen: QuarnNavigator } },

  {
    drawerPosition: "left",
    drawerType: "front",
    drawerWidth: "50%",
    contentComponent: JuzListDrawer
  }
);
const JuzDrawer = createDrawerNavigator(
  { SScreen: { screen: SurahDrawer } },

  {
    drawerWidth: "50%",
    drawerPosition: "right",
    contentComponent: SurahDrawerList,
    drawerOpenRoute: "DrawerRightOpen",
    drawerCloseRoute: "DrawerRightClose",
    drawerToggleRoute: "DrawerRightToggle"

    // initialRouteName: 'SScreen',
  }
);
const AuthStackNavigator = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none"
  }
);
const StudentScreens = createStackNavigator(
  {
    FooterScreen: { screen: FooterScreen },

    SearchQuariScreen: { screen: SearchQuariScreen }
  },
  {
    initialRouteName: "FooterScreen",
    headerMode: "none"
  }
);
const TeacherScreens = createStackNavigator(
  {
    TeacherMainScreen: { screen: TeacherMainScreen },
    MistakesHistoryScreen: { screen: MistakesHistoryScreen },
    MakeGroupScreen: { screen: MakeGroupScreen },
    // AddStudentToGroup: {screen: AddStudentToGroup},
    StudentListScreen: { screen: StudentListScreen },
    SurahScreen: { screen: SurahScreen },
    FriendRequestScreen: { screen: FriendRequestScreen },
    CompleteSurah: { screen: CompleteSurah },
    CreateGroupScreen: { screen: CreateGroupScreen },
    AddFriendScreenToGroup: { screen: AddFriendScreenToGroup },
    RecentMistake: { screen: RecentMistake },
    SScreen: { screen: JuzDrawer }
    // DrawerScreen: {screen: AppDrawer},
  },
  {
    initialRouteName: "TeacherMainScreen",
    headerMode: "none"
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthScreens: { screen: AuthStackNavigator },
    TeacherScreens: { screen: TeacherScreens },
    StudentScreens: { screen: StudentScreens },
    QuranLoadingScreen: { screen: QuranLoadingScreen }
  },
  {
    initialRouteName: "AuthScreens",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
