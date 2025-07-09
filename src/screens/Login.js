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

const Login = () => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const VALID_PHONE = '9812345678';
  const VALID_PASSWORD = '123456';

  const handleLogin = () => {
    if (phone === VALID_PHONE && password === VALID_PASSWORD) {
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Login Failed',
        'Invalid phone number or password',
        [{ text: 'Cancel', style: 'cancel' }],
        { cancelable: true }
      );
    }
  };


  return (
    <View style={styles.container}>
      {/* Top Section with Logo and Title */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>
      </ImageBackground>

      {/* Bottom Section with Inputs */}
      <View style={styles.bottomHalf}>
        {/* Phone Number Field */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="9812345678"
            keyboardType="number-pad"
            placeholderTextColor="#D1D1D1"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Password Field */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputRow}
          placeholder="************"
          placeholderTextColor="#D1D1D1"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
    marginBottom: 4,
    fontWeight: '500',
    fontSize: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  countryCode: {
    fontSize: 35,
    fontWeight: '800',
    marginRight: 8,
    color: '#000',
    marginTop: -15,
  },
  input: {
    flex: 1,
    fontSize: 32,
    color: '#000',
    marginTop: -13,
    fontWeight: '800',
  },
  signInButton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 50,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  forgotText: {
    color: '#E5357B',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
  },
});
