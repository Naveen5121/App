import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';


const attendanceData = {
  '2025-01': { present: 23, absent: 3, leave: 0 },
  '2025-02': { present: 21, absent: 2, leave: 2 },
  '2025-03': { present: 24, absent: 1, leave: 0 },
  '2025-04': { present: 22, absent: 3, leave: 1 },
  '2025-05': { present: 26, absent: 0, leave: 0 },
  '2025-06': { present: 25, absent: 1, leave: 1 },
  '2025-07': { present: 20, absent: 4, leave: 3 },
  '2025-08': { present: 23, absent: 2, leave: 2 },
  '2025-09': { present: 22, absent: 3, leave: 1 },
  '2025-10': { present: 23, absent: 2, leave: 1 },
  '2025-11': { present: 24, absent: 0, leave: 2 },
  '2025-12': { present: 25, absent: 0, leave: 1 },
};

const AttendanceMonth = ({ route }) => {
  
  const { year = '2025', month = '04' } = route?.params || {};
  const navigation=useNavigation();
  const formattedMonth = String(month).padStart(2, '0');
  const key = `${year}-${formattedMonth}`;
  const data = attendanceData[key] || { present: 0, absent: 0, leave: 0 };

  const startOfMonth = dayjs(`${year}-${formattedMonth}-01`);

  const generateMarkedDates = () => {
    const marked = {};

    for (let i = 1; i <= data.present; i++) {
      const date = startOfMonth.date(i).format('YYYY-MM-DD');
      marked[date] = { customStyles: styles.presentDay };
    }

    for (let i = data.present + 1; i <= data.present + data.absent; i++) {
      const date = startOfMonth.date(i).format('YYYY-MM-DD');
      marked[date] = { customStyles: styles.absentDay };
    }

    for (
      let i = data.present + data.absent + 1;
      i <= data.present + data.absent + data.leave;
      i++
    ) {
      const date = startOfMonth.date(i).format('YYYY-MM-DD');
      marked[date] = { customStyles: styles.leaveDay };
    }

    return marked;
  };

  return (
    <View style={styles.container}>
      {/* Header with back button and title only */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headtext}>Attendance</Text>
        </View>
      </ImageBackground>

      {/* Calendar */}
      <Calendar
        style={{paddingHorizontal:15}}
        current={startOfMonth.format('YYYY-MM-DD')}
        markingType="custom"
        hideArrows={true}
        markedDates={generateMarkedDates()}
        theme={{
          textDayFontWeight: '600',
          textDayHeaderFontWeight: '600',
        }}
      />

      {/* Summary Boxes */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryBox, { backgroundColor: '#d0f4e5' }]}>
          <Text style={[styles.summaryNumber, { color: '#1b5e20' }]}>{data.present}</Text>
          <Text style={[styles.summaryLabel, { color: '#1b5e20' }]}>Present</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#ffe5e5' }]}>
          <Text style={[styles.summaryNumber, { color: '#c62828' }]}>{data.absent}</Text>
          <Text style={[styles.summaryLabel, { color: '#c62828' }]}>Absent</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#e3f2fd' }]}>
          <Text style={[styles.summaryNumber, { color: '#1565c0' }]}>{data.leave}</Text>
          <Text style={[styles.summaryLabel, { color: '#1565c0' }]}>Leave</Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceMonth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#473f97',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    width: '100%',
  },
  backIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginLeft:15,
  },
  headtext: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  summaryBox: {
    width: 90,
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  presentDay: {
    container: {
      backgroundColor: '#d0f4e5',
      borderRadius: 8,
    },
  },
  absentDay: {
    container: {
      backgroundColor: '#ffe5e5',
      borderRadius: 8,
    },
  },
  leaveDay: {
    container: {
      backgroundColor: '#e3f2fd',
      borderRadius: 8,
    },
  },
});
