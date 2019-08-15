import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Block, Text } from '../components/index'

export default class Interactions extends Component {
  static navigationOptions = {
    title: 'Interacciones'
  }
  
  render() {
    return (
      <Block center middle >
        <Text> Interactions </Text>
      </Block>
    )
  }
}

const styles = StyleSheet.create({})
