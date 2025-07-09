import React, { useState, useEffect } from 'react';
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

const questions = [
  {
    id: 'q1',
    text: 'What is the capital city of Australia and why is it not Sydney or Melbourne, which are more populous?',
    options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
  },
  {
    id: 'q2',
    text: 'Explain why water expands when it freezes, unlike most other substances which contract.',
    options: ['Due to hydrogen bonding', 'It doesn’t expand', 'Because of gravity', 'Molecular pressure'],
  },
  {
    id: 'q3',
    text: 'Which planet in our solar system has the most moons and what are the implications for its gravitational pull?',
    options: ['Saturn', 'Jupiter', 'Mars', 'Neptune'],
  },
  {
    id: 'q4',
    text: 'In what year did World War II end, and what were the major contributing factors to its conclusion?',
    options: ['1945', '1939', '1942', '1941'],
  },
  {
    id: 'q5',
    text: 'Why is photosynthesis important for life on Earth, and what role does chlorophyll play in it?',
    options: ['Converts light into energy', 'Produces oxygen only', 'Absorbs sunlight', 'Supports respiration'],
  },
  {
    id: 'q6',
    text: 'Describe the process of how a bill becomes a law in a parliamentary democracy such as India.',
    options: ['Proposal → Debate → Vote → Approval', 'Elected → Voted → Declared', 'Motion → Speech → Pass', 'None of the above'],
  },
  {
    id: 'q7',
    text: 'What are the major causes of global warming, and how does deforestation contribute to it?',
    options: ['Greenhouse gases', 'Sun rays', 'Population growth', 'Technology'],
  },
  {
    id: 'q8',
    text: 'How does the human digestive system convert food into energy, and which organs play a vital role?',
    options: ['Stomach, intestines, liver', 'Kidney, lungs, heart', 'Brain, bones, muscles', 'Pancreas, skin, blood'],
  },
  {
    id: 'q9',
    text: 'What is the difference between renewable and non-renewable resources with suitable examples?',
    options: ['Sun vs coal', 'Air vs plastic', 'Paper vs pen', 'Fuel vs food'],
  },
  {
    id: 'q10',
    text: 'Explain Newton’s Third Law of Motion with at least one real-world application or example.',
    options: [
      'Every action has equal and opposite reaction',
      'Objects stay still forever',
      'Friction stops movement',
      'None of the above',
    ],
  },
];


const Exam = () => {

  const navigation=useNavigation();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min in seconds
  const [userAnswers, setUserAnswers] = useState({}); // stores answers

  
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };


  useEffect(() => {
    if (timeLeft === 0) {
      autoSaveAndSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

 
  const autoSaveAndSubmit = () => {
    console.log('Auto-saved answers:', userAnswers);
    Alert.alert('Time’s Up!', 'Your answers have been auto-saved and submitted.');

  };

  const handleSubmit = () => {
    console.log('Manually submitted:', userAnswers);
    Alert.alert('Submitted!', 'Your answers have been submitted.');
  };

  
  const handleOptionSelect = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
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
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={require('../assets/icons/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>General Knowledge...</Text>
            </View>
            <Text style={styles.pageCount}>1/30</Text>
        </View>

        </ImageBackground>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <Text style={styles.examCode}>Exam Code: 121</Text>
        <View style={styles.timerBox}>
          <Image
            source={require('../assets/icons/timer.png')}
            style={styles.timerIcon}
          />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {/* Questions */}
      <ScrollView contentContainerStyle={styles.content}>
        {questions.map((q, qIndex) => (
          <View key={q.id} style={styles.questionBox}>
           <Text style={styles.questionText}>Question {qIndex + 1} (2 Marks)</Text>
            <View style={styles.questionCard}>
            <Text style={styles.questionDesc}>
                {q.text}
            </Text>
            </View>

            {q.options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.optionRow}
                onPress={() => handleOptionSelect(q.id, opt)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    userAnswers[q.id] === opt && styles.radioSelected,
                  ]}
                />
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Manual Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Exam;

// Styles same as before
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
