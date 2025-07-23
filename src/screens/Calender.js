import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Calender = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(dayjs('2025-07-01'));
  const [selectedDate, setSelectedDate] = useState(currentDate.format('YYYY-MM-DD'));
  const [visibleMonth, setVisibleMonth] = useState(currentDate);

  const handleYearChange = (direction) => {
    const newDate = direction === 'up'
      ? currentDate.add(1, 'year')
      : currentDate.subtract(1, 'year');

    setCurrentDate(newDate);
    setSelectedDate(newDate.format('YYYY-MM-DD'));
    setVisibleMonth(newDate);
  };

 
  const events = useSelector((state) => state.calendar.eventsMap || {});


  const getEventsForVisibleMonth = () => {
    const month = visibleMonth.format('MM');
    const year = visibleMonth.format('YYYY');

    const allEvents = Object.values(events).flat(); 
    return allEvents.filter(event => {
      const eventDate = dayjs(event.date);
      return eventDate.format('MM') === month && eventDate.format('YYYY') === year;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground source={require('../assets/union.png')} style={styles.topHalf} resizeMode="cover">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/back.png')} style={{ width: 40, height: 40, marginRight: 20 }} />
          </TouchableOpacity>
          <Text style={styles.headtext}>Calendar</Text>
          <Text style={styles.yearText}>{currentDate.format('YYYY')}</Text>
          <View style={styles.arrowContainer}>
            <TouchableOpacity onPress={() => handleYearChange('up')}>
              <Image source={require('../assets/icons/up-arrow.png')} style={styles.arrow} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleYearChange('down')}>
              <Image source={require('../assets/icons/down-arrow.png')} style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        <Text style={styles.month}>{visibleMonth.format('MMMM YYYY')}</Text>
        <View style={styles.calenderStyle}>
          <Calendar
            key={visibleMonth.format('YYYY-MM')}
            current={visibleMonth.format('YYYY-MM-DD')}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            onMonthChange={(month) => {
              const newMonth = dayjs(`${month.year}-${String(month.month).padStart(2, '0')}-01`);
              setVisibleMonth(newMonth);
            }}
            hideExtraDays={true}
            dayComponent={({ date }) => {
              const dateStr = date.dateString;
              const isSelected = dateStr === selectedDate;
              const hasEvents = events[dateStr];

              return (
                <TouchableOpacity
                  onPress={() => setSelectedDate(dateStr)}
                  style={{ alignItems: 'center', marginTop: 4 }}
                >
                  <View
                    style={{
                      backgroundColor: isSelected ? '#F85A9D' : 'transparent',
                      borderRadius: 8,
                      width: 36,
                      height: 36,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{
                      color: isSelected ? 'white' : 'black',
                      fontWeight: isSelected ? 'bold' : 'normal',
                    }}>
                      {date.day}
                    </Text>
                  </View>
                  {hasEvents && (
                    <View style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'blue',
                      marginTop: 2,
                    }} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Events List */}
        <View style={styles.eventList}>
          <FlatList
            data={getEventsForVisibleMonth()}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item }) => (
              <View style={styles.eventRow}>
                <View style={styles.dateBadge}>
                  <Text style={styles.eventDay}>{dayjs(item.date).format('DD')}</Text>
                  <Text style={styles.eventMonth}>{dayjs(item.date).format('MMM')}</Text>
                </View>
                <View style={[styles.eventCard, { backgroundColor: item.color }]}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventType}>{item.type}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noEventsText}>No events for this month</Text>
            }
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Calender;

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
    marginRight: 150,
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
  },
  calenderStyle: {
    paddingHorizontal: 8,
  },
  month: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
    color: '#473f97',
    marginRight: 280,
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  dateBadge: {
    backgroundColor: '#F85A9D',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventDay: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventMonth: {
    color: 'white',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventType: {
    fontSize: 12,
    color: '#777',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 10,
    fontSize: 15,
  },
});
