import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import SliderEntry from './SliderEntry'

const ENTRIES1 = [
  {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
      location: {
        latitude: -34.925,
        longitude: -57.97,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      }
  },
  {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      location: {
        latitude: -34.885475,
        longitude: -58.014463,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      }
  },
  {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      location: {
        latitude: -34.925,
        longitude: -57.97,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      }
  },
  {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
  },
  {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/lceHsT6l.jpg'
  }
];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class PartiesCarousel extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    sliderActiveSlide: 1
  }

  _renderItem ({item}) {
    return <SliderEntry data={item} />;
  }

  render() {
    return (
      <Carousel
        data={ENTRIES1}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={0}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        onSnapToItem={(index) => this.setState({ sliderActiveSlide: index })}
      />  
    )
  }
}

const styles = StyleSheet.create({
  carousel: {
    bottom: 0
  }
})