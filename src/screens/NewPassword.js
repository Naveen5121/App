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

const NewPassword = () => {
  return (
    <View style={styles.container}>
      {/* Top Section with Logo and Title */}
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

      {/* Bottom Section with Inputs */}
      <View style={styles.bottomHalf}>
        {/* Phone Number Field */}
        <View>
            {/* Password Field */}
            <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Create New Password</Text>
            <TextInput
                style={styles.inputRow}
                placeholder="************"
                placeholderTextColor="#D1D1D1"
                secureTextEntry
            />
            </View>
        </View>

        {/* Password Field */}
        <View style={{ marginTop: 12 }}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.inputRow}
            placeholder="************" 
            placeholderTextColor="#D1D1D1"
            secureTextEntry
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Submit</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewPassword;

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
    marginBottom: 4,
    fontWeight: '450',
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
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
    color: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  signInButton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 75,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotText: {
    color: '#E5357B',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
  },
});