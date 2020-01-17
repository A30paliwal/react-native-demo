import React, { Component } from 'react'
import Splash from './Components/splash';
import AppContainer from './Components/navigation'


export default class App extends Component {
  constructor() {
    super();
    this.state = { screen: 'Splash' };
    setTimeout(() => {
      this.setState({ screen: 'Login' })
    }, 3000)
  }
  render() {
    const { screen } = this.state
    let mainscreen = screen === 'Splash' ? <Splash /> : <AppContainer />
    return mainscreen
  }
}