import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import StackNavigation from './App/Navigation/StackNavigation'; // Import your app's navigator component

class App extends Component {
  componentDidMount() {
    SplashScreen.hide(); // Hide the splash screen when component is mounted
  }

  render() {
    return <StackNavigation />;
  }
}

export default App;
