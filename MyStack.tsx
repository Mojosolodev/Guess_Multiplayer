import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import JoinRoom from './JoinRoom';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
    </Stack.Navigator>
  );
}