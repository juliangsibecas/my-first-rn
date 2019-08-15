import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import { theme } from '../constants'

import Carousel from 'react-native-snap-carousel'
import SliderEntry from '../components/SliderEntry'

import ApiService from '../services/ApiService'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class Home extends Component {
  static navigationOptions = {
    title: 'Fiestas'
  };
  
  state = {
    sliderActiveSlide: 1,
    parties: []
  }

  async componentDidMount() {
    const parties = await ApiService.getParties();
    this.setState({parties});
  }

  _renderItem ({item}) {
    return <SliderEntry data={item} />;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <LinearGradient
            colors={[theme.colors.primary, 'rgba(38, 2, 69, 0)', 'rgba(38, 2, 69, 0)', theme.colors.primary]}
            locations={[0, 0.3, 0.6, 1]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
              zIndex: 999,
            }}
            pointerEvents='none'
          />

          <MapView
            ref={ component => this._mapView = component }
            initialRegion={{
              latitude: -34.925,
              longitude: -57.97,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={theme.map}
            style={styles.map}
          >
            {this.state.parties.map((party, index) => (
              <Marker
                coordinate={party.location}
                key={index}
                onPress={() => {
                  this._carousel._snapToItem(index)
                }}
              />
            ))}
          </MapView>
        </View>

        <View 
          style={styles.carousel}
        >
          <Carousel
            ref={ c => this._carousel = c}
            data={this.state.parties}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={0}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            onSnapToItem={(index) => {
                this.setState({ sliderActiveSlide: index })
                this._mapView.animateToRegion(this.state.parties[index].location, 200)
              }
            }
          />  
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    alignSelf: 'stretch', 
    height: '100%',
    flex: 1
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingTop: 30
  }
})