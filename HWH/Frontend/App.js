import * as React from 'react';
import { View, Text,props } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import StartingScreen from './screens/StartingScreen';
import BeginScreen from './screens/BeginScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreenOP from './screens/LoginScreenOP';
import PaymentScreen1 from './screens/PaymentScreen1';
import PaymentScreen2 from './screens/PaymentScreen2';
import VregisterScreen1 from './screens/VregisterScreen1';
import VregisterScreen2 from './screens/VregisterScreen2';
import QRcodesScreen1 from './screens/QRcodesScreen1';
import PaymentAmount from './screens/PaymentAmount';
import PaymentStatus from './screens/PaymentStatus';
import OpQrScreen1 from './screens/OpQrScreen1';
import ResentTiket14 from './screens/ResentTiket14';
import OpQrScreen2 from './screens/OpQrScreen2';
import UserProfileScreen from './screens/UserProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import OPProfileScreen from './screens/OPProfileScreen';
import OpExit from './screens/OpExit.js';
import WaitingScreen  from './screens/WaitingScreen.js';
import PaymentFailed from './screens/PaymentFailed';
import RegisteredVehicles from './screens/RegisteredVehicles';
import ChatScreen from './screens/ChatScreen';
import ChatBubble from './screens/ChatBubble';


const Stack = createNativeStackNavigator();

function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartingScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen name="Begin" component={BeginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="OPLogin" component={LoginScreenOP} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Payment1" component={PaymentScreen1} />
        <Stack.Screen name="Payment2" component={PaymentScreen2} />
        <Stack.Screen name="Vregister" component={VregisterScreen1}/>
        <Stack.Screen name="QRcodes1" component={QRcodesScreen1} />
        <Stack.Screen name="vregister1" component={VregisterScreen2} />
        <Stack.Screen name="VregisterScreen2" component={VregisterScreen2} />
        <Stack.Screen name="OpQrpage" component={OpQrScreen1} />
        <Stack.Screen name="ResentTicket" component={ResentTiket14} />
        <Stack.Screen name="PaymentAmount" component={PaymentAmount} />
        <Stack.Screen name="PaymentStatus" component={PaymentStatus} />
        <Stack.Screen name="qr2" component={OpQrScreen2}/>
        <Stack.Screen name="user" component={UserProfileScreen}/>
        <Stack.Screen name="Edit" component={EditProfileScreen}/>
        <Stack.Screen name="operator" component={OPProfileScreen}/>
        <Stack.Screen name="OpExit" component={OpExit}/>
        <Stack.Screen name="OpWS" component={WaitingScreen}/>
        <Stack.Screen name="PaymentF" component={PaymentFailed} />
        <Stack.Screen name="T1" component={RegisteredVehicles} />
        <Stack.Screen name="C1" component={ChatScreen} />
        <Stack.Screen name="C2" component={ChatBubble} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <StripeProvider publishableKey="pk_test_51P3ZJyHvU44g3stxbCmjZt5NT4rJP93lBN6a8Z9mpvhW1kbTOfyYjM5wNl3EYhfAH82gnqLn3fGnqyRIMhyU3cxa00qWnvEUKx">
       <App/>
  </StripeProvider>
);


