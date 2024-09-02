import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, ScrollView, ImageBackground, Modal, Button, TouchableOpacity } from 'react-native';
import ImageSlideshow from '../../Components/ImageSlideshow';
import News_Details from '../../Components/News_Details';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import WebView from 'react-native-webview';
import Podcast_card from '../../Components/Podcast_card';

const Top = StatusBar.currentHeight;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      feeds: [],
      News:[],
      modalUri: '', // To hold the WebView URL
    };
  }

  componentDidMount() {
    this.fetchFeeds();
  }

  fetchFeeds = async () => {
    try {
      const db = getFirestore(); // Get Firestore instance

      // Fetching feeds from 'voice' collection
      const voiceSnapshot = await getDocs(collection(db, "voice"));
      const voiceFeeds = voiceSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'voice', // Add a type to distinguish these feeds
        ...doc.data(),
      }));

      // Fetching feeds from 'news_feeds' collection
      const newsSnapshot = await getDocs(collection(db, "news_feeds"));
      const newsFeeds = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'news', // Add a type to distinguish these feeds
        ...doc.data(),
      }));

      // Combine both feeds
      const feedsData = [...voiceFeeds, ...newsFeeds];
      this.setState({ feeds: [...voiceFeeds] });
      this.setState({News: [...newsFeeds]}) 
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  setModalVisible = (visible, uri = '') => {
    this.setState({ modalVisible: visible, modalUri: uri });
  };

  render() {
    const { modalVisible, feeds,News, modalUri } = this.state;
    console.log(News);

    return (
      <SafeAreaView style={styles.safearea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* SlideShow */}
          <View style={styles.slider}>
            <ImageSlideshow />
          </View>

          {/* Voice of Sri Ji */}
          <View style={styles.voiceSection}>

            {/* Voice of Sri Ji header View */}
            <View style={styles.headerView}>
              <View>
              <Text>Voice of</Text>
              <Text style={styles.headerText}>Master Sri Ji</Text>
              </View>
              <View style={{alignItems:'flex-end',justifyContent:'flex-end'}}>
              <Text onPress={()=>{this.props.navigation.navigate("Podcast")}} style={{fontSize:13,color:'#007DFE',fontWeight:'600'}}>View More</Text>
              </View>
            </View>

            {/* Voice of Sri Ji Podcast Links */}
            <View style={styles.podcastLinks}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {feeds.slice(0, 6).map((feed, id) => (
                <View key={feed.id} style={styles.boxContainer}>

                  <TouchableOpacity
                    title="Play Audiomack"
                    onPress={() => this.setModalVisible(true, feed.audio)}
                  >
                  <ImageBackground
                      source={{ uri: feed.image }} // Replace with your image URL
                      style={styles.imageBackground}
                    >
                    </ImageBackground>
                    <View style={{width:85}}>
                      <Text style={styles.title}>{feed.sub_title}</Text>
                    </View>

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





            {/* News Feeds */}
            <View>
                {/* News Feed header View */}
                <View style={[styles.headerView,{marginTop:'8%'}]}>
                <View>
                <Text style={{fontSize:13}}>Headlines of</Text>
                <Text style={styles.headerText}>Master Sri Ji</Text>
                </View>
                <View style={{alignItems:'flex-end',justifyContent:'flex-end'}}>
                <Text onPress={() => {this.props.navigation.navigate("News")}} style={{fontSize:13,color:'#007DFE',fontWeight:'600'}}>View More</Text>
                </View>
                </View>
                </View>
               
                <View style={{marginTop:'2%'}}>
                    {News.slice(0, 6).map((feed) => (
                    <News_Details
                      key={feed.id} // Use the unique ID for the key
                      date={feed.date}
                      title={feed.title}
                      imageUri={feed.image} // Ensure this field exists in your feeds object
                      description={feed.paragraph} // Add description or any other detail
                      navigation={this.props.navigation} // Pass the navigation prop
                    />
                  ))}
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
    marginBottom:10
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
  voiceSection: {
    paddingHorizontal: '5%',
  },
  headerView: {
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  podcastLinks: {
    flexDirection: 'row',
    marginTop:'2%'
  },
  boxContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  imageBackground: {
    width: 85, 
    height: 85, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 10,
    color: 'black', 
    marginTop: 5,
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
