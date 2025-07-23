import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Linking,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setMultimediaItems } from '../redux/slices/multimediaSlice';
import { multimediaData } from '../data/data';

const FILTERS = ['All', 'Video', 'Images', 'Documents', 'Links', 'PDF', 'ZIP', 'Others'];

const Multimedia = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const multimediaItems = useSelector(state => state.multimedia.items);

  const filteredData = useMemo(() => {
    return multimediaItems.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter, multimediaItems]);

  const handleItemPress = (item) => {
    if (item.type === 'Video' && item.url) {
      Linking.openURL(item.url);
    } else {
      Alert.alert('Download', `Downloading ${item.title}...`);
    }
  };

  useEffect(() => {
    if (!multimediaItems || multimediaItems.length === 0) {
      dispatch(setMultimediaItems(multimediaData));
    }
  }, [dispatch, multimediaItems]);

  const renderItem = ({ item }) => {
    if (item.type === 'Video') {
      return (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.card}>
          <View style={styles.videoThumbnailContainer}>
            <Image
              source={item.thumbnail || require('../assets/thumbnail.png')}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <Image
              source={require('../assets/youtube.png')}
              style={styles.playIcon}
            />
            <View style={styles.badgeContainerOverlay}>
              <Text style={styles.badge}>Video</Text>
            </View>
          </View>
          <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.cardRow}>
        <View style={styles.roundedTypeLabel}>
          <Text style={styles.roundedTypeText}>{item.type}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setSearchActive(false);
      }}
    >
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
                {searchActive ? (
                  <TextInput
                    placeholder="Search..."
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    autoFocus
                  />
                ) : (
                  <Text style={styles.headerText}>Multimedia</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => {
                setSearchActive(!searchActive);
                setQuery('');
                Keyboard.dismiss();
              }}>
                <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Filters */}
        <ScrollView
          style={{ marginBottom: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {FILTERS.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveFilter(item)}>
              <Text
                style={[
                  styles.filterItem,
                  activeFilter === item && styles.activeFilter,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Multimedia;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  filterScrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    columnGap: 20,
  },
  filterItem: {
    marginRight: 20,
    color: '#888',
    fontSize: 14,
  },
  activeFilter: {
    color: '#27ae60',
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#27ae60',
  },
  card: {
    backgroundColor: '#ffd7d7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#ffd7d7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  roundedTypeLabel: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedTypeText: {
    color: '#473f97',
    fontWeight: '700',
    fontSize: 12,
  },
  badgeContainerOverlay: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badge: {
    color: '#473f97',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontWeight: '600',
    color: '#222',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  videoThumbnailContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
