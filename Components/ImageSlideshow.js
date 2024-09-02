import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default class ImageSlideshow extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            autoplay
            autoplayTimeout={2}
            showsButtons={false}
            loop
            height={150}
          >
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dkkkl3td3/image/upload/v1722857089/Sathyodhayam/ne9ynxthbeftiv98e7yv.png' }}
                style={styles.image}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dkkkl3td3/image/upload/v1722782432/Sathyodhayam/vpoqragsagllubzuuj2k.jpg' }}
                style={styles.image}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dkkkl3td3/image/upload/v1722857089/Sathyodhayam/ne9ynxthbeftiv98e7yv.png' }}
                style={styles.image}
              />
            </View>
          </Swiper>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
