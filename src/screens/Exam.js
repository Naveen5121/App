import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateExamStatus } from '../redux/slices/examSlice';

const questions = [/* same questions array */];

const Exam = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentExamId = useSelector(state => state.exam.currentExamId);
  const exams = useSelector(state => state.exam.exams);
  const exam = exams.find(e => e.id === currentExamId);

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (!exam || exam.status === 'completed') {
      Alert.alert('Already Completed', 'You cannot reattempt this exam.');
      navigation.goBack();
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const handleOptionSelect = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = (auto = false) => {
    const totalQuestions = questions.length;
    const attempted = Object.keys(userAnswers).length;
    const score = `${attempted * 2}/${totalQuestions * 2}`;

    dispatch(updateExamStatus({ id: currentExamId, status: 'completed', score }));
    Alert.alert(
      auto ? 'Time’s Up!' : 'Submitted',
      auto ? 'Answers auto-submitted.' : 'Your answers have been submitted.'
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ backgroundColor: '#473f97' }}>
        <ImageBackground
          source={require('../assets/union.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/back.png')} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{exam?.title || 'Exam'}</Text>
            </View>
            <Text style={styles.pageCount}>1/30</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <Text style={styles.examCode}>Exam Code: {exam?.id}</Text>
        <View style={styles.timerBox}>
          <Image source={require('../assets/icons/timer.png')} style={styles.timerIcon} />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {questions.map((q, idx) => (
          <View key={q.id} style={styles.questionBox}>
            <Text style={styles.questionText}>Question {idx + 1} (2 Marks)</Text>
            <View style={styles.questionCard}>
              <Text style={styles.questionDesc}>{q.text}</Text>
            </View>
            {q.options.map((opt, i) => (
              <TouchableOpacity
                key={i}
                style={styles.optionRow}
                onPress={() => handleOptionSelect(q.id, opt)}
              >
                <View style={[styles.radioCircle, userAnswers[q.id] === opt && styles.radioSelected]} />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(false)}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Exam;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerLeft:{
    flexDirection:'row',
    alignItems:'center',

  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    marginLeft:8,
  },
  pageCount: {
    fontSize: 16,
    color: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 5,
  },
  examCode: {
    color: '#555',
    fontSize: 14,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: '#555',
  },
  timerText: {
    fontSize: 14,
    color: '#555',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
    paddingHorizontal:20,
  },
  questionBox: {
    marginBottom: 30,
    
  },
  questionText: {
    color: '#473f97',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  questionDesc: {
    color: '#333',
    fontSize: 14,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#aaa',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#473f97',
    borderColor: '#473f97',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#3FAC49',
    paddingVertical: 18,
    borderRadius: 40,
    marginTop: 40,
    alignItems: 'center',
    
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
