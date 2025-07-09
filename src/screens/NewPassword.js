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

const NewPassword = () => {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Passwords do not match. Please try again.',
        [{ text: 'Cancel', style: 'cancel' }],
        { cancelable: true }
      );
    } else {
      navigation.navigate('Home');
    }
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
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

      {/* Bottom Section */}
      <View style={styles.bottomHalf}>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.label}>Create New Password</Text>
          <TextInput
            style={styles.inputRow}
            placeholder="************"
            placeholderTextColor="#D1D1D1"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.inputRow}
            placeholder="************"
            placeholderTextColor="#D1D1D1"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
          <Text style={styles.signInText}>Submit</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity onPress={handleCancel}>
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
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
