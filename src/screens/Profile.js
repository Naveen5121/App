import React from 'react';
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



const Profile = () => {

    const navigation=useNavigation();

    const fields = [
    'Roll Number',
    'Date of Birth',
    'Blood Group',
    'Emergency Contact',
    'Position in Class',
    "Father's Name",
    "Mother's Name",
  ];

  return (
    <View style={styles.container}>
      
      {/* Top Section with Logo and Title */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.back}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={require('../assets/icons/back.png')} style={{width:36, height:36, marginRight:20 }}/>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/icons/user.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Naveen Kumar</Text>
        <Text style={styles.class}>Class VII B</Text>
      </ImageBackground>

      {/* Bottom Section  */}
      <View style={styles.bottomHalf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {fields.map((label, index) => (
            <View style={styles.inputRow} key={index}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={`Enter ${label}`}
                placeholderTextColor="#473f97"
              />
            </View>
          ))}

        </ScrollView>

        
        <TouchableOpacity style={styles.submitbutton}onPress={()=>{
          console.log('Submitted..')
        }}>
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
    marginBottom:0,
  },
  class:{
    fontSize:18,
    color:'#fff',
    
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
    height:50,
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
    marginBottom:30,
    alignItems: 'center',
  },
  submittext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
 back:{
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 10,
 },
});