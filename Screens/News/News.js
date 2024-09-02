import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import ImageSlideshow from '../../Components/ImageSlideshow';
import News_Details from '../../Components/News_Details';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 

export default class News extends Component {
  state = {
    feeds: [],
  };

  componentDidMount() {
    this.fetchFeeds();
  }

  fetchFeeds = async () => {
    try {
      const db = getFirestore(); // Get Firestore instance
      const querySnapshot = await getDocs(collection(db, "news_feeds"));
      const feedsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ feeds: feedsData });
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  render() {
    const { feeds } = this.state;
    console.log(feeds);

    return (
      <SafeAreaView style={styles.safearea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* SlideShow */}
          <View style={styles.slider}>
            <ImageSlideshow />
          </View>
          <View style={styles.voiceSection}>
            {/* News Feed header View */}
            <View style={styles.headerView}>
              <View>
                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>News Feeds from</Text>
                <Text style={[styles.headerText, { marginLeft: 5 }]}>Master Sri Ji</Text>
              </View>
            </View>

            <View style={{ marginTop: '2%' }}>
              {feeds.map((feed) => (
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
      headerView: {
        marginBottom: 10,
        flexDirection:'row',
        justifyContent:'space-between'
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      voiceSection: {
        paddingHorizontal: '5%',
      },
})