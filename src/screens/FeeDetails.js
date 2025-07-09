import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const tabs = ['School Fee', 'Exam Fee', 'Activity Fee', 'Other Fee'];

const feeData = [
  {
    id: '1',
    month: 'January',
    date: '06 May',
    paid: true,
    amount: '₹ 16,600',
    details: {
      totalFee: '₹ 14,500',
      extraFee: '₹ 2,000',
      lateCharges: '₹ 600',
      discount: '- ₹ 500',
      paidFee: '₹ 16,600',
    },
  },
  {
    id: '2',
    month: 'December',
    date: '06 May',
    paid: true,
    amount: '₹ 14,500',
    details: {
      totalFee: '₹ 13,000',
      extraFee: '₹ 1,000',
      lateCharges: '₹ 300',
      discount: '- ₹ 200',
      paidFee: '₹ 14,500',
    },
  },
  {
    id: '3',
    month: 'November',
    date: '06 May',
    paid: true,
    amount: '₹ 16,500',
    details: {
      totalFee: '₹ 15,000',
      extraFee: '₹ 1,000',
      lateCharges: '₹ 1,000',
      discount: '- ₹ 500',
      paidFee: '₹ 16,500',
    },
  },
  {
    id: '4',
    month: 'October',
    date: '06 May',
    paid: true,
    amount: '₹ 14,500',
    details: {
      totalFee: '₹ 13,000',
      extraFee: '₹ 1,000',
      lateCharges: '₹ 500',
      discount: '₹ 0',
      paidFee: '₹ 14,500',
    },
  },
];

const FeeDetails = () => {
  const navigation=useNavigation();
  const [selectedTab, setSelectedTab] = useState('School Fee');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderFeeItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.feeTitle}>School Fee for {item.month}</Text>
              <View style={styles.amountRow}>
                <Text style={styles.amount}>{item.amount}</Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidText}>Paid</Text>
                </View>
              </View>
            </View>
            <View style={styles.rightBlock}>
              <Text style={styles.date}>{item.date}</Text>
              <Image
                source={
                  isExpanded
                    ? require('../assets/icons/up-arrow.png')
                    : require('../assets/icons/down-arrow.png')
                }
                style={styles.arrowIcon}
              />
            </View>
          </View>
        </TouchableOpacity>

        {isExpanded && item.details && (
        <View style={styles.details}>
          {Object.entries(item.details).map(([label, value]) => (
            <View key={label} style={styles.detailRow}>
              <Text
                style={[
                  styles.detailLabel,
                  label.toLowerCase().includes('paid') && { fontWeight: 'bold' },
                ]}
              >
                {label.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  label.toLowerCase().includes('paid') && { fontWeight: 'bold' },
                ]}
              >
                {value}
              </Text>
            </View>
          ))}
          </View>
        )}

      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/union.png')}
        style={styles.topHalf}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headtext}>Fee Details</Text>
        </View>
      </ImageBackground>

      {/* Bottom Half */}
      <View style={styles.bottomHalf}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fee List */}
        <FlatList
          data={feeData}
          keyExtractor={(item) => item.id}
          renderItem={renderFeeItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default FeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    height: 120,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 16,
    backgroundColor: '#473f97',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  backIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  headtext: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10, 
  },
  tabItem: {
    marginRight: 20,
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 16,
    color: '#473f97',
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3bbd6c',
  },
  activeTabText: {
    color: '#3bbd6c',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#e7f7fc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeTitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  paidBadge: {
    backgroundColor: '#3bbd6c',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  paidText: {
    color: 'white',
    fontSize: 12,
  },
  rightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#888',
  },
  details: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  details: {
  marginTop: 12,
  paddingTop: 8,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
  gap: 6,
},
detailRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
detailLabel: {
  fontSize: 14,
  color: '#333',
},
detailValue: {
  fontSize: 14,
  color: '#111',
},

});
