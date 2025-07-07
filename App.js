import React from 'react';
import Onboarding from './src/screens/Onboarding';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import EnterOtp from './src/screens/EnterOtp';
import NewPassword from './src/screens/NewPassword';
import AutoFillOtp from './src/screens/AutoFillOtp';
import Menu from './src/screens/Menu';
import Profile from './src/screens/Profile';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Onboarding'>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});