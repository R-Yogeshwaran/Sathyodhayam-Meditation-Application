import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { Picker } from '@react-native-picker/picker';

const Top = StatusBar.currentHeight;

export default class Sign_up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      address: '',
      gender: '',
      performance: 0,
      totalMeditation: 0,
      userType: 'Trainee',
    };
  }

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  validatePassword = (password) => {
    return password.length >= 6;
  };

  handleSignUp = () => {
    const { name, email, mobile, password, confirmPassword, address, gender, performance, totalMeditation, userType } = this.state;

    if (!this.validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!this.validateMobile(mobile)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!this.validatePassword(password)) {
      Alert.alert('Weak Password', 'Password should be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    // Create user and add details to Firestore
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const formData = { name, email, mobile, address, gender, performance, totalMeditation, userType };
        const usersCollection = collection(db, "Users");
        addDoc(usersCollection, formData)
          .then(() => {
            Alert.alert('User registered successfully!');
            this.props.navigation.navigate('Home');
          })
          .catch(error => {
            Alert.alert('Error adding user details', error.message);
            console.error(error);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        } else {
          Alert.alert('Error', error.message);
        }

        console.error(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        {/* Image Container */}
        <View style={styles.ImageContainer}>
          <Image 
            source={{ uri: "https://res.cloudinary.com/dkkkl3td3/image/upload/v1722784157/Sathyodhayam/mk2lpjcsc1oytupt3fxc.jpg" }} 
            style={styles.image}
          />
        </View>

        {/* Input Container */}
        <ScrollView>
          <View style={styles.InputContainer}>
            <Text style={styles.Header}>User Sign up</Text>
            <View style={styles.Welcome_Text}>
              <Text>Hey, enter your details to create your</Text>
              <Text> new account</Text>
            </View>

            <View style={styles.Input_Box_Container}>
              <TextInput 
                placeholder='Name' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <TextInput 
                placeholder='Email' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({ email: text })}
              />
              <TextInput 
                placeholder='Mobile' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                keyboardType="phone-pad"
                onChangeText={(text) => this.setState({ mobile: text })}
              />
              <TextInput 
                placeholder='Password' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                secureTextEntry
                onChangeText={(text) => this.setState({ password: text })}
              />
              <TextInput 
                placeholder='Confirm Password' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                secureTextEntry
                onChangeText={(text) => this.setState({ confirmPassword: text })}
              />
              <TextInput 
                placeholder='Address' 
                placeholderTextColor={"#858585"} 
                style={styles.Input_Box}
                onChangeText={(text) => this.setState({ address: text })}
              />
              <Picker
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
                style={styles.Input_Box}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>

              <View style={styles.Button}>
                <TouchableOpacity onPress={this.handleSignUp}>
                  <Text style={styles.SignIn_Button_Text}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.Login_Navigation}>
                <Text>
                  Already have an account? 
                  <TouchableOpacity 
                    style={{fontWeight:'bold',fontSize:16,}} 
                    onPress={() => {this.props.navigation.navigate("Login")}}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Login</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        
        </ScrollView>

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safearea: {
    marginTop: Top,
    flex: 1,
    backgroundColor: "white",
    justifyContent:'space-between',  
  },

  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height:'35%',
  },

  InputContainer: {
    height:'60%',
    alignContent:'center',
    alignItems:'center',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  Header: {
    fontSize:25,
    fontWeight:'bold',
    marginTop:'2%'
  },

  Welcome_Text : {
    alignItems:'center',
    fontSize:18,
    fontWeight:'black',
    width:'100%',
    marginTop:'3%'
  },

  Input_Box_Container: {
    width:"100%",
    justifyContent:'space-between',
    marginTop:'2.6%'
  },

  Input_Box: {
        width: "90%",
        height: 55,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        marginTop:'5%',
        borderColor: "#D6D6D6",
        borderRadius: 10,
        paddingLeft: 17,
  },

  Trouble_SignIn: {
        marginTop:'7%',
        marginLeft:'7%',
        fontSize:13,
        fontWeight:'bold'
  },

  Button: {
    width: "90%",
    height: 52,
    backgroundColor: "#10357E",
    marginLeft: 20,
    marginRight: 20,
    marginTop: "11%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize:18,
    color:'#FFFFFF',
    fontWeight:'bold',
    alignContent:'center',
  },

  SignIn_Button_Text: {
    fontSize:18,
    fontWeight:'bold', 
    color:'#FFFF'
  },

  Login_Navigation: {
    justifyContent:'center', 
    alignItems:'center', 
    marginTop:'6%',
    marginBottom:'6%'
  }

});

