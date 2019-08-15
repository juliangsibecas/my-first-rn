import React from 'react';
import { View, StatusBar } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

import Navigation from './navigation'

const images = [
  require('./assets/test.jpg')
]

export default class App extends React.Component {
  state = {
    isReady: false
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isReady: true })}
        />
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <Navigation />
        </View>
          
      );
    }
  }

  async _loadResourcesAsync() {
    
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })

    return Promise.all([
      Font.loadAsync({
        'CircularStd-Book': require('./assets/fonts/CircularStd/CircularStd-Book.otf'),
        'CircularStd-Medium': require('./assets/fonts/CircularStd/CircularStd-Medium.otf'),
        'CircularStd-Bold': require('./assets/fonts/CircularStd/CircularStd-Bold.otf')
      }),
      cacheImages
    ]);
  }
}