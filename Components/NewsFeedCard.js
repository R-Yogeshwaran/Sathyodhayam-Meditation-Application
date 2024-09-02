import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class NewsFeedCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Box for Image */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dkkkl3td3/image/upload/v1722782432/Sathyodhayam/vpoqragsagllubzuuj2k.jpg' }} // Replace with your image URL
            style={styles.newsImage}
            resizeMode='cover'
          />
        </View>

        {/* Date and Title */}
        <View style={styles.textContainer}>
          <Text style={styles.date}>23/05/2023</Text>
          <Text style={styles.title}>SPIRITUAL FORMULA for Solving Problems in Life</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    overflow: 'hidden', 
  },
  imageBox: {
    width: '90%',
    height: 165,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6', 
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '4%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden', 
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  textContainer: {
    paddingLeft: 13,
    paddingRight: 7,
    paddingBottom: 10,
    backgroundColor: 'white', 
  },
  date: {
    fontSize: 14,
    color: '#007DFE', 
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
