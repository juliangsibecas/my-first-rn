import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Block, Text } from '../components/index'

export default class Profile extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <Block center middle >
        <Text> Profile </Text>
      </Block>
    )
  }
}

const styles = StyleSheet.create({})
