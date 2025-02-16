import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import *as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const TrackScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tracks = [
    {
      title: 'intro to coding with web dev 🌐',
      description: 'start building websites with html & css, the building blocks that power the web. grow into full-stack coding!',
      buttonText: 'VIEW TRACK DETAILS',
      image: require('./assets/video.mp4'),
    },
    {
      title: 'intro to coding with ai python 🤖',
      description: 'learn python basics and dive into ai. build practical ai apps, get hands-on with ml models and grow into ai engineering!',
      buttonText: 'VIEW TRACK DETAILS',
      image: require('./assets/video1.mp4'),
    },
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 140));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>pick your track</Text>
            <Text style={styles.headerSubtitle}>time to build 🚀</Text>
          </View>
          <View style={styles.techBadge}>
            <Image 
              source={require('./assets/icon.png')} 
              style={styles.techIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={styles.checklistContainer}>
        <View style={styles.checklistItem}>
          <Text style={styles.checkMark}>✓</Text>
          <Text style={styles.checklistText}>switch or add tracks anytime as you grow</Text>
        </View>
        <View style={styles.checklistItem}>
          <Text style={styles.checkMark}>✓</Text>
          <Text style={styles.checklistText}>complete your track to unlock new skills and projects!</Text>
        </View>
      </View>
<Animatable.View animation="fadeInDown" duration={300} easing="ease-in">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        snapToInterval={width - 60}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {tracks.map((track, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.track}
            onPress={() => navigation.replace('Detail', { track: track, tracks: tracks })}
          >
            <Video
              source={track.image}
              style={styles.trackImage}
              resizeMode="cover"
              shouldPlay={true}
              isLooping={true}
              isMuted={true}
              useNativeControls={false}
              rate={1.0}
              volume={1.0}
            />
            <LinearGradient
              colors={[
                'rgba(62, 60, 60, 0.95)',
                'rgba(30, 30, 30, 0.98)',
                'rgba(10, 10, 10, 1)',
              ]}
              locations={[0, 0.5, 1]}
              style={styles.gradientBackground}
            >
              <View style={styles.trackContent}>
                <View>
                  <Text style={styles.trackTitle} numberOfLines={2}>{track.title}</Text>
                  <Text style={styles.trackDescription} numberOfLines={3}>{track.description}</Text>
                </View>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{track.buttonText} →</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </Animatable.View>

      <View style={styles.indicators}>
        {tracks.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator, 
              index === activeIndex && styles.activeIndicator,
              index < tracks.length - 1 && styles.indicatorWithMargin
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    marginTop: 40,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },
  techBadge: {
    marginLeft: 20,
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techIcon: {
    width: 64,
    height: 64,
  },
  checklistContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkMark: {
    color: '#00FF9D',
    fontSize: 20,
    marginRight: 8,
    fontWeight: 'bold',
  },
  checklistText: {
    color: '#808080',
    fontSize: 16,
    flex: 1,
  },
  carousel: {
    marginTop: 20,
  },
  track: {
    width: width - 120,
    borderRadius: 0,
    borderColor: 'white',
    borderWidth: 2,
    padding: 0,
    marginRight: 20,
    overflow: 'hidden',
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
  },
  trackImage: {
    width: width - 120,
    height: 187,
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  trackContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  trackTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    height: 56,
  },
  trackDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    height: 60,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    height: 2,
  },
  indicator: {
    width: 64,
    height: 2,
    backgroundColor: '#404040',
  
  },
  indicatorWithMargin: {
    marginRight: 8,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
});

export default TrackScreen; 