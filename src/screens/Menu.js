import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../../slides'
//import { useNavigation } from '@react-navigation/native'




const Menu = () => {
    
    // const navigation =  useNavigation();

    // const handlePress = (screen) => {
    //     if(screen) {
    //         navigation.navigate(screen);
    //     }
    // }


  return (
   <View style={styles.container}>
    {/* Top Profile */}
    <View style={styles.header}>
        <View style={styles.profile}>
            <Image source={require('../assets/icons/user.png')} style={styles.user}/>
            <View>
                <Text style={styles.name}>Naveen</Text>
                <Text style={styles.class}>Class 7 B</Text>
            </View>
        </View>
        <TouchableOpacity>
            <Image source={require('../assets/icons/close.png')} style={{width:35, height:35, marginRight:10 }}/>
        </TouchableOpacity>
    </View>

    {/* Menu Grid  */}

    <FlatList
        data={icons}
        renderItem={({item})=> (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.iconCircle} >
                <Image source={item.icon} style={styles.iconImage}/>
            </TouchableOpacity>
            <Text style={styles.iconLabel}>{item.label}</Text>
        </View>
        )}
        keyExtractor={(item)=>item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
    />
    
    {/* Logout  */}
    
    <TouchableOpacity>
        <Text style={styles.logout}>Logout</Text>
    </TouchableOpacity>
   </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#473f97',
        paddingTop:50,
        paddingHorizontal:16,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30,

    },
    profile:{
        flexDirection:'row',
        alignItems:'center',
    },
    user:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight:16,
    },
    name:{
        color:'white',
        fontFamily:'roboto',
        fontSize:18,
        fontWeight:'400',
    },
    class:{
        color:'white',
        fontSize:16,

    },
    grid:{
        paddingBottom:30,
    },
    itemContainer:{
        width:'33%',
        alignItems:'center',
        marginBottom:24,
    },
    iconCircle:{
        backgroundColor:'white',
        width:100,
        height:100,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:6,
        marginTop:15,
    },

    iconImage:{
        width:60,
        height:60,
        resizeMode:'contain',
    },
    iconLabel:{
        color:'white',
        fontSize:16,
        textAlign:'center'
    },
    logout: {
        textAlign:'center',
        color:'red',
        fontSize:24,
        fontWeight:'400',
        marginTop:0,
        marginBottom:60,
    }
    

   
})