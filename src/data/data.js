export const users = [
  {
   
    phone: '9019317277',
    password : '112233',
    name: 'Naveen',
    classSection: '7 B',
  },
  {
    
    phone: '9632587410',
    password : '445566',
    name: 'Rahul',
    classSection: '8 A',
  },
  
];

export const multimediaData = [
    {
      id: '1',
      type: 'PDF',
      title: 'Social Science Syllabus',
      subtitle: 'Syllabus for 2020 batch\n12 pages / 360 KB',
    },
    {
      id: '2',
      type: 'Video',
      title: 'Chapter-wise MCQs & Answers',
      subtitle: 'Live Stream Capture',
      url: 'https://www.youtube.com/watch?v=abc123',
      thumbnail: require('../assets/thumbnail.png'),
    },
    {
      id: '3',
      type: 'ZIP',
      title: 'Improvement In Food Resources',
      subtitle: 'Syllabus PDF with notes\n15 MB',
    },
    {
      id: '4',
      type: 'PDF',
      title: 'Exemplar Solutions Class 10',
      subtitle: '12 pages / 360 KB',
    },
    {
      id: '5',
      type: 'ZIP',
      title: 'Preparation Tips',
      subtitle: '15 MB compressed folder',
    },
    {
      id: '6',
      type: 'Others',
      title: 'Audio Chapter Guide',
      subtitle: 'MP3 format / 10 MB',
    },
    {
      id: '7',
      type: 'PDF',
      title: 'Final Revision Notes',
      subtitle: 'PDF Format / 8 pages / 290 KB',
    },
  ];


export const reportCardData = {
  attendance: {
    '9019317277': {
      term1: '235 / 249 Days',
      term2: '235 / 249 Days',
    },
  
  },
  results: {
    '9019317277': {
      term1: {
        English: 'A+ / 96',
        Hindi: 'A+ / 96',
        Mathematics: 'A+ / 96',
        Science: 'A+ / 96',
        'Social Science': 'A+ / 96',
        Sanskrit: 'A+ / 96',
        GPA: '4.21',
      },
      term2: { 
        English: 'A+ / 96',
        Hindi: 'A+ / 96',
        Mathematics: 'A+ / 96',
        Science: 'A+ / 96',
        'Social Science': 'A+ / 96',
        Sanskrit: 'A+ / 96',
        GPA: '4.21',
      },

      final: { 
        English: 'A+ / 96',
        Hindi: 'A+ / 96',
        Mathematics: 'A+ / 96',
        Science: 'A+ / 96',
        'Social Science': 'A+ / 96',
        Sanskrit: 'A+ / 96',
        GPA: '4.21',
      },
    }
  },
  remarks: {
    '9019317277': {
      text: 'Student has shown excellent progress.',
      teacher: 'Mrs. Sharma',
    }
  }
};
