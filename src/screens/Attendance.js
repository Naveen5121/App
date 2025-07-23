import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setAcademicYear } from '../redux/slices/academicYearSlice';

const generateMonthData = (year, attendanceData) => {
  return Array.from({ length: 12 }, (_, index) => {
    const month = dayjs(`${year}-${index + 1}-01`).format('MMM').toUpperCase();
    const key = `${year}-${String(index + 1).padStart(2, '0')}`;
    return {
      key,
      month,
      data: attendanceData[key] || null,
    };
  });
};

const Attendance = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // ✅ Get the logged-in user's phone number
  const phone = useSelector((state) => state.auth.phone);

  const selectedYear = useSelector((state) => state.academicYear.selectedYear) || dayjs().year();

  useEffect(() => {
    if (!selectedYear) {
      dispatch(setAcademicYear(dayjs().year()));
    }
  }, []);

  // ✅ Use phone number to fetch attendance
  const attendanceData = useSelector(
    (state) => state.attendance.attendanceByStudentId[phone] || {}
  );

  const monthlyData = useMemo(() => {
    return generateMonthData(selectedYear, attendanceData);
  }, [selectedYear, attendanceData]);

  const handleYearChange = (direction) => {
    const newYear = direction === 'up' ? selectedYear + 1 : selectedYear - 1;
    dispatch(setAcademicYear(newYear));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Image
              source={require('../assets/icons/back.png')}
              style={{ width: 40, height: 40, marginRight: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.headtext}>Attendance</Text>
          <Text style={styles.yearText}>{selectedYear}</Text>
          <View style={styles.arrowContainer}>
            <TouchableOpacity onPress={() => handleYearChange('up')}>
              <Image
                source={require('../assets/icons/up-arrow.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleYearChange('down')}>
              <Image
                source={require('../assets/icons/down-arrow.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.bottomHalf}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={monthlyData}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={
            <Text style={styles.yearLabel}>Year {selectedYear}</Text>
          }
          renderItem={({ item }) => {
            const [year, month] = item.key.split('-');
            return (
              <TouchableOpacity
                style={styles.attendanceRow}
                onPress={() =>
                  navigation.navigate('AttendanceMonth', {
                    year: year,
                    month: month,
                  })
                }
              >
                <View style={styles.monthCircle}>
                  <Text style={styles.monthCircleText}>{item.month}</Text>
                </View>

                <View style={styles.statusContainer}>
                  <View style={styles.statusBoxPresent}>
                    <Text style={[styles.statusNumber, { color: '#1b5e20' }]}>
                      {item.data ? item.data.present : '-'}
                    </Text>
                    <Text style={[styles.statusLabel, { color: '#1b5e20' }]}>
                      Present
                    </Text>
                  </View>

                  <View style={styles.statusBoxAbsent}>
                    <Text style={[styles.statusNumber, { color: '#c62828' }]}>
                      {item.data ? item.data.absent : '-'}
                    </Text>
                    <Text style={[styles.statusLabel, { color: '#c62828' }]}>
                      Absent
                    </Text>
                  </View>

                  <View style={styles.statusBoxLeave}>
                    <Text style={[styles.statusNumber, { color: '#1565c0' }]}>
                      {item.data ? item.data.leave : '-'}
                    </Text>
                    <Text style={[styles.statusLabel, { color: '#1565c0' }]}>
                      Leave
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
};

export default Attendance;

// ✅ Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#473f97',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
  },
  headtext: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
    marginRight: 90,
  },
  yearText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 8,
  },
  arrowContainer: {
    justifyContent: 'center',
  },
  arrow: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginVertical: 2,
  },
  bottomHalf: {
    flex: 6,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  yearLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#473f97',
    marginBottom: 10,
  },
  attendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  monthCircle: {
    backgroundColor: '#ff5c8d',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  monthCircleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  statusBoxPresent: {
    backgroundColor: '#d0f4e5',
    borderRadius: 16,
    height: 70,
    width: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  statusBoxAbsent: {
    backgroundColor: '#ffe5e5',
    borderRadius: 16,
    height: 70,
    width: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  statusBoxLeave: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    height: 70,
    width: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  statusNumber: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2,
  },
});
