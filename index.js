import { AppRegistry } from 'react-native';
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import Chatroom from './pages/Chatroom'
import Contact from './pages/Contact'
import { StackNavigator } from 'react-navigation';

const navigation = StackNavigator({
    Login: { 
        screen: Login,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    Contact: { 
        screen: Contact,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    Chatroom: { 
        screen: Chatroom,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    Register: { 
        screen: Register,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    
    Forgotpassword: { 
        screen: Forgotpassword,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
  });

AppRegistry.registerComponent('chatapp', () => navigation);
