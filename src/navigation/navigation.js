import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/authScreens/splashScreen';
import LoginScreen from '../screens/authScreens/loginScreen';
import SignupScreen from '../screens/authScreens/signupScreen';
import HomeScreen from '../screens/homeScreen';
import UserProfileScreen from '../screens/userScreen';
import SearchScreen from '../screens/searchScreen';
import AddFriendScreen from '../screens/addFriendScreen';
import MakeGroupScreen from '../screens/groupingScreen';
import MistakesHistoryScreen from '../screens/mistakesHistoryScreen';
import StudentListScreen from '../screens/studentListScreen';

const AppStackNavigator = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    LoginScreen: {screen: LoginScreen},
    SignupScreen: {screen: SignupScreen},
    HomeScreen: {screen: HomeScreen},
    UserProfileScreen: {screen: UserProfileScreen},
    SearchScreen: {screen: SearchScreen},
    AddFriendScreen: {screen: AddFriendScreen},
    MakeGroupScreen: {screen: MakeGroupScreen},
    MistakesHistoryScreen: {screen: MistakesHistoryScreen},
    StudentListScreen: {screen: StudentListScreen},
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;
