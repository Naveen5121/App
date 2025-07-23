import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const SectionTitleWithLines = ({ title }) => (
  <View style={styles.sectionTitleWrapper}>
    <View style={styles.coloredLine} />
    <Text style={styles.fullLineTitle}>{title}</Text>
    <View style={styles.coloredLine} />
  </View>
);

const ReportCard = () => {

  const profileFields = [
    { label: 'Roll Number', key: 'rollNumber' },
    { label: 'Date of Birth', key: 'dob' },
    { label: 'Blood Group', key: 'bloodGroup' },
    { label: 'Emergency Contact', key: 'emergencyContact' },
    { label: 'Position in Class', key: 'position' },
    { label: "Father's Name", key: 'fatherName' },
    { label: "Mother's Name", key: 'motherName' },
  ];


  const route = useRoute();
  const selectedClass = route.params?.selectedClass || 'Class Info';
  const navigation=useNavigation();
  const name = useSelector((state)=>state.auth.name);
  const classSection = useSelector((state)=>state.auth.classSection);
  const phone = useSelector((state) => state.auth.phone);
  const profile = useSelector((state) => state.auth.profileMap?.[phone]) || {};
  const attendance = useSelector((state)=> state.reportCard.attendance?.[phone]) || {};
  const results = useSelector((state)=> state.reportCard.results?.[phone]) || {};
  const remarks = useSelector((state)=>state.reportCard.remarks?.[phone]) || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{selectedClass}</Text>
        </View>
      </ImageBackground>

      

      <ScrollView contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.schoolHeader}>
        <Image
            source={require('../assets/school-logo.png')} // replace with actual logo path
            style={styles.schoolLogo}
        />
        <View style={styles.schoolDetails}>
            <Text style={styles.schoolName}>Sanskriti School</Text>
            <Text style={styles.schoolAddress}>Dr. S. Radhakrishnan Marg, ChanaKyaprui, New Delhi, Delhi - 110021</Text>
        </View>
      </View>
        {/* Profile Info */}
        <View style>
        <SectionTitleWithLines title="PERFORMANCE PROFILE" />
        </View>
        <View style={[styles.bottomHalf,{marginTop:10}]}>
            
            <View style={styles.userRow}>
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.logo}
                />
              <View style={styles.nameclass}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.class}>{classSection}</Text>
              </View>
            </View>
                {profileFields.map(({ label, key }) => (
                  <View style={styles.inputRow} key={key}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.input}>{profile[key] || '-'}</Text>
                  </View>
                ))}
        </View>
        {/* Attendance Section */}
        <SectionTitleWithLines title="ATTENDANCE" />

        <Text style={styles.termTitle}>Term I</Text>
        <View style={styles.attendanceBox}>
          <Text style={styles.attendanceText}>{attendance.term1 || '-'}</Text>
          <Text style={styles.attendanceSubLabel}>
            Total attendance of the student
          </Text>
        </View>

        <Text style={styles.termTitle}>Term II</Text>
        <View style={styles.attendanceBox}>
          <Text style={styles.attendanceText}>{attendance.term2 || '-'}</Text>
          <Text style={styles.attendanceSubLabel}>
            Total attendance of the student
          </Text>
        </View>

        {/* Academic Performance */}
        <SectionTitleWithLines title="ACADMIC PERFORMANCE" />

        {['Term I', 'Term II', 'Final'].map((term) => (
          <View key={term} style={styles.cardPlain}>
            <Text style={styles.termLabel}>{term}</Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.cell}>Subject</Text>
                {term === 'Final' ? (
                  <Text style={styles.cell}>Final</Text>
                ) : (
                  <>
                    <Text style={styles.cell}>Qtr 1</Text>
                    <Text style={styles.cell}>Qtr 2</Text>
                    <Text style={styles.cell}>{term}</Text>
                  </>
                )}
              </View>

              {['English','Hindi','Mathematics','Science','Social Science','Sanskrit'].map((subject, i) => (
                  <View key={i} style={[styles.tableRow, i % 2 === 0 ? styles.rowLight : styles.rowDark]}>
                    <Text style={[styles.cell, styles.subjectCell]}>{subject}</Text>
                    {term === 'Final' ? (
                      <Text style={[styles.cell, styles.gradeCell]}>{results.final?.[subject] || '-'}</Text>
                    ) : (
                      <>
                        <Text style={[styles.cell]}>{results[term.toLowerCase()]?.[subject] || '-'}</Text>
                        <Text style={[styles.cell]}>{results[term.toLowerCase()]?.[subject] || '-'}</Text>
                        <Text style={[styles.cell, styles.gradeCell]}>{results[term.toLowerCase()]?.[subject] || '-'}</Text>
                      </>
                    )}
                  </View>
                ))}
            </View>

            {/* GPA */}
            <View style={styles.gpaRow}>
              <Text style={styles.gpaLabel}>GPA</Text>
              <Text style={styles.gpaValue}>{results[term.toLowerCase()]?.GPA || '-'}</Text>
            </View>
          </View>
        ))}

        {/*Remarks by Teacher */}
        <View style={styles.remarksContainer}>
          <Text style={styles.remarkHeading}>Remarks by Teacher</Text>

          <View style={styles.remarksBox}>
            <Text style={styles.remarkText}>{remarks.text || 'No remarks provided.'}</Text>
          </View>

          <Text style={styles.remarkAuthor}>–{remarks.teacher || 'Class Teacher'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topHalf: {
    height: 120,
    backgroundColor: '#473f97',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: { fontSize: 20, color: '#fff', fontWeight: '600' },
  content: { paddingBottom: 100 },

  // Section Titles with lines
  sectionTitleWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  coloredLine: {
    height: 2,
    backgroundColor: '#473f97',
    width: '100%',
    marginVertical: 6,
  },
  fullLineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#473f97',
    textAlign: 'center',
  },

  // Profile
  card: {
    backgroundColor: '#f2f4ff',
    margin: 15,
    padding: 16,
    borderRadius: 12,
  },
  profileBlock: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  class: { fontSize: 14, color: '#666' },

  // Attendance
  termTitle: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '700',
    color: '#473f97',
  },
  attendanceBox: {
    backgroundColor: '#e9fff3',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#b2f2dc',
  },
  attendanceText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2ecc71',
    marginLeft: 110,
  },
  attendanceSubLabel: {
    fontSize: 14,
    color: '#2ecc71',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '400',
  },

  // Academic performance
  cardPlain: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 6,
    padding: 12,
  },
  termLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  table: { borderRadius: 8, overflow: 'hidden' },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d3d3d3',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cell: { flex: 1, fontSize: 13, textAlign: 'center', color: '#333' },
  rowLight: { backgroundColor: '#f9f9f9' },
  rowDark: { backgroundColor: '#eaeaea' },

  // GPA Row
  gpaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 35,
    gap: 60,
  },
  gpaLabel: { fontSize: 16, fontWeight: '900', color: '#ff69b4' },
  gpaValue: { fontSize: 16, fontWeight: '800', color: '#ff69b4' },

  // Remarks
  remarksContainer: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  remarkHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#473f97',
    marginBottom: 10,
    paddingLeft: 2,
  },
  remarksBox: {
    backgroundColor: '#FFD580',
    padding: 20,
    borderRadius: 20,
    minHeight: 120,
    justifyContent: 'flex-start',
  },
  remarkText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'left',
  },
  remarkAuthor: {
    marginTop: 8,
    fontSize: 15,
    color:'#ff69b4',
    textAlign: 'left',
    paddingLeft: 4,
    fontWeight:'500',
  },
  subjectCell: {
  fontWeight: 'bold',
  color: '#473f97',
},
gradeCell:{
    fontWeight:'bold',
},

userRow:{
    flexDirection:'row',
    alignContent:'flex-start',
    marginLeft:10,
},
 logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 20,
    
  },
  nameclass:{
    marginTop:10,
    marginLeft:15,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: '400',
    marginBottom:0,

  },
  class:{
    fontSize:16,
    color:'black',
    
  },
   bottomHalf: {
    flex: 1.2,
    backgroundColor: '#fff',
    paddingHorizontal:20,

    marginTop: -30,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    height:50,
  },
  label: {
    width: 160,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#3b3b3b',
    fontWeight: '400',
  },
  schoolHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginTop: 20,
},

schoolLogo: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginRight: 15,
},

schoolDetails: {
  flex: 1,
},

schoolName: {
  fontSize: 20,
  fontWeight: '600',
  color: '#473f97',
},

schoolAddress: {
  fontSize: 16,
  fontWeight: '500',
  color: '#555',
  marginTop: 4,
  
},


});


