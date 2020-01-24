import React, { Component } from 'react';
import AppContainer from './Components/navigation';
import{SafeAreaProvider} from 'react-native-safe-area-context';
export default class App extends Component {
  
  render() {
      return(
        <SafeAreaProvider>
          <AppContainer/>
        </SafeAreaProvider>
      )
    }
}