import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

const Homework = () => {

  const navigation =useNavigation();
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: 'Do Math Assignment',
      subject: 'Mathematics',
      date: dayjs().format('YYYY-MM-DD'), // Today
      completed: false,
    },
    {
      id: 2,
      title: 'Read History Chapter',
      subject: 'History',
      date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), // Yesterday
      completed: true,
    },
    {
      id: 3,
      title: 'Science Project Research',
      subject: 'Science',
      date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), // Earlier
      completed: false,
    },
  ]);

  const toggleHomework = (id) => {
    setHomeworkList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const grouped = groupHomeworkByDate(homeworkList);

  return (
    <View style={styles.container}>
      {/*Header*/}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.navigate('Menu')}>
            <Image
              source={require('../assets/icons/back.png')}
              style={{ width: 36, height: 36, marginRight: 20 }}
            />
          </TouchableOpacity>
          <Text style={styles.headtext}>Home Work</Text>
        </View>
      </ImageBackground>

      <View style={styles.BottomHalf}>
        <ScrollView style={{ flex: 1 }}
         contentContainerStyle={styles.scroll}
         showsHorizontalScrollIndicator={false}
         >
          {Object.keys(grouped).length === 0 ? (
            <Text style={styles.emptyText}>No homework available.</Text>
          ) : (
            Object.entries(grouped).map(([label, items]) => (
              <View key={label} style={styles.section}>
                <Text style={styles.sectionTitle}>{label}</Text>
                {items.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.card, item.completed && styles.completedCard]}
                    onPress={() => toggleHomework(item.id)}
                  >
                    <View style={styles.row}>
                      <View
                        style={[
                          styles.checkbox,
                          item.completed && styles.checkedCheckbox,
                        ]}
                      >
                        {item.completed && (
                          <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>
                        )}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subject}>{item.subject}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const groupHomeworkByDate = (homeworkList) => {
  const grouped = {};
  homeworkList.forEach((item) => {
    const itemDate = dayjs(item.date);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    let label = itemDate.format('D MMM');

    if (itemDate.isSame(today, 'day')) label = 'Today';
    else if (itemDate.isSame(yesterday, 'day')) label = 'Yesterday';

    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  });

  return grouped;
};

export default Homework;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
  height: 120,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#473f97',
  width: '100%',
},

  header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 40,
  width: '100%',
},

  headtext: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  BottomHalf: {
    flex: 25,
  },
  scroll: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    color: '#473f97',
  },
  card: {
    backgroundColor: '#fff1ec',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  
  subject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#473f97',
    borderColor: '#473f97',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
