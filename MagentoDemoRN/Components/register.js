import React, { Component } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, StyleSheet, ScrollView, Switch, ActivityIndicator } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      switchValue: false,
      fname: '',
      lname: '',
      email: '',
      pass: '',
      cpass: '',
    };
  }
  func = () => {
    let nameRegex = /^[a-zA-Z ]{2,30}$/;
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passRegex = /^[a-zA-Z0-9!@#$%^&*]{2,16}$/;
    const { fname, lname, email, pass, cpass, switchValue } = this.state;
    if (fname == '') {
      Snackbar.show({
        title: 'Please fill the first name.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (!nameRegex.test(fname)) {
      Snackbar.show({
        title: 'Invalid first name.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    else if (lname == '') {
      Snackbar.show({
        title: 'Please fill the last name.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (!nameRegex.test(lname)) {
      Snackbar.show({
        title: 'Invalid last name.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (email == '') {
      Snackbar.show({
        title: 'Please fill the email.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (!emailRegex.test(email)) {
      Snackbar.show({
        title: 'Invalid email.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    else if (pass == '') {
      Snackbar.show({
        title: 'Please fill the password.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (!passRegex.test(pass)) {
      Snackbar.show({
        title: 'Password should contain atleast one number and one special character.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    else if (cpass == '') {
      Snackbar.show({
        title: 'Please fill the confirm password.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (cpass != pass) {
      Snackbar.show({
        title: 'Password does not match.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else if (switchValue != true) {
      Snackbar.show({
        title: 'Please agree to Privacy Policy.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else {
      this.apiValidation()
    }
  }
  apiValidation = () => {
    const data = {
      "customer": {
        "email": this.state.email,
        "firstname": this.state.fname,
        "group_id": "1",
        "id": 0,
        "lastname": this.state.lname,
        "mask_id": "",
        "middlename": "",
        "password": this.state.pass,
        "profile_image": "",
        "quote_count": 0,
        "quote_id": 0,
        "store_id": "1",
        "token": "",
        "website_id": "1"
      }
    };
    let body = JSON.stringify(data);
    console.log(body);
    return fetch("http://13.229.75.231/rest/V1/ranosys/customer/register"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
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
          Snackbar.show({
            title: 'User has been registered successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          this.props.navigation.navigate('login');
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
  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
  };
  render() {
    const {fname,lname,isLoading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        { isLoading != true ?( 
          <ScrollView contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
            alwaysBounceVertical={false}>
            <View style={styles.container1}>
              <TouchableOpacity style={styles.iconContainer} onPress={()=> this.props.navigation.goBack()}>
                <Icon name="md-arrow-round-back" size={35} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.textFirst}>
                Register
                    </Text>
              <Text style={styles.textSecond}>
                Fill in your details
                    </Text>
            </View>
            <View style={styles.container2}>
              <TextInput style={styles.textarea}
                onChangeText={fname => this.setState({ fname })}
                placeholder='First Name'
                placeholderTextColor='#ffffff66'
                returnKeyType='next'
                autoCorrect={false}
                value={this.state.fname}
              />
              <TextInput style={styles.textarea}
                onChangeText={lname => this.setState({ lname })}

                placeholder='Last Name'
                placeholderTextColor='#ffffff66'
                returnKeyType='next'
                autoCorrect={false}
              />
              <TextInput style={styles.textarea}
                onChangeText={email => this.setState({ email })}
                placeholder='Email'
                placeholderTextColor='#ffffff66'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
              />
              <TextInput style={styles.textarea}
                onChangeText={pass => this.setState({ pass })}
                placeholder='Password'
                placeholderTextColor='#ffffff66'
                returnKeyType='next'
                secureTextEntry
                autoCorrect={false}
              />
              <TextInput style={styles.textarea}
                onChangeText={cpass => this.setState({ cpass })}
                placeholder='Confirm Password'
                placeholderTextColor='#ffffff66'
                returnKeyType='go'
                secureTextEntry
                autoCorrect={false}
              />
              <View style={styles.switchContainer}>
                <Switch onValueChange={this.toggleSwitch}
                  ios_backgroundColor='blue'
                  value={this.state.switchValue} />
                <Text style={styles.switchText2}>   I Agree to
                      <Text style={{ fontWeight: 'bold' }} onPress={() => { }}> Privacy Policy</Text></Text>
              </View>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={this.func}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer3} onPress={()=> this.props.navigation.goBack()}>
                <Text style={styles.buttonText3}>Back to Login</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>):(<View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>)
          }
        </KeyboardAvoidingView>
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
    flex: 2,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  // container3: {
  //     flex:1,
  //     justifyContent:'',
  //     marginBottom:10,
  //     marginHorizontal:40,
  // },

  textFirst: {
    fontSize: 45,
    color: 'white',
    marginHorizontal: 30,
    marginVertical: 15
  },
  textSecond: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 30,
    marginBottom: 20
  },
  textarea: {
    paddingHorizontal: 5,
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
    marginBottom: 25,
    alignContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  buttonContainer: {
    backgroundColor: '#FE9363',
    marginBottom: 5,
    borderRadius: 7,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: 'black',
    shadowRadius: 6
  },
  iconContainer: {
    alignContent: 'flex-start',
    width: 40,
    marginHorizontal: 15,
    marginVertical: 10
  },
  buttonContainer3: {
    justifyContent: 'flex-end',
    marginHorizontal: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
  },
  buttonText3: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 10
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  switchText2: {
    flex: 1,
    marginTop: 4,
    color: 'white',
    fontSize: 18
  },
}