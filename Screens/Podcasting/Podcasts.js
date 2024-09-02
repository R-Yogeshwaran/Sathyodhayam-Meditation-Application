import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Button, Modal } from 'react-native';
import ImageSlideshow from '../../Components/ImageSlideshow';
import Podcast_card from '../../Components/Podcast_card';
import WebView from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

export default class Podcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      feeds: [],
      modalUri: '', // To hold the WebView URL
    };
  }

  componentDidMount() {
    this.fetchFeeds();
  }

  fetchFeeds = async () => {
    try {
      const db = getFirestore(); // Get Firestore instance
      const querySnapshot = await getDocs(collection(db, "voice"));
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

  render() {
    const { modalVisible, feeds, modalUri } = this.state;
    console.log(feeds);

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
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Voice of</Text>
                  <Text style={[styles.headerText, { marginLeft: 3 }]}>Master Sri Ji</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Podcasts */}
          <View style={styles.podcastSection}>
            <ScrollView contentContainerStyle={{ padding: '3%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {feeds.map((feed) => (
                <View key={feed.id} style={styles.cardContainer}>
                  <TouchableOpacity
                    title="Play Audiomack"
                    onPress={() => this.setModalVisible(true, feed.audio)}
                  >
                    <Podcast_card title={feed.sub_title} image={feed.image} time={feed.paragraph}/>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* WebView Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => this.setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.webviewContainer}>
                  <WebView
                    source={{ uri: modalUri }} // Use the modalUri from the state
                    style={{ width: '100%', height: '80%' }}
                    javaScriptEnabled={true}
                    scrollEnabled={false}
                  />
                  <Button title="Close" onPress={() => this.setModalVisible(false)} />
                </View>
              </View>
            </Modal>
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
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  voiceSection: {
    paddingHorizontal: '2%',
  },
  podcastSection: {
    paddingHorizontal: '2%',
    marginTop: 10,
  },
  cardContainer: {
    width: '48%', // Adjust this width for two cards per row
    marginBottom: '3%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  webviewContainer: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
