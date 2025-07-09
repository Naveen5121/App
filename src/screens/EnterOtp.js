import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const EnterOtp = () => {

  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 4) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };


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
        <Text style={styles.label}>Enter OTP</Text>
         <View style={styles.otpWrapper}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.otpBox}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                />
              ))}
            </View>

            {/* Send Again just below OTP input */}
            <TouchableOpacity style={styles.sendagainbutton}>
              <Text style={styles.sendagain}>Send Again</Text>
            </TouchableOpacity>
          </View>


             {/* Sign In Button */} 
    <View style={{ marginTop: 100 }}>
        <TouchableOpacity style={styles.signInButton}
         onPress={() => {
          const enteredOtp = otp.join('');
          if (enteredOtp === '12345') {
            navigation.navigate('NewPassword');
          } else {
            alert('Invalid OTP. Please try again.');
          }
        }}>
          <Text style={styles.generateotp}> Verify </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
    </View>
      </View>
    </View>
  );
};

export default EnterOtp;

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
    marginTop: 14,
    marginBottom: 6,
    fontWeight: '500',
    fontSize: 18,
    alignSelf:'flex-start',
    marginLeft:14,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  countryCode: {
    fontSize: 20,
    fontWeight: '800',
    marginRight: 8,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#000',
  },
   signInButton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: -20,
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
  otpBox: {
    width: 55,
    height: 60,
    borderRadius: 10,
    marginTop:15,
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    fontSize: 22,
    color: '#000',
    elevation: 2,
  },
  otpWrapper: {
  alignItems: 'center',
  marginBottom: 20,
},
otpContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '90%',
  marginBottom: 10,
},
sendagain: {
  color: '#E5357B',
  fontWeight: '450',
  fontSize: 18,
  marginTop:8,
  
},
sendagainbutton:{
  alignSelf:'flex-start',
  marginTop:2,
  marginLeft:14,
}

});
