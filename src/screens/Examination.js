// src/screens/Examination.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentExamId } from '../redux/slices/examSlice';

const Examination = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exams = useSelector(state => state.exam.exams);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#473f97' }}>
        <ImageBackground
          source={require('../assets/union.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/back.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Examination</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Examination List</Text>

        <FlatList
          data={exams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.examTitle}>{item.title}</Text>
                <View style={styles.durationRow}>
                  <Image
                    source={require('../assets/icons/timer.png')}
                    style={styles.clockIcon}
                  />
                  <Text style={styles.durationText}>Duration: {item.duration}</Text>
                </View>

                {item.status === 'completed' ? (
                  <View style={styles.completedRow}>
                    <Text style={styles.scoreText}>Score: {item.score}</Text>
                    <View style={styles.statusBoxCompleted}>
                      <Text style={styles.statusText}>Completed</Text>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.statusBoxStart}
                    onPress={() => {
                      dispatch(setCurrentExamId(item.id));
                      navigation.navigate('Exam');
                    }}
                  >
                    <Image
                      source={require('../assets/icons/play.png')}
                      style={styles.playIcon}
                    />
                    <Text style={styles.statusText}>Start Test</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity style={styles.arrowContainer}>
                <Image
                  source={require('../assets/right-arrow.png')}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Examination;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  backIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#473f97',
    marginBottom: 10,
    marginTop:10,
  },
  card: {
    backgroundColor: '#d4ffea',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: '#555',
  },
  durationText: {
    fontSize: 12,
    color: '#555',
  },
  scoreText: {
    fontSize: 14,
    color: '#3FAC49',
  },
  completedRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 6,
  },
  statusBoxStart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff5c8d',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  playIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
    tintColor: '#fff',
  },
  statusBoxCompleted: {
    backgroundColor: '#3FAC49',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  arrowContainer: {
    paddingTop:30,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
