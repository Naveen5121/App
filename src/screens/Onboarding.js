import { FlatList, StyleSheet, View, Animated } from 'react-native';
import { useState, useRef } from 'react';
import React from 'react';
import { onboardingitems } from '../../slides';
import OnboardingItem from './OnboardingItem';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const scrollToNext = (index) => {
    if (index < onboardingitems.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    } else {
      navigation.navigate('Login');  
    }
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingitems}
        renderItem={({ item, index }) => (
          <OnboardingItem
            item={item}
            index={index}
            scrollToNext={() => scrollToNext(index)}
            isLast={index === onboardingitems.length - 1}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
