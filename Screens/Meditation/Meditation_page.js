import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import ImageSlideshow from '../../Components/ImageSlideshow';
import WebView from 'react-native-webview';
import { getFirestore, getDocs, collection } from 'firebase/firestore'; 

export default class MeditationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      durationModalVisible: false,
      feeds: [],
      modalUri: '', // To hold the WebView URL
    };
  }

  async componentDidMount() {
    this.fetchFeeds();

    // Add event listener for screen focus
    this._focusListener = this.props.navigation.addListener('focus', () => {
      // Reset modal visibility when the screen comes into focus
      this.setState({ modalVisible: false, durationModalVisible: false });
    });
  }

  componentWillUnmount() {
    // Clean up the event listener
    if (this._focusListener) {
      this._focusListener();
    }
  }

  fetchFeeds = async () => {
    try {
      const db = getFirestore(); // Get Firestore instance
      const querySnapshot = await getDocs(collection(db, "meditation"));
      const feedsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ feeds: feedsData });
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  setModalVisible = (visible, uri = '') => {
    this.setState({ modalVisible: visible, modalUri: uri });
  };

  setDurationModalVisible = (visible) => {
    this.setState({ durationModalVisible: visible });
  };

  handleLogin = () => {
    this.setModalVisible(true);
  };

  handleOptionSelect = (option) => {
    console.log(option);
    this.setModalVisible(false);
    if (option === 'Dhiyanam') {
      this.setDurationModalVisible(true);
    }
  };

  handleDurationSelect = (duration) => {
    console.log(`Selected Duration: ${duration} minutes`);
    this.setDurationModalVisible(false); 
    this.props.navigation.navigate('MeditationTimer', { duration });
  };

  render() {
    const { modalVisible, durationModalVisible, feeds } = this.state;

    return (
      <SafeAreaView style={styles.safearea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* SlideShow */}
          <View style={styles.slider}>
            <ImageSlideshow />
          </View>

          {/* Voice Section */}
          <View style={styles.voiceSection}>
            <View>
              <View style={styles.headerView}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: 'black' }}>Meditation of</Text>
                  <Text style={[styles.headerText, { marginLeft: 3 }]}>Master Sri Ji</Text>
                </View>
                <View style={styles.Button}>
                  <TouchableOpacity onPress={this.handleLogin}>
                    <Text style={styles.SignIn_Button_Text}>Meditate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Video Section */}
          <View style={styles.videoSection}>
            <ScrollView>
              {feeds.map(feed => (
                <WebView
                  key={feed.id} // Use a unique key for each WebView
                  style={styles.videoCard}
                  source={{ uri: feed.video_link }} // Use the URL from the feed
                />
              ))}
            </ScrollView>
          </View>

          {/* Meditation Options Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Select Meditation</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.handleOptionSelect('Dhiyanam')}
                >
                  <Text style={styles.modalOptionText}>Dhiyanam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.props.navigation.navigate('Chat_room')}
                >
                  <Text style={styles.modalOptionText}>Thirayadhanam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.props.navigation.navigate('Jabam')}
                >
                  <Text style={styles.modalOptionText}>Jabam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => this.setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Duration Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={durationModalVisible}
            onRequestClose={() => {
              this.setDurationModalVisible(!durationModalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Select Duration</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.handleDurationSelect(9)}
                >
                  <Text style={styles.modalOptionText}>9 Minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.handleDurationSelect(13)}
                >
                  <Text style={styles.modalOptionText}>13 Minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => this.handleDurationSelect(19)}
                >
                  <Text style={styles.modalOptionText}>19 Minutes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => this.setDurationModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    justifyContent: 'flex-start',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  voiceSection: {
    paddingHorizontal: '5%',
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
    width: '95%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoSection: {
    marginTop: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoCard: {
    height: 200,
    width: 300,
    marginBottom: '10%',
    borderRadius:'5%'
  },
  Button: {
    width: "30%",
    height: 34,
    backgroundColor: "#10357E",
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize:18,
    color:'#FFFFFF',
    fontWeight:'bold',
    alignContent:'center',
  },
  SignIn_Button_Text: {
    fontSize:14,
    fontWeight:'bold', 
    color:'#FFFF'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold'
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
