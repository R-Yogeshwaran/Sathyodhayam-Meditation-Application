import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'ryogeshwaran369@gmail.com', // Initialize currentUser as an empty string
      messages: [
        { text: '~ Instruction 1\n ~ Instruction 2\n ~ Instruction 3 \n Shall we start?', sender: 'system' },
      ],
      currentMessage: '',
    };
  }

  componentDidMount() {
    this.getCurrentUser(); // Call the method to get the current user
  }

  getCurrentUser = () => {
    const auth = getAuth(); // Get the Firebase Auth instance
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      this.setState({ currentUser: 'ryogeshwaran369@gmail.com' }); // Set the current user email in state
      console.log('Logged in user email:', user.email); // Log the email to the console
    } else {
      console.log('No user is logged in.');
    }
  };

  handleSend = () => {
    const { currentMessage, messages, currentUser } = this.state;

    if (currentMessage.trim().length > 0) {
      this.setState({
        messages: [...messages, { text: currentMessage, sender: currentUser }],
        currentMessage: '',
      });
    }
  };

  handleOptionClick = (option) => {
    const { messages, currentUser } = this.state;

    this.setState({
      messages: [...messages, { text: option, sender: currentUser }],
    });
    const duration = 9;
    if (option === 'Please Start Meditation') {
      this.props.navigation.navigate('MeditationTimer', { duration }); 
    } else if (option === 'Thanks for Joining') {
      this.props.navigation.navigate('Home');
    }
  };

  renderMessage = (message, index) => {
    const { currentUser } = this.state;
    const isTutor = message.sender === 'ryogeshwaran369@gmail.com';
    const isCurrentUser = message.sender === currentUser;
    const isSystemMessage = message.sender === 'system';

    return (
      <View
        key={index}
        style={[
          styles.messageBubble,
          isCurrentUser
            ? styles.currentUserBubble
            : isSystemMessage
            ? styles.systemBubble
            : styles.trainerBubble,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    );
  };

  renderTutorOptions = () => (
    <View style={styles.optionsContainer}>
      <TouchableOpacity style={styles.optionButton} onPress={() => this.handleOptionClick('Please Start Meditation')}>
        <Text style={styles.optionText}>Please Start Meditation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => this.handleOptionClick('Thanks for Joining')}>
        <Text style={styles.optionText}>Thanks for Joining</Text>
      </TouchableOpacity>
    </View>
  );

  renderTrainerOptions = () => (
    <View style={styles.optionsContainer}>
      <TouchableOpacity style={styles.optionButton} onPress={() => this.handleOptionClick('Ready')}>
        <Text style={styles.optionText}>Ready</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => this.handleOptionClick('Wait')}>
        <Text style={styles.optionText}>Wait</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => this.handleOptionClick('I’ll join after sometime')}>
        <Text style={styles.optionText}>I’ll join after sometime</Text>
      </TouchableOpacity>
      <Text style={styles.optionPrompt}>Choose your option!</Text>
    </View>
  );

  render() {
    const { currentUser } = this.state;
    const isTutor = currentUser === 'ryogeshwaran369@gmail.com';

    return (
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {this.state.messages.map(this.renderMessage)}
        </ScrollView>

        {isTutor ? (
          <>
            {this.renderTutorOptions()}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type the instruction..."
                value={this.state.currentMessage}
                onChangeText={(text) => this.setState({ currentMessage: text })}
              />
              <TouchableOpacity style={styles.sendButton} onPress={this.handleSend}>
                <Text style={styles.sendIcon}>🛩️</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          this.renderTrainerOptions()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  currentUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f5d3',
  },
  tutorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  trainerBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e7ff',
  },
  messageText: {
    fontSize: 16,
  },
  optionsContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#0026b9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  optionPrompt: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#0000ff',
    borderRadius: 20,
    padding: 12,
  },
  sendIcon: {
    color: '#fff',
    fontSize: 18,
  },
});
