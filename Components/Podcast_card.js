import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

export default class Podcast_card extends Component {
  render() {
    const { title, image, time } = this.props;
    return (
      <View style={styles.cardView}>
        <View style={styles.row}>
          <ImageBackground
            source={{ uri: image }} // Replace with your image URL
            style={styles.imageBackground}
          />
          <View style={styles.textContainer}>
            <Text style={styles.subtitleText}>Web</Text>
            <Text style={styles.podcastText}>Podcast</Text>
          </View>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>{title}</Text>
          <Text style={styles.timeText}>{time} minutes</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    height: 150,
    borderRadius: 7,
    borderColor: '#CBCBCB',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    width: 60,
    height: 60,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  subtitleText: {
    fontSize: 12.5,
    color: '#898989',
  },
  podcastText: {
    fontSize: 13,
    color: '#898989',
  },
  description: {
    marginTop: '1%',
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 11,
    color: '#898989',
    marginTop: 5,
  },
});
