import React, { Component } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, Button } from 'react-native'
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      dataSource: null,
      isLoading: true
    };
  }

  func = () => {
    const { user, pass } = this.state;
    if (user == '') {
      Snackbar.show({
        title: 'Please enter username.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (pass == '') {
      Snackbar.show({
        title: 'Please enter password.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else {
      this.apiValidation();
    }
  }
  apiValidation = () => {
    const { user } = this.state;
    const { pass } = this.state;
    return fetch("http://13.229.75.231/rest/V1/magento/customer/login"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        var statusCode = response[0];
        var data = response[1];
        console.log(statusCode);
        console.log(data);
        if (statusCode == 200) {
          // this.setState({
          //   isLoading:false,
          // })
          this.storeData(data)
          this.props.navigation.navigate('App');
        } else {
          Snackbar.show({
            title: data.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data))
      console.log("DATA SAVED")
    } catch (e) {
      console.log(`Error ${e}`)
    }
  }
  functionCombined = () => {
    this.func();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
          alwaysBounceVertical={false}>
          <View style={styles.container1}>
            <Text style={styles.textFirst}>
              Get Started
                </Text>
            <Text style={styles.textSecond}>
              Log In or Register
                </Text>
          </View>
          <View style={styles.container2}>
            <TextInput style={styles.textarea}
              onChangeText={user => this.setState({ user })}
              placeholder='Username'
              placeholderTextColor='#ffffff66'
              returnKeyType='next'
              autoCorrect={false}
            />
            <TextInput style={styles.textarea}
              onChangeText={pass => this.setState({ pass })}
              placeholder='Password'
              placeholderTextColor='#ffffff66'
              returnKeyType='go'
              secureTextEntry
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.8} onPress={this.functionCombined}>
              <Text style={styles.buttonText} >LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer2} activeOpacity={0.8}>
              <Text style={styles.buttonText2}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container3}>
            <TouchableOpacity style={styles.buttonContainer3} activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('register')}>
              <Text style={styles.buttonText3}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "#FE6963",
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  container3: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  },

  textFirst: {
    fontSize: 45,
    color: 'white',
    marginHorizontal: 30,
    marginBottom: 5
  },
  textSecond: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 30,
    marginBottom: 20
  },
  textarea: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 50,
    paddingVertical: 5,
    marginBottom: 30,
    alignContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  buttonContainer: {
    backgroundColor: '#FE9363',
    marginHorizontal: 50,
    marginBottom: 5,
    borderRadius: 7,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: 'black',
    shadowRadius: 6
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    padding: 10,
  },
  buttonContainer2: {
    marginHorizontal: 50,
  },
  buttonContainer3: {
    borderWidth: 1,
    borderColor: "white",
    justifyContent: 'flex-end',
    marginHorizontal: 50,
    borderRadius: 7,
  },
  buttonText2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    padding: 10
  },
  buttonText3: {
    borderColor: 'white',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    padding: 10
  }
}