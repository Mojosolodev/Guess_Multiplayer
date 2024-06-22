import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import Lobby from './Lobby';
import Game from './Game';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}