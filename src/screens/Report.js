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


import { useNavigation } from '@react-navigation/native';


const Report = () => {
    
    const navigation = useNavigation();
    const standards = ['Class 7th (2020-21)','Class 8th (2021-22)','Class 9th (2022-23)','Class 10th (2023-24)','Class 11th (2024-25)','Class 12th (2025-26)'];
    

  return (
    <View style={styles.container}>
      {/*Header*/}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={require('../assets/icons/back.png')} style={{width:40, height:40, marginRight:20 }}/>
            </TouchableOpacity>
            <Text style={styles.headtext}>Report Cards</Text>
        </View>
      </ImageBackground>

      {/* Second Half  */}
      <View style={styles.bottomHalf}>
        <FlatList
         data={standards}
         keyExtractor={(item)=>item}
         renderItem={({item})=>(
            <View style={styles.row}>
                <Text style={styles.label}>{item}</Text>
                <TouchableOpacity
                  onPress={()=>navigation.navigate('ReportCard')}>
                    <Image source={require('../assets/next.png')} style={{width:24,height:24,}}/>
                </TouchableOpacity>
                
            </View>
         )}
        />

      </View>
    </View>
  );
};

export default Report;

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
        marginRight:160,

    },
  headtext:{
    fontSize:22,
    fontWeight:'400',
    color:'white'
  },
  bottomHalf:{
    flex: 5,
    backgroundColor: '#fff',
    padding:20,
    marginTop: -30,
  },
  
 row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 20,
  borderBottomColor: '#e0e0e0',
  borderBottomWidth: 1,
},
label: {
  fontSize: 18,
  fontWeight: '500',
  color: '#000',
},


  
  
});
