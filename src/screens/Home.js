import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHomework } from '../actions/homeworkActions';

const notices = [
  { id: 1, title: 'PTM on Friday', date: '8 July' },
  { id: 2, title: 'Holiday on Monday', date: '10 July' },
  { id: 3, title: 'Sports Day Announced', date: '15 July' },
];

const Home = () => {
  const homeworkReducer = useSelector((state) => state.homework);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* Top section with background */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.headerRow}>
          {/* Left side: menu icon + name */}
          <View style={styles.leftRow}>
            <TouchableOpacity style={styles.iconBtn}>
              <Image
                source={require('../assets/icons/dots-menu.png')}
                style={styles.menuBtn}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Naveen Kumar</Text>
              <Text style={styles.class}>Class VII B</Text>
            </View>
          </View>

          {/* Right side: profile icon */}
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              source={require('../assets/icons/user.png')}
              style={styles.profileBtn}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Scrollable content below header */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.noticeTitle}>Notice Board</Text>
        <ScrollView
          style={styles.noticeScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {notices.map((n) => (
            <View key={n.id} style={styles.noticeBoard}>
              <Text style={styles.noticeText}>{n.title}</Text>
              <Text style={styles.noticeDate}>{n.date}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Home Work</Text>
        {homeworkReducer.map((hw) => (
          <TouchableOpacity
            key={hw.id}
            style={styles.hwCard}
            onPress={() => dispatch(toggleHomework(hw.id))}
          >
            <View style={styles.hwRow}>
              <View style={[styles.circle, hw.completed && styles.checked]}>
                {hw.completed && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <View style={styles.hwTextBlock}>
                <Text style={styles.hwTitle}>{hw.title}</Text>
                <Text style={styles.hwMeta}>
                  {hw.subject} / {hw.date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    height: 180,
    backgroundColor: '#473f97',
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  menuBtn: {
    width: 30,
    height: 30,
  },
  profileBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    tintColor: '#fff',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  class: {
    fontSize: 14,
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    color: '#473f97',
  },
  noticeScroll: {
    marginBottom: 20,
  },
  noticeBoard: {
    backgroundColor: '#fff1ec',
    padding: 14,
    borderRadius: 10,
    marginRight: 12,
    minWidth: 180,
  },
  noticeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  noticeDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#473f97',
  },
  hwCard: {
    backgroundColor: '#ffe9e9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  hwRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#673ab7',
    borderColor: '#673ab7',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hwTextBlock: {
    flexShrink: 1,
  },
  hwTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  hwMeta: {
    fontSize: 12,
    color: 'gray',
  },
});
