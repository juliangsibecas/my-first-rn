import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../constants';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.28;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default class SliderEntry extends Component {
    render () {
        const { data: { title, subtitle, illustration } } = this.props;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: illustration }}
                      style={styles.image}
                    />
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    <Text
                      style={styles.title}
                      numberOfLines={2}
                    >
                        { title }
                    </Text>
                    <Text
                      style={styles.subtitle}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
      position: 'absolute',
      top: 0,
      left: itemHorizontalMargin,
      right: itemHorizontalMargin,
      bottom: 18,
      shadowColor: '#fff',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      borderRadius: entryBorderRadius
  },
  imageContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  radiusMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: entryBorderRadius,
      backgroundColor: theme.colors.secondary
  },
  textContainer: {
      justifyContent: 'center',
      paddingTop: 20 - entryBorderRadius,
      paddingBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.secondary,
      borderBottomLeftRadius: entryBorderRadius,
      borderBottomRightRadius: entryBorderRadius
  },
  title: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 0.5
  },
  subtitle: {
      marginTop: 6,
      color: theme.colors.tertiary,
      fontSize: 12,
      fontStyle: 'italic'
  }
})