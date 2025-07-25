import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { toggleHomework } from '../redux/slices/homeSlice';


const groupHomeworkByDate = (list) => {
    const grouped = {};
    list.forEach((item) => {
    const itemDate = dayjs(item.date);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    let label = itemDate.format('DD MM YYYY');
    if (itemDate.isSame(today, 'day')) label = 'Today';
    else if (itemDate.isSame(yesterday, 'day')) label = 'Yesterday';

    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  });
  return grouped;
};


const Home = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const name = useSelector((state)=>state.auth.name)
  const classSection = useSelector((state)=>state.auth.classSection)
  const homeworks = useSelector((state)=>state.home.homeworks);
  const notices = useSelector((state)=>state.home.notices);
  
  const groupedHomework=groupHomeworkByDate(homeworks);

  const handleToggleHomework = (id) => {
    dispatch(toggleHomework(id));
  };



  return (
    <ScrollView style={styles.container}>
      {/* Header */}
    <ImageBackground 
      source={require('../assets/union.png')}
      style={styles.headerBg}
      resizeMode='cover'>
      <View style={styles.header}>
        {/* Menu Button */}
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={()=>navigation.navigate('Menu')}>
          <Image
            source={require('../assets/icons/dots-menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        {/* User Info */}
        <View>
          <Text style={styles.name}>{name || 'Student Name'}</Text>
          <Text style={styles.class}>{classSection || 'Class Info'}</Text>
        </View>
      </View>
        {/* Profile Image */}
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
        <Image
          source={require('../assets/icons/user.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
      </View>
    </ImageBackground>
      {/* Notice Board */}
    <View style={styles.bottomHalf}>
      <Text style={styles.sectionTitle}>Notice Board</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={notices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <View style={[styles.noticeCard, { backgroundColor: item.bgColor }]}>
            <Image source={item.image} style={styles.noticeImage} />
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeDate}>{item.date}</Text>
          </View>
        )}
      />

      {/* Homework */}
      <Text style={styles.sectionTitle}>Homework</Text>
      <View style={styles.homeworkSection}>
        {Object.entries(groupedHomework).map(([label, items]) => (
          <View key={label} style={styles.homeworkGroup}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.homeworkCard,
                  item.completed && styles.homeworkCompleted,
                ]}
                onPress={() => handleToggleHomework(item.id)}
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
                    <Text style={styles.homeworkTitle}>{item.title}</Text>
                    <Text style={styles.homeworkSubject}>
                      {item.subject} / {label}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBg: {
    backgroundColor: '#473f97',
    justifyContent:'center',
    paddingBottom:20,
    paddingHorizontal:20,
    paddingTop:50,
    borderBottomLeftRadius:20,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  class: {
    color: '#ddd',
    fontSize: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#473f97',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  noticeCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    padding: 10,
  },
  noticeImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  noticeDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  homeworkSection: {
    paddingHorizontal: 12,
    paddingBottom: 50,
  },
  homeworkGroup: {
    marginBottom: 10,
  },
  homeworkCard: {
    backgroundColor: '#fff1ec',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  homeworkCompleted: {
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: '#473f97',
    borderColor: '#473f97',
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  homeworkSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 4,
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  headerSection: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},


});
