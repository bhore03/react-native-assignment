import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { track, tracks } = route.params;

  const toolsData = {
    webDev: [
      { icon: require('./assets/html.png'), name: 'HTML' },
      { icon: require('./assets/css.png'), name: 'CSS' },
      { icon: require('./assets/tailwind.png'), name: 'TAILWIND' },
      { icon: require('./assets/javascript.png'), name: 'JAVASCRIPT' },
      { icon: require('./assets/cursor.png'), name: 'CURSOR AI' },
      { icon: require('./assets/cursor.png'), name: 'CURSOR AI' },
      { icon: require('./assets/cursor.png'), name: 'CURSOR AI' },
    ],
    aiPython: [
      { icon: require('./assets/python.png'), name: 'PYTHON' },
      { icon: require('./assets/pandas.png'), name: 'PANDAS' },
      { icon: require('./assets/numpy.png'), name: 'NUMPY' },
      { icon: require('./assets/fastai.png'), name: 'FAST.AI' },
      { icon: require('./assets/google.png'), name: 'GOOGLE COLAB' },
      { icon: require('./assets/google.png'), name: 'GOOGLE COLAB' },
      { icon: require('./assets/google.png'), name: 'GOOGLE COLAB' },
    ]
  };

  const tools = track.title.includes('web dev') ? toolsData.webDev : toolsData.aiPython;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonContent}>
          <Image 
            source={require('./assets/arrow.png')} 
            style={styles.backArrowIcon}
            resizeMode="contain"
          />
          <Text style={styles.backButtonText}>BACK</Text>
        </View>
      </TouchableOpacity>

      {/* Track Selection Section */}
      <View style={styles.trackSelection}>
        {[
          { title: 'INTRO TO\nWEB DEV', id: 'web' },
          { title: 'INTRO TO\nAI PYTHON', id: 'python' }
        ].map((t, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.trackOption,
              t.id === (track.title.includes('web dev') ? 'web' : 'python') && styles.activeTrackOption
            ]}
            onPress={() => navigation.setParams({ track: tracks[index] })}
          >
            <Text style={[
              styles.trackOptionText,
              t.id === (track.title.includes('web dev') ? 'web' : 'python') && styles.activeTrackOptionText
            ]}>
              {t.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Track Details */}
      <View style={styles.videoContainer}>
        <Video
          source={track.image}
          style={styles.video}
          shouldPlay={true}
          isLooping={true}
          isMuted={true}
          resizeMode="cover"
        />
        <View style={styles.videoIconContainer}>
          <Image 
            source={require('./assets/Vector.png')} 
            style={styles.videoIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.description}>{track.description}</Text>

        <View style={styles.divider}>
          {[...Array(30)].map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>
        
        <View style={styles.toolsSection}>
          <View style={styles.toolsHeader}>
            <Image 
              source={require('./assets/tool.png')} 
              style={styles.toolHeaderIcon}
              resizeMode="contain"
            />
            <Text style={styles.toolsTitle}>TOOLS COVERED ({tools.length})</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.toolsScroll}
          >
            <View style={styles.toolsRow}>
              {tools.map((tool, index) => (
                <View key={index} style={styles.toolItem}>
                  <Image source={tool.icon} style={styles.toolIcon} resizeMode="contain" />
                  <Text style={styles.toolName}>{tool.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.divider}>
          {[...Array(30)].map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>

        <View style={styles.startingSection}>
          <Text style={styles.startingTitle}>let's choose your starting point for this track 🚀</Text>
          <View style={styles.levelIndicator}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.levelText}>you're assigned sub-skill </Text>
            <Image 
              source={require('./assets/level.png')} 
              style={styles.levelImage}
              resizeMode="contain"
            />
            <Text style={styles.levelTextt}> based on your answers</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '600',
  },
  backArrowIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  trackSelection: {
    flexDirection: 'row',
    marginTop: 80,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  trackOption: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTrackOption: {
    borderBottomColor: '#00FF9D',
  },
  trackOptionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  activeTrackOptionText: {
    color: '#00FF9D',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    marginTop: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 8,
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    width: 80,
    height: 48,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    color: 'rgb(214, 210, 210)',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash: {
    width: 8,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 3,
  },
  toolsSection: {
    marginBottom: 10,
    paddingVertical: 3,
    marginTop: 15,
  },
  toolsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolHeaderIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  toolsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  toolsScroll: {
    flexGrow: 0,
    height: 75,
  },
  toolsRow: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingVertical: 3,
  },
  toolItem: {
    alignItems: 'center',
    width: 75,
    marginRight: 20,
  },
  toolIcon: {
    width: 35,
    height: 35,
    marginBottom: 8,
  },
  toolName: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  startingSection: {
    marginTop: 15,
  },
  startingTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  checkmark: {
    color: '#00FF9D',
    fontSize: 18,
    marginRight: 10,
  },
  levelText: {
    color: '#fff',
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  levelTextt: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 20,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  levelImage: {
    width: 60,
    height: 24,
    marginHorizontal: 4,
  },
});

export default DetailScreen; 