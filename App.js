import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './src/redux/store';


import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import EnterOtp from './src/screens/EnterOtp';
import NewPassword from './src/screens/NewPassword';
import Home from './src/screens/Home';
import Menu from './src/screens/Menu';
import Profile from './src/screens/Profile';
import Homework from './src/screens/Homework';
import Attendance from './src/screens/Attendance';
import FeeDetails from './src/screens/FeeDetails';
import Examination from './src/screens/Examination';
import ReportCard from './src/screens/ReportCard';
import Calender from './src/screens/Calender';
import Multimedia from './src/screens/Multimedia';
import AcademicYear from './src/screens/AcademicYear';
import NoticeBoard from './src/screens/NoticeBoard';
import Exam from './src/screens/Exam';
import Report from './src/screens/Report';
import AttendanceMonth from './src/screens/AttendanceMonth';
import BootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer 
        onReady={async()=> await BootSplash.hide({fade:true})}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EnterOtp" component={EnterOtp} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Menu" component={Menu}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Homework" component={Homework}/>
            <Stack.Screen name="Attendance" component={Attendance}/>
            <Stack.Screen name="FeeDetails" component={FeeDetails}/>
            <Stack.Screen name="Examination" component={Examination}/>
            <Stack.Screen name="ReportCard" component={ReportCard}/>
            <Stack.Screen name="Calender" component={Calender}/>
            <Stack.Screen name="Multimedia" component={Multimedia}/>
            <Stack.Screen name="AcademicYear" component={AcademicYear}/>
            <Stack.Screen name="NoticeBoard" component={NoticeBoard}/>
            <Stack.Screen name="Exam" component={Exam}/>
            <Stack.Screen name='Report' component={Report}/>
            <Stack.Screen name='AttendanceMonth' component={AttendanceMonth}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
