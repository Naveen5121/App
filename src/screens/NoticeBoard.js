import { StyleSheet, Text, View,FlatList, Image,ImageBackground,TouchableOpacity,} from 'react-native'
import React from 'react'
import { notices } from '../../slides'


const NoticeBoard = () => {

  return (
     <View style={styles.container}>
          {/* Header */}
          <ImageBackground source={require('../assets/union.png')} style={styles.topHalf} resizeMode="cover">
            <View style={styles.header}>
              <TouchableOpacity>
                <Image source={require('../assets/icons/back.png')} style={{ width: 40, height: 40, marginRight: 20 }} />
              </TouchableOpacity>
              <Text style={styles.headtext}>Notice Board</Text>
            </View>
          </ImageBackground>

          {/* Bottom Half  */}

          <View style={styles.BottomHalf}>
           <FlatList
            data={notices}
            renderItem={({item})=> (
                <View style={[styles.card, {backgroundColor:item.bgColor}]}>
                    <Image source={item.image} style={styles.image}/>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>  
              )}
              keyExtractor={(item)=> item.id}
              numColumns={2}
              contentContainerStyle={styles.list}
            />
          </View>
    </View>
  )
}

export default NoticeBoard

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,

  },
  headtext: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
    marginRight: 180,
  },
 BottomHalf:{
    flex:6.5,
    alignItems:'center',
    justifyContent:'center',
 },
 list: {
    padding: 12,
  },
  card: {
  width: '45%',
  margin: 8,
  padding: 10,
  borderRadius: 12,
},

  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
    alignSelf:'flex-start'
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#808080',
  },
})