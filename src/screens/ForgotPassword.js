import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { generateOtp, setPhone } from '../redux/slices/userSlice';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [phone,setPhoneInput] = useState('');

  const handleGenerateOtp = () => {
    if(phone.length===10){
      dispatch(setPhone(phone));
      dispatch(generateOtp());
      navigation.navigate('EnterOtp');
    }else{
      Alert.alert(
        'Invalid Phone number',
        'Please enter a valid phone number',
        [{ text: 'Cancel', style: 'cancel' }],
        { cancelable: true }
    );
    }
  }

  return (
    <View style={styles.container}>
   
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Forgot Password</Text>
      </ImageBackground>

      <View style={styles.bottomHalf}>
        {/* Phone Number Field */}
        <View>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="9812345678"
              keyboardType="phone-pad"
              placeholderTextColor="#D1D1D1"
              maxLength={10}
              value={phone}
              onChangeText={(text)=>setPhoneInput(text)}
            />
          </View>
        </View>

             {/* Sign In Button */} 
    <View style={{ marginTop: 100 }}>
        <TouchableOpacity style={styles.signInButton} onPress={handleGenerateOtp}>
          <Text style={styles.generateotp}>Generate OTP</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
    </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#473f97',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 90,
    marginBottom: 20,
    
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: '400',
    marginTop: 30,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  countryCode: {
    fontSize: 35,
    fontWeight: '800',
    marginRight: 8,
    color: '#000',
    marginTop:-15
  },
  input: {
    flex: 1,
    fontSize: 32,
    color: '#000',
    marginTop:-13,
    fontWeight: '800',

  },
  signInButton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 45,
    alignItems: 'center',
  },
  generateotp: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  cancel: {
    color: '#E5357B',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
    
  },
});
