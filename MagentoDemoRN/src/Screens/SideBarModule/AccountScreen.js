import React, {Component} from 'react'
import {View,Text,SafeAreaView,ScrollView} from 'react-native'
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Account extends Component{
  constructor(props){
    super(props);
    this.state= {};
  }

    render(){
        return(
          <SafeAreaView style={{}}>
            <ScrollView contentContainerStyle={{}}
              keyboardShouldPersistTaps='handled'
              alwaysBounceVertical={false}>
            <View>
                <Text style = {styles.text1}>
                    Account.
                </Text>
            </View>
          </ScrollView>
          </SafeAreaView>
        )}
}

const styles = {
    text1:{
      textAlign:'center',
      fontSize: 22,
      padding:10,
    }
   
}