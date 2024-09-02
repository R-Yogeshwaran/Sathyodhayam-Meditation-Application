import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class News_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    const { date, title, imageUri, description } = this.props;
    console.log(title)

    return (
      <View style={styles.container}>
        {/* Box for Image */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: imageUri }} // Use the imageUri passed from props
            style={styles.newsImage}
            resizeMode='cover'
          />
        </View>

        {/* Date and Title */}
        <View style={styles.textContainer}>
          <Text style={styles.date}>{date}</Text>
          <TouchableOpacity onPress={this.toggleExpand}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
          {expanded && (
            <Text style={styles.description}>
              {description} {/* Display the description passed from props */}
            </Text>
          )}
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
  description: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    padding:2,
    fontSize:13,
    fontWeight:'800'
  },
});
