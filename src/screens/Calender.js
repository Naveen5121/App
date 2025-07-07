import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Calendar,CalendarList } from 'react-native-calendars'


const Calender = () => {
  return (
    <View style={styles.container}>
        {/* Header  */}
        <View style={styles.header}>
            <TouchableOpacity>
                <Image source={require('../assets/icons/back.png')} style={styles.back}/>
            </TouchableOpacity>
            <Text style={styles.headtext}>Calender</Text>
            <View style={styles.yearpicker}>
                
            </View>

        </View>
    </View>
  )
}

export default Calender

const styles = StyleSheet.create({})