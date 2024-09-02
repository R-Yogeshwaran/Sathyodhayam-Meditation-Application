import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

export default class Jabam_Card extends Component {
  render() {
    return (
      <View style={styles.cardView}>
        <View style={styles.row}>
          <ImageBackground
            source={{ uri: 'https://res.cloudinary.com/djc99tekd/image/upload/v1723719615/sathyodhayam/qmad7qesjddv7vwdp9gg.png' }}
            style={styles.imageBackground}
          />
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>இயற்கையை நம்புங்கள்</Text>
          <Text style={styles.timeText}>6 minutes</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome name="play" size={24} color="#898989" />
        </TouchableOpacity>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    height: 70,
    borderRadius: 7,
    borderColor: '#CBCBCB',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#333', // Background color similar to the image
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adds space between the cards/
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Make sure row takes the full width
  },
  imageBackground: {
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1, // Makes the text container take up the remaining space
    justifyContent: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  podcastText: {
    fontSize: 12,
    color: '#BBBBBB',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:'12%'
  },
  descriptionText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  timeText: {
    fontSize: 10,
    color: '#BBBBBB',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:'1%'
  },
});
