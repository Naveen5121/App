import { StyleSheet, View, useWindowDimensions, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'


const OnboardingItem = ({item,scrollToNext,isLast}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container,{width}]}>
      <ImageBackground source={item.image} style={[styles.image, {width, resizeMode:'contain'}]}>
      <TouchableOpacity style={[styles.button,{position:'absolute',bottom:'9%',alignSelf:'center'},]} onPress={scrollToNext} activeOpacity={0.7}>
          <Image
            source={
              isLast
                ? require('../assets/check.png') 
                : require('../assets/arrow.png') 
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  button: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#3FAC49', 
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '6%', 
  alignSelf: 'center',
  elevation: 5,
},
buttonText: {
  color: 'white',
  fontSize: 24,
  fontWeight: 'bold',
},
icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
})