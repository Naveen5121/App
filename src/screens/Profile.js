import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileField } from '../redux/slices/authSlice';
import { useEffect } from 'react';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth.name);
  const classSection = useSelector((state) => state.auth.classSection);
  const profileDetails = useSelector((state) => state.auth.profileDetails);
  useEffect(()=> {
    setFormData(profileDetails||{});
  },[profileDetails]);

  const [formData, setFormData] = useState({ ...profileDetails });

  const profileFields = [
    { key: 'rollNumber', label: 'Roll Number' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'emergencyContact', label: 'Emergency Contact' },
    { key: 'position', label: 'Position in Class' },
    { key: 'fatherName', label: "Father's Name" },
    { key: 'motherName', label: "Mother's Name" },
  ];

  const formatDateInput = (text) => {
    const digits = text.replace(/\D/g, '');
    let formatted = '';

    if (digits.length <= 2) {
      formatted = digits;
    } else if (digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    }

    return formatted;
  };

  const handleInputChange = (key, value) => {
    if (key === 'dob') {
      const formatted = formatDateInput(value);
      setFormData((prev) => ({ ...prev, [key]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = () => {
    Object.entries(formData).forEach(([key, value]) => {
      dispatch(updateProfileField({ field: key, value }));
    });
    console.log('Submitted:', formData);
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Logo and Title */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={{ width: 36, height: 36, marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/icons/user.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>{name || 'Student Name'}</Text>
        <Text style={styles.class}>{classSection || 'Class'}</Text>
      </ImageBackground>

      {/* Bottom Section */}
      <View style={styles.bottomHalf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {profileFields.map(({ key, label }) => (
            <View style={styles.inputRow} key={key}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                placeholder={key === 'dob' ? 'dd/mm/yyyy' : `Enter ${label}`}
                placeholderTextColor="#473f97"
                value={formData[key] || ''}
                onChangeText={(text) => handleInputChange(key, text)}
                keyboardType={key === 'dob' ? 'number-pad' : 'default'}
                maxLength={key === 'dob' ? 10 : 50}
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
          <Text style={styles.submittext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#473f97',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '400',
    marginBottom: 0,
  },
  class: {
    fontSize: 18,
    color: '#fff',
  },
  bottomHalf: {
    flex: 1.2,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    height: 50,
  },
  label: {
    width: 160,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#3b3b3b',
    fontWeight: '400',
  },
  submitbutton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  submittext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
