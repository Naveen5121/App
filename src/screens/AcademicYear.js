import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper';



const AcademicYear = () => {
    const [selectedYear,setSelectedYear]=useState('');
    const years = ['2022-23','2023-24','2024-25','2025-26'];
    const handleSubmit = () => {
        console.log('Selected Year:',selectedYear);
    }

  return (
    <View style={styles.container}>
      {/*Header*/}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
            <TouchableOpacity>
                <Image source={require('../assets/icons/back.png')} style={{width:36, height:36, marginRight:20 }}/>
            </TouchableOpacity>
            <Text style={styles.headtext}>Select Academic Year</Text>
        </View>
      </ImageBackground>

      {/* Second Half  */}
      <View style={styles.bottomHalf}>
        <FlatList
         data={years}
         keyExtractor={(item)=>item}
         renderItem={({item})=>(
            <View style={styles.radioContainer}>
                <RadioButton
                  value={item}
                  status={selectedYear === item ? 'checked':'unchecked'}
                  onPress={()=>setSelectedYear(item)}
                  color='#4b3baa'
                />
                <Text style={styles.radioLabel}>{item}</Text>
            </View>
         )}
        />

        {/* Submit Button  */}
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AcademicYear;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
   flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#473f97',
  },
    header:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginBottom:5,
        marginRight:100,

    },
  headtext:{
    fontSize:22,
    fontWeight:'400',
    color:'white'
  },
  bottomHalf:{
    flex: 6,
    backgroundColor: '#fff',
    padding:20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
   submit: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 50,
    alignItems: 'center',
    marginBottom:40,
    
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
   radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
  radioLabel: {
    fontSize: 18,
    color: '#000',
    fontWeight:'400',
  },

  
  
});
