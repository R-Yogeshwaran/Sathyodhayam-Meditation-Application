import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';

export default class MeditationTimer extends Component {
  duration = 10; // Duration in seconds
  state = {
    timeLeft: this.duration,
    sound: null
  };

  timer = null;

  async componentDidMount() {
    await this.startSound();
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    if (this.state.sound) this.stopSound(this.state.sound);
  }

  startSound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: 'https://res.cloudinary.com/djc99tekd/video/upload/v1724763749/34f7cd22-db50-4522-9153-653669df849c_ois7dt.mp3' },
      { isLooping: true }
    );
    this.setState({ sound: newSound });
    await newSound.playAsync();

    this.timer = setInterval(() => {
      this.setState((prevState) => {
        const newTime = prevState.timeLeft > 0 ? prevState.timeLeft - 1 : 0;
        if (newTime === 0) {
          clearInterval(this.timer);
          this.stopSound(newSound);
          this.props.navigation.navigate('Home'); // Navigate to Home when timer ends
        }
        return { timeLeft: newTime };
      });
    }, 1000);
  };

  stopSound = async (soundToStop) => {
    if (soundToStop) {
      await soundToStop.stopAsync();
      await soundToStop.unloadAsync();
    }
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  render() {
    const { timeLeft } = this.state;

    return (
      <SafeAreaView style={styles.safearea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.voiceSection}>
            <View>
              <View style={styles.headerView}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'black' }}>Meditation of</Text>
                  <Text style={styles.headerText}>Master Sri Ji</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', height: '76%', marginTop: '4%' }}>
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10 / 2, 10 / 3, 10 / 4, 0]}
            size={250}
            strokeWidth={5}
          >
            {() => (
              <Image
                source={{ uri: 'https://res.cloudinary.com/djc99tekd/image/upload/v1723719615/sathyodhayam/qmad7qesjddv7vwdp9gg.png' }}
                style={{
                  width: '80%',
                  height: '80%',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}
              />)}
              </CountdownCircleTimer>

            <View style={{ marginTop: '10%' }}>
              <Text style={{ fontSize: 40 }}>{this.formatTime(timeLeft)}</Text>
            </View>

            <View style={styles.Button}>
              <TouchableOpacity>
                <Text style={styles.SignIn_Button_Text}>Continue Meditation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  slider: {
    marginHorizontal: '5%',
    marginTop: '2%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerView: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  voiceSection: {
    paddingHorizontal: '5%',
    justifyContent:'center',
    alignItems:'center'
  },
  podcastSection: {
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  webviewContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop:10
  },
  Button: {
    width: "100%",
    height: 44,
    backgroundColor: "#10357E",
    alignItems: "center",
    justifyContent: "center",
    fontSize:18,
    color:'#FFFFFF',
    fontWeight:'bold',
    alignContent:'center',
    marginTop:'16%'
  },
  SignIn_Button_Text: {
    fontSize:14,
    fontWeight:'bold', 
    color:'#FFFF'
  },
});
